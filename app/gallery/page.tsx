"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"

interface Photo {
  id: string
  storage_path: string
  category: 'works' | 'interior'
  title: string
  alt_text: string
  width: number
  height: number
  order_index: number
}

interface AuthUser {
  id: string
  email: string
  role?: string
  user_metadata?: {
    role?: string
  }
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'works' | 'interior'>("works")
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Separate effect for user authentication
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user: sessionUser }, error: sessionError } = await supabase.auth.getUser()
        
        if (sessionError || !sessionUser) {
          setUser(null)
          setIsAuthorized(false)
          return
        }

        // Get the raw user metadata to ensure we have the complete data
        const { data: { raw_user_meta_data }, error: metaError } = await supabase.rpc('get_user_metadata')
        
        if (metaError) {
          console.error('Error fetching user metadata:', metaError)
        }

        const userData = {
          id: sessionUser.id,
          email: sessionUser.email || '',
          role: raw_user_meta_data?.role || sessionUser.user_metadata?.role,
          user_metadata: raw_user_meta_data || sessionUser.user_metadata
        }

        setUser(userData)
        
        // Check authorization
        const userRole = userData.role || userData.user_metadata?.role
        const authorized = userRole === 'admin' || userRole === 'staff'
        setIsAuthorized(authorized)

        console.log('User data:', {
          ...userData,
          isAuthorized: authorized
        })
      } catch (error) {
        console.error('Error checking user:', error)
        setUser(null)
        setIsAuthorized(false)
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session?.user) {
        setUser(null)
        setIsAuthorized(false)
        return
      }

      try {
        // Get the raw user metadata to ensure we have the complete data
        const { data: { raw_user_meta_data }, error: metaError } = await supabase.rpc('get_user_metadata')
        
        if (metaError) {
          console.error('Error fetching user metadata:', metaError)
        }

        const userData = {
          id: session.user.id,
          email: session.user.email || '',
          role: raw_user_meta_data?.role || session.user.user_metadata?.role,
          user_metadata: raw_user_meta_data || session.user.user_metadata
        }

        setUser(userData)
        
        // Check authorization
        const userRole = userData.role || userData.user_metadata?.role
        const authorized = userRole === 'admin' || userRole === 'staff'
        setIsAuthorized(authorized)

        console.log('Auth state changed:', {
          ...userData,
          isAuthorized: authorized
        })
      } catch (error) {
        console.error('Error in auth state change:', error)
        setUser(null)
        setIsAuthorized(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  // Separate effect for photos
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching photos:', error)
        toast({
          title: "Error",
          description: "Failed to load photos",
          variant: "destructive",
        })
        return
      }

      setPhotos(data || [])
      setIsLoading(false)
    }

    fetchPhotos()
  }, [supabase])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !isAuthorized) {
      toast({
        title: "Error",
        description: "You are not authorized to upload photos",
        variant: "destructive",
      })
      return
    }

    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please upload a valid image file (JPEG, PNG, GIF, or WEBP)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      // Get image dimensions first
      const img = document.createElement('img')
      const dimensions = await new Promise<{ width: number, height: number }>((resolve, reject) => {
        img.onload = () => {
          resolve({ width: img.width, height: img.height })
        }
        img.onerror = () => {
          reject(new Error('Failed to load image'))
        }
        img.src = URL.createObjectURL(file)
      })

      // Generate a unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 10)
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${timestamp}-${randomString}.${fileExt}`
      const storagePath = `${activeTab}/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('salon-photos')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`)
      }

      if (!uploadData?.path) {
        throw new Error('Upload failed: No path returned')
      }

      // Insert into photos table
      const { error: dbError } = await supabase
        .from('photos')
        .insert({
          storage_path: storagePath,
          category: activeTab,
          title: file.name.split('.')[0],
          alt_text: file.name.split('.')[0],
          width: dimensions.width,
          height: dimensions.height,
          order_index: photos.length + 1
        })

      if (dbError) {
        // If database insert fails, clean up the uploaded file
        await supabase.storage
          .from('salon-photos')
          .remove([storagePath])
        throw new Error(`Database error: ${dbError.message}`)
      }

      // Refresh photos
      const { data: newPhotos, error: fetchError } = await supabase
        .from('photos')
        .select('*')
        .order('order_index', { ascending: true })

      if (fetchError) {
        throw new Error(`Failed to refresh photos: ${fetchError.message}`)
      }

      setPhotos(newPhotos || [])
      toast({
        title: "Success",
        description: "Photo uploaded successfully",
      })

      // Clear the input
      event.target.value = ''
    } catch (error) {
      console.error('Error uploading photo:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload photo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (photo: Photo) => {
    if (!user || !isAuthorized) {
      toast({
        title: "Error",
        description: "You are not authorized to delete photos",
        variant: "destructive",
      })
      return
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('salon-photos')
        .remove([photo.storage_path])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photo.id)

      if (dbError) throw dbError

      // Update local state
      setPhotos(photos.filter(p => p.id !== photo.id))
      toast({
        title: "Success",
        description: "Photo deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting photo:', error)
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      })
    }
  }

  const filteredPhotos = photos.filter(photo => photo.category === activeTab)

  return (
    <main className="flex flex-col min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Galerii</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Meie tööde ja salongi interjööri fotod
            </p>
          </div>
        </div>

        <Tabs defaultValue="works" className="w-full" onValueChange={(value) => setActiveTab(value as 'works' | 'interior')}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="works">Meie tööd</TabsTrigger>
              <TabsTrigger value="interior">Salongi interjöör</TabsTrigger>
            </TabsList>
          </div>

          {isAuthorized && (
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="h-5 w-5" />
                  <Label htmlFor="photo-upload" className="text-lg font-medium">Lisa uus foto</Label>
                </div>
                <div className="space-y-2">
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="bg-background file:bg-muted file:border-0 file:text-foreground file:hover:bg-muted/80 file:transition-colors file:px-4 file:py-2 file:mr-4 file:font-medium file:rounded-md cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">
                    Lubatud formaadid: JPEG, PNG, GIF, WEBP. Maksimaalne suurus: 5MB
                  </p>
                  {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin">⌛</div>
                      <span>Laadin üles...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">Laadin...</div>
          ) : (
            <>
              <TabsContent value="works" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/salon-photos/${photo.storage_path}`}
                        alt={photo.alt_text}
                        width={600}
                        height={600}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      {isAuthorized && (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDelete(photo)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="interior" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/salon-photos/${photo.storage_path}`}
                        alt={photo.alt_text}
                        width={600}
                        height={600}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                      {isAuthorized && (
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDelete(photo)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </main>
  )
}

