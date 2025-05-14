"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Award, Clock, Users, Upload, Trash2 } from "lucide-react"
import { useState, useEffect } from 'react'
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

interface Worker {
  id: string
  name: string
  position: string
  experience: string
  description: string
  image_path: string
}

interface Employee {
  id: number
  name: string
  email: string
}

export default function AboutPage() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [employee, setEmployee] = useState<Employee | null>(null)
  
  // Form states
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [experience, setExperience] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const supabase = typeof window !== 'undefined' 
    ? createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
    : null

  useEffect(() => {
    const storedEmployee = localStorage.getItem('employee')
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee))
    }

    const fetchWorkers = async () => {
      if (!supabase) return

      const { data, error } = await supabase
        .from('workers')
        .select('*')

      if (error) {
        console.error('Error fetching workers:', error)
        toast({
          title: "Error",
          description: "Failed to load workers",
          variant: "destructive",
        })
        return
      }

      setWorkers(data || [])
      setIsLoading(false)
    }

    fetchWorkers()
  }, [supabase])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

    setImage(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase || !employee || !image) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    try {
      // Generate a unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 10)
      const fileExt = image.name.split('.').pop()?.toLowerCase() || 'jpg'
      const fileName = `${timestamp}-${randomString}.${fileExt}`
      const storagePath = `workers/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('salon-photos')
        .upload(storagePath, image, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`)
      }

      if (!uploadData?.path) {
        throw new Error('Upload failed: No path returned')
      }

      // Insert into workers table
      const { error: dbError } = await supabase
        .from('workers')
        .insert({
          name,
          position,
          experience,
          description,
          image_path: storagePath,
        })

      if (dbError) {
        // If database insert fails, clean up the uploaded file
        await supabase.storage
          .from('salon-photos')
          .remove([storagePath])
        throw new Error(`Database error: ${dbError.message}`)
      }

      // Refresh workers
      const { data: newWorkers, error: fetchError } = await supabase
        .from('workers')
        .select('*')
        .order('created_at', { ascending: true })

      if (fetchError) {
        throw new Error(`Failed to refresh workers: ${fetchError.message}`)
      }

      setWorkers(newWorkers || [])
      
      // Reset form
      setName('')
      setPosition('')
      setExperience('')
      setDescription('')
      setImage(null)
      
      toast({
        title: "Success",
        description: "Worker added successfully",
      })
    } catch (error) {
      console.error('Error adding worker:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add worker",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (worker: Worker) => {
    if (!supabase || !employee) {
      toast({
        title: "Error",
        description: "Only employees can delete workers",
        variant: "destructive",
      })
      return
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('salon-photos')
        .remove([worker.image_path])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('workers')
        .delete()
        .eq('id', worker.id)

      if (dbError) throw dbError

      // Update local state
      setWorkers(workers.filter(w => w.id !== worker.id))
      toast({
        title: "Success",
        description: "Worker deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting worker:', error)
      toast({
        title: "Error",
        description: "Failed to delete worker",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meist</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Ilusalong Na'Kris Stuudio on koht, kus iga klient saab individuaalse lähenemise ja kvaliteetse teeninduse.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Me oleme võitnud paljude klientide usalduse ja armastuse. 
                  Täiendame pidevalt oma oskusi, jälgime ilu maailma viimaseid trende ja kasutame professionaalset kosmeetikat.
                </p>
                <p className="text-muted-foreground">
                  Meie missioon on aidata igal kliendil rõhutada oma individuaalsust ja luua kordumatu välimus, 
                  mis peegeldab tema sisemaailma ja elustiili.
                </p>
              </div>
            </div>
            <Image
              src="/salon-interior.jpg"
              width={800}
              height={600}
              alt="Ilusalong Na'Kris Stuudio - Modernne ja elegantne salongi sisekujundus"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meie eelised</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Miks kliendid valivad just meid
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Scissors className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Professionaalsus</h3>
                <p className="text-muted-foreground">
                  Meie meistrid on pikaajalise kogemuse ja pideva täiendõppega professionaalid
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Kvaliteet</h3>
                <p className="text-muted-foreground">
                  Kasutame ainult juhtivate maailmabrändide professionaalset kosmeetikat
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Täpsus</h3>
                <p className="text-muted-foreground">Hindame teie aega ja peame alati kinni broneeringu graafikust</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Individuaalne lähenemine</h3>
                <p className="text-muted-foreground">Arvestame kliendi kõiki soove ja välimuse eripära</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meie meistrid</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Professionaalid, kes loovad ilu
              </p>
            </div>
          </div>

          {employee && (
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="bg-background/50 rounded-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="h-5 w-5" />
                  <Label htmlFor="worker-form" className="text-lg font-medium">Lisa uus töötaja</Label>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nimi</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Ametikoht</Label>
                    <Input
                      id="position"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Töökogemus</Label>
                    <Input
                      id="experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Kirjeldus</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Foto</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="bg-background file:bg-muted file:border-0 file:text-foreground file:hover:bg-muted/80 file:transition-colors file:px-4 file:py-2 file:mr-4 file:font-medium file:rounded-md cursor-pointer"
                    />
                    <p className="text-sm text-muted-foreground">
                      Lubatud formaadid: JPEG, PNG, GIF, WEBP. Maksimaalne suurus: 5MB
                    </p>
                  </div>
                  <Button type="submit" disabled={isUploading} className="w-full">
                    {isUploading ? 'Laadin üles...' : 'Lisa töötaja'}
                  </Button>
                </form>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">Laadin...</div>
          ) : (
            <div className="relative">
              <div className="overflow-x-auto pb-6 pt-1">
                <div className="flex space-x-8 min-w-full w-fit px-4">
                  {workers.map((worker) => (
                    <Card key={worker.id} className="flex-none w-[300px] overflow-hidden">
                      <div className="relative h-[400px] group">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/salon-photos/${worker.image_path}`}
                          alt={worker.name}
                          fill
                          className="object-cover object-top"
                          sizes="300px"
                        />
                        {employee && (
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDelete(worker)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold mb-1">{worker.name}</h3>
                        <p className="text-primary mb-1">{worker.position}</p>
                        <p className="text-sm text-muted-foreground mb-3">Töökogemus: {worker.experience}</p>
                        <p className="text-muted-foreground text-sm line-clamp-3">{worker.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="absolute left-0 top-0 bottom-6 w-8 bg-gradient-to-r from-muted to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-6 w-8 bg-gradient-to-l from-muted to-transparent pointer-events-none" />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

