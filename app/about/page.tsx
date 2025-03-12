import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Award, Clock, Users } from "lucide-react"

export default function AboutPage() {
  const stylists = [
    {
      id: 1,
      name: "Анна Иванова",
      position: "Стилист-колорист",
      experience: "8 лет",
      description:
        "Специалист по сложным техникам окрашивания. Постоянно совершенствует свои навыки на международных мастер-классах.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 2,
      name: "Мария Петрова",
      position: "Стилист-парикмахер",
      experience: "6 лет",
      description:
        "Мастер женских и мужских стрижек. Создает индивидуальный образ, учитывая особенности внешности и пожелания клиента.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 3,
      name: "Елена Сидорова",
      position: "Мастер-универсал",
      experience: "10 лет",
      description:
        "Опытный мастер, владеющий всеми техниками стрижки, окрашивания и укладки. Специализируется на создании свадебных причесок.",
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 4,
      name: "Александр Козлов",
      position: "Барбер",
      experience: "5 лет",
      description:
        "Специалист по мужским стрижкам и оформлению бороды. Владеет классическими и современными техниками.",
      image: "/placeholder.svg?height=400&width=400",
    },
  ]

  return (
    <main className="flex flex-col min-h-screen">
      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">О нашем салоне</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Салон красоты Beauty Style — это место, где каждый клиент получает индивидуальный подход и
                  высококачественные услуги.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Наш салон был основан в 2015 году и за это время завоевал доверие и любовь многих клиентов. Мы
                  постоянно совершенствуем свои навыки, следим за последними тенденциями в мире красоты и используем
                  только профессиональную косметику ведущих мировых брендов.
                </p>
                <p className="text-muted-foreground">
                  Наша миссия — помочь каждому клиенту подчеркнуть свою индивидуальность и создать неповторимый образ,
                  который будет отражать его внутренний мир и стиль жизни.
                </p>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=600&width=800"
              width={800}
              height={600}
              alt="Салон красоты Beauty Style"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Наши преимущества</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Почему клиенты выбирают именно нас
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Scissors className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Профессионализм</h3>
                <p className="text-muted-foreground">
                  Наши мастера — профессионалы с многолетним опытом работы и постоянным обучением
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Качество</h3>
                <p className="text-muted-foreground">
                  Мы используем только профессиональную косметику ведущих мировых брендов
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Пунктуальность</h3>
                <p className="text-muted-foreground">Мы ценим ваше время и всегда соблюдаем график записи</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Индивидуальный подход</h3>
                <p className="text-muted-foreground">Мы учитываем все пожелания клиента и особенности его внешности</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Наши мастера</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Профессионалы, которые создают красоту
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylists.map((stylist) => (
              <Card key={stylist.id} className="overflow-hidden">
                <div className="relative h-64">
                  <Image src={stylist.image || "/placeholder.svg"} alt={stylist.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{stylist.name}</h3>
                  <p className="text-primary mb-1">{stylist.position}</p>
                  <p className="text-sm text-muted-foreground mb-3">Опыт работы: {stylist.experience}</p>
                  <p className="text-muted-foreground text-sm">{stylist.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

