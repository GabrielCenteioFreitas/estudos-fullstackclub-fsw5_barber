"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: params,
  })
}
