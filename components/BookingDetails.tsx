"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/bookings/actions";

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
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-semibold">{listing.name}</h1>
      <p className="text-lg">{listing.location}</p>
      <p>{listing.description}</p>
      <p className="font-bold">${listing.pricePerNight} / night</p>

      <div className="mt-4">
        <p>
          <strong>Check-in:</strong>{" "}
          {startDate ? new Date(startDate).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <strong>Check-out:</strong>{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <strong>Nights:</strong> {nights}
        </p>
        <p>
          <strong>Total Price:</strong> ${nights * listing.pricePerNight}
        </p>
      </div>

      <button
        onClick={handleConfirmBooking}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md"
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default BookingDetails;
