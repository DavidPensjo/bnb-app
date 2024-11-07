"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/bookings/actions";
import {
  CalendarDays,
  MapPin,
  Moon,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BookingDetailsProps {
  listing: {
    id: string;
    name: string;
    location: string;
    description: string;
    pricePerNight: number;
  };
  startDate: Date;
  endDate: Date;
  nights: number;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  listing,
  startDate,
  endDate,
  nights,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      await createBooking({
        listingId: listing.id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });

      alert("Booking request sent successfully.");
      router.push("/bookings");
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Could not create booking request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{listing.name}</CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <p>{listing.location}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{listing.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-1 text-green-600" />
            <span className="text-2xl font-bold">{listing.pricePerNight}</span>
            <p className="text-muted-foreground">&nbsp;per night</p>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="font-semibold">Booking Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
              <p>Check-in:</p>
            </div>
            <p>
              {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
            </p>
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
              <p>Check-out:</p>
            </div>
            <p>{endDate ? new Date(endDate).toLocaleDateString() : "N/A"}</p>
            <div className="flex items-center">
              <Moon className="w-4 h-4 mr-2 text-indigo-500" />
              <p>Nights:</p>
            </div>
            <p>{nights}</p>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-semibold">
          <p>Total Price:</p>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 mr-1 text-green-600" />
            <span className="text-2xl">{nights * listing.pricePerNight}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleConfirmBooking}
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Confirm Booking
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingDetails;
