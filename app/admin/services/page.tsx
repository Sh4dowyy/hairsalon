"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: number
  name: string
  description: string | null
  price: string
  category: string
}

interface Employee {
  id: number
  name: string
  email: string
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  })

  useEffect(() => {
    // Check if employee is logged in
    const employee = localStorage.getItem('employee')
    if (!employee) {
      router.push('/admin/login')
      return
    }

    fetchServices()
  }, [router])

  const fetchServices = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('id')
    
    if (error) {
      console.error('Error fetching services:', error)
      return
    }

    if (data) {
      setServices(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService.id)

        if (error) {
          console.error('Update error:', error.message, error.details)
          throw error
        }

        toast({
          title: "Teenus uuendatud",
          description: "Teenuse andmed on edukalt uuendatud",
        })
      } else {
        // Create new service
        const newService = {
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          price: formData.price.trim(),
          category: formData.category.trim(),
        }
        
        console.log('Attempting to insert:', newService)
        
        const { data, error } = await supabase
          .from('services')
          .insert([newService])
          .select()

        if (error) {
          console.error('Insert error:', error.message, error.details)
          throw error
        }

        console.log('Insert response:', data)

        toast({
          title: "Teenus lisatud",
          description: "Uus teenus on edukalt lisatud",
        })
      }

      setIsDialogOpen(false)
      setEditingService(null)
      setFormData({ name: "", description: "", price: "", category: "" })
      fetchServices()
    } catch (error: any) {
      console.error('Error saving service:', {
        message: error.message,
        details: error.details,
        error
      })
      toast({
        title: "Viga",
        description: error.message || "Teenuse salvestamisel tekkis viga",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      description: service.description || "",
      price: service.price,
      category: service.category,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Kas olete kindel, et soovite selle teenuse kustutada?")) {
      return
    }

    const supabase = createClient()
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting service:', error)
      toast({
        title: "Viga",
        description: "Teenuse kustutamisel tekkis viga",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Teenus kustutatud",
      description: "Teenus on edukalt kustutatud",
    })
    fetchServices()
  }

  const handleAddNew = () => {
    setEditingService(null)
    setFormData({ name: "", description: "", price: "", category: "" })
    setIsDialogOpen(true)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Teenuste haldamine</h1>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="h-4 w-4" />
          Lisa uus teenus
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Muuda teenust" : "Lisa uus teenus"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Teenuse nimi</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Kirjeldus</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Hind</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Kategooria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Vali kategooria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="women">Naistele</SelectItem>
                  <SelectItem value="men">Meestele</SelectItem>
                  <SelectItem value="coloring">Värvimine</SelectItem>
                  <SelectItem value="children">Lastele</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Tühista
              </Button>
              <Button type="submit">
                {editingService ? "Salvesta muudatused" : "Lisa teenus"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nimi</TableHead>
            <TableHead>Kirjeldus</TableHead>
            <TableHead>Hind</TableHead>
            <TableHead>Kategooria</TableHead>
            <TableHead className="text-right">Tegevused</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>{service.category}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(service)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 