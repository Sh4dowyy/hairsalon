import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Award, Clock, Users } from "lucide-react"

export default function AboutPage() {
  const stylists = [
    {
      id: 1,
      name: "Kristina",
      position: "Juuksur-stilist",
      experience: "20+ aastat",
      description:
        "",
      image: "/images/stylist1.jpg",
    },
    {
      id: 2,
      name: "Natalja",
      position: "Juuksur-stilist",
      experience: "20+ aastat",
      description:
        "",
      image: "/images/stylist2.jpg",
    },
  ]

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
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto gap-8">
            {stylists.map((stylist) => (
              <Card key={stylist.id} className="overflow-hidden">
                <div className="relative h-[400px]">
                  <Image 
                    src={stylist.image || "/placeholder.svg"} 
                    alt={stylist.name} 
                    fill 
                    className="object-cover object-top" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{stylist.name}</h3>
                  <p className="text-primary mb-1">{stylist.position}</p>
                  <p className="text-sm text-muted-foreground mb-3">Töökogemus: {stylist.experience}</p>
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

