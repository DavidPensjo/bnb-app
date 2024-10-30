import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function PATCH(request: Request) {
  const { bookingId, status } = await request.json();

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status,
    },
  });

  return NextResponse.json(updatedBooking);
}