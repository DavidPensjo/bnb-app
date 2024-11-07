import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const prisma = new PrismaClient();
function getStatusVariant(status: string) {
  switch (status.toLowerCase()) {
    case "accepted":
      return "default";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "secondary";
  }
}

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
    orderBy: { checkInDate: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking) => (
          <Card key={booking.id} className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground p-4">
              <CardTitle className="text-xl">{booking.listing.name}</CardTitle>
              <div className="flex items-center text-sm mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{booking.listing.location}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center mb-3">
                <CalendarDays className="w-5 h-5 mr-2 text-muted-foreground" />
                <p className="text-sm">
                  {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                <p className="text-sm">
                  {Math.ceil(
                    (new Date(booking.checkOutDate).getTime() -
                      new Date(booking.checkInDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  nights
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Badge variant={getStatusVariant(booking.status)}>
                  {booking.status}
                </Badge>
                <p className="font-semibold">
                  ${booking.totalPrice.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {bookings.length === 0 && (
        <p className="text-center text-muted-foreground mt-8">
          You don't have any bookings yet.
        </p>
      )}
    </div>
  );
}
