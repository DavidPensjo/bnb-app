import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  // Handle creating a new booking
  const { listingId, userId, checkInDate, checkOutDate } = await request.json();

  // Calculate the total price based on the number of nights
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
  // Fetch all bookings
  const bookings = await prisma.booking.findMany({
    include: {
      listing: true,
      createdBy: true,
    },
  });

  return NextResponse.json(bookings);
}

export async function DELETE(request: Request) {
  // Handle deleting a booking
  const { id } = await request.json();

  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  return NextResponse.json(deletedBooking);
}
