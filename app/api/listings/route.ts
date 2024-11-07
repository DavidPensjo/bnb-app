import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";

async function getAuthenticatedUserId() {
  const token = cookies().get("auth_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const decoded = verifyToken(token) as JwtPayload | null;
  if (!decoded || !decoded.userId) throw new Error("Invalid or expired token");

  return decoded.userId;
}

export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
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
    } = await request.json();

    if (
      !name ||
      !location ||
      !pricePerNight ||
      rooms === undefined ||
      beds === undefined
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

export async function PUT(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Listing ID is required" },
        { status: 400 }
      );
    }

    const existingListing = await prisma.listing.findUnique({ where: { id } });
    if (!existingListing)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (existingListing.userId !== userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

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

export async function DELETE(request: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Listing ID is required" },
        { status: 400 }
      );
    }

    const existingListing = await prisma.listing.findUnique({ where: { id } });
    if (!existingListing)
      return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (existingListing.userId !== userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

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
