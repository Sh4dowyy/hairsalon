import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ServicePreviewProps {
  title: string
  description: string
  icon: ReactNode
  href: string
}

export function ServicePreview({ title, description, icon, href }: ServicePreviewProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={href} className="inline-flex items-center text-primary hover:underline">
          Подробнее
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

