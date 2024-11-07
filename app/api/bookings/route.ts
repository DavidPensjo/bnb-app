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
      userId, // Set userId directly
      listingId, // Set listingId directly
      createdAt: new Date(),
    },
  });

  return NextResponse.json(newBooking);
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        listing: true,
        user: true,
      },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching bookings" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const deletedBooking = await prisma.booking.delete({
    where: { id },
  });

  return NextResponse.json(deletedBooking);
}
