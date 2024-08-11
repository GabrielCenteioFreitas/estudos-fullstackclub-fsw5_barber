import { BarbershopItem } from "@/components/barbershop-item"
import { Header } from "@/components/header"
import { Search } from "@/components/search"
import { db } from "@/lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = searchParams
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div className="">
      <Header />

      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Resultados para {`"${search}"`}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
