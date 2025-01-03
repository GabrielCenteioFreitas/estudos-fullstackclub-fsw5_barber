import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { getConcludedBookings } from "@/data/get-concluded-bookings"
import { getConfirmedBookings } from "@/data/get-confirmed-bookings"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length == 0 && concludedBookings.length == 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}

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
