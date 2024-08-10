import { BarbershopItem } from "@/components/barbershop-item"
import { Header } from "@/components/header"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { quickSearchoptions } from "@/constants/quick-search-options"
import { db } from "@/lib/prisma"
import { AvatarImage } from "@radix-ui/react-avatar"
import { SearchIcon } from "lucide-react"
import Image from "next/image"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        <h2 className="text-xl font-bold">Olá, Gabriel!</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />

          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchoptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              Cabelo
            </Button>
          ))}
        </div>

        <div className="relative h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            className="rounded-xl object-cover"
            fill
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>

          <Card>
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit">Confirmado</Badge>

                <h3 className="font-semibold">Corte de cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/GabrielCenteioFreitas.png" />
                  </Avatar>

                  <p className="text-sm">Barbearia FSW</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Fevereiro</p>
                <p className="text-2xl">05</p>
                <p className="text-sm">20:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
                © 2023 Copyright <span className="font-bold">FSW Barber</span>
              </p>
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  )
}
