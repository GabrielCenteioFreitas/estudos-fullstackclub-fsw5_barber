"use server"

import { db } from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookingsParams {
  serviceId: string
  date: Date
}

export const getBookings = async ({ date, serviceId }: GetBookingsParams) => {
  const bookings = await db.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookings
}
