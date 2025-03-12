import Image from "next/image"
import { CalendarDays } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PromotionCardProps {
  title: string
  description: string
  imageUrl: string
  expiryDate: string
}

export function PromotionCard({ title, description, imageUrl, expiryDate }: PromotionCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-6 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-1 h-4 w-4" />
          До {expiryDate}
        </div>
        <Button>Подробнее</Button>
      </CardFooter>
    </Card>
  )
}

