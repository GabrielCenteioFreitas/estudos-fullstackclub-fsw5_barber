import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })

  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {concludedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>

            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Bookings
