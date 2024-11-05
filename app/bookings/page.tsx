import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function UserBookingsPage() {
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
    where: { userId },
    include: { listing: true },
  });

  return (
    <div>
      <h1>Your Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking.id}>
          <h2>{booking.listing.name}</h2>
          <p>
            {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
            {new Date(booking.checkOutDate).toLocaleDateString()}
          </p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
