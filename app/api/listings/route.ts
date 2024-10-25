import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { name, description, location, pricePerNight, userId, images } = await request.json();

  const newListing = await prisma.listing.create({
    data: {
      name,
      description,
      location,
      pricePerNight,
      availability: true,
      images: images || [],
      createdBy: {
        connect: { id: userId },
      },
    },
  });

  return NextResponse.json(newListing);
}

export async function GET() {
  const listings = await prisma.listing.findMany({
    include: {
      createdBy: true,
      bookings: true,
    },
  });

  return NextResponse.json(listings);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const deletedListing = await prisma.listing.delete({
    where: { id },
  });

  return NextResponse.json(deletedListing);
}