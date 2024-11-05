"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";

type DecodedToken = { userId: string };

function isDecodedToken(decoded: string | JwtPayload): decoded is DecodedToken {
  return typeof decoded !== "string" && "userId" in decoded;
}

export async function createBooking(data: {
  listingId: string;
  startDate: string;
  endDate: string;
}) {
  const token = cookies().get("auth_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const decoded = verifyToken(token);
  if (!decoded) throw new Error("Invalid token");

  const userId = (decoded as { userId: string }).userId;

  const listing = await prisma.listing.findUnique({
    where: { id: data.listingId },
  });

  if (!listing) throw new Error("Listing not found");

  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const totalPrice = nights * listing.pricePerNight;

  const booking = await prisma.booking.create({
    data: {
      listingId: data.listingId,
      userId,
      checkInDate: start,
      checkOutDate: end,
      totalPrice,
      status: "PENDING",
    },
  });

  return booking;
}

export async function updateBookingStatus(
  bookingId: string,
  status: "ACCEPTED" | "REJECTED"
) {
  const token = cookies().get("auth_token")?.value;
  if (!token) throw new Error("Not authenticated");

  const decoded = verifyToken(token);
  if (!decoded || !isDecodedToken(decoded)) throw new Error("Invalid token");

  const userId = decoded.userId;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { listing: { select: { createdBy: { select: { id: true } } } } },
  });

  if (!booking) throw new Error("Booking not found");

  if (booking.listing.createdBy.id !== userId) {
    throw new Error("Not authorized to update this booking");
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return updatedBooking;
}
