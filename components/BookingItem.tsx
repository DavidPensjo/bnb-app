"use client";

import { updateBookingStatus } from "@/app/bookings/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User } from "lucide-react";

interface BookingItemProps {
  booking: {
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    listing: {
      name: string;
      location: string;
    };
    user: {
      name: string;
      email: string;
    };
  };
}

function BookingItem({ booking }: BookingItemProps) {
  const router = useRouter();

  const handleAccept = async () => {
    try {
      await updateBookingStatus(booking.id, "ACCEPTED");
      router.refresh();
    } catch (error) {
      console.error("Failed to accept booking:", error);
    }
  };

  const handleReject = async () => {
    try {
      await updateBookingStatus(booking.id, "REJECTED");
      router.refresh();
    } catch (error) {
      console.error("Failed to reject booking:", error);
    }
  };

  return (
    <Card key={booking.id} className="mb-4 mx-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/path/to/avatar.jpg" alt={booking.user.name} />
              <AvatarFallback>
                {booking.user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{booking.user.name}</CardTitle>
              <CardDescription>{booking.listing.name}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary">Pending Approval</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{booking.listing.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>
              {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
              {new Date(booking.checkOutDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>1 guest</span> {/* Update guest count if available */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReject}>
          Reject
        </Button>
        <Button onClick={handleAccept}>Accept</Button>
      </CardFooter>
    </Card>
  );
}

export default BookingItem;
