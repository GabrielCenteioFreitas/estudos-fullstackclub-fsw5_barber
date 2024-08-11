import { BarbershopItem } from "@/components/barbershop-item"
import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { Search } from "@/components/search"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { quickSearchoptions } from "@/constants/quick-search-options"
import { db } from "@/lib/prisma"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

        <Search />

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchoptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
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

        <BookingItem />

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
      </div>
    </div>
  )
}
