import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import BookingItem from "@/components/BookingItem";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function OwnerBookingsPage() {
  const token = cookies().get("auth_token")?.value;
  if (!token) {
    redirect("/");
  }

  const decoded = verifyToken(token) as JwtPayload | null;
  if (!decoded || !decoded.userId) {
    redirect("/");
  }

  const userId = decoded.userId;

  const bookings = await prisma.booking.findMany({
    where: {
      listing: {
        userId: userId,
      },
      status: "PENDING",
    },
    select: {
      id: true,
      checkInDate: true,
      checkOutDate: true,
      totalPrice: true,
      listing: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div>
      <h1>Pending Bookings for Your Listings</h1>
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
