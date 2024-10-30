import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  const { listingId, userId, checkInDate, checkOutDate } = await request.json();

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  const nights =
    (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
    (1000 * 60 * 60 * 24);
  const totalPrice = nights * listing.pricePerNight;

  const newBooking = await prisma.booking.create({
    data: {
      checkInDate,
      checkOutDate,
      totalPrice,
      createdBy: {
        connect: { id: userId },
      },
      listing: {
        connect: { id: listingId },
      },
      createdAt: new Date(),
    },
  });

  return NextResponse.json(newBooking);
}

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      listing: true,
      createdBy: true,
    },
  });

  return NextResponse.json(bookings);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  return NextResponse.json(deletedBooking);
}
