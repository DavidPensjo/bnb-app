import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST: Create a new listing
export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      location,
      pricePerNight,
      availability,
      images,
      rooms,
      beds,
      hasDishwasher,
      hasWifi,
      hasAirConditioning,
      hasPool,
      hasParking,
      hasGym,
      hasWasher,
      hasDryer,
      userId,
    } = await request.json();

    if (
      !name ||
      !location ||
      !pricePerNight ||
      rooms === undefined ||
      beds === undefined ||
      !userId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newListing = await prisma.listing.create({
      data: {
        name,
        description: description || "",
        location,
        pricePerNight,
        availability: availability ?? true,
        images: images || [],
        rooms,
        beds,
        hasDishwasher: hasDishwasher ?? false,
        hasWifi: hasWifi ?? false,
        hasAirConditioning: hasAirConditioning ?? false,
        hasPool: hasPool ?? false,
        hasParking: hasParking ?? false,
        hasGym: hasGym ?? false,
        hasWasher: hasWasher ?? false,
        hasDryer: hasDryer ?? false,
        userId,
      },
    });

    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the listing" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all listings
export async function GET() {
  try {
    const listings = await prisma.listing.findMany();
    return NextResponse.json(listings, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the listings" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing listing
export async function PUT(request: Request) {
  try {
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Listing ID is required" },
        { status: 400 }
      );
    }

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedListing, { status: 200 });
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the listing" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a listing
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Listing ID is required" },
        { status: 400 }
      );
    }

    const deletedListing = await prisma.listing.delete({
      where: { id },
    });

    return NextResponse.json(deletedListing, { status: 200 });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the listing" },
      { status: 500 }
    );
  }
}
