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
          location: true,
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
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 mx-6 mt-6">
        Pending Bookings
      </h1>
      {bookings.map((booking) => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
