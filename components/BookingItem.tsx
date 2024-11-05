"use client";

import { updateBookingStatus } from "@/app/bookings/actions";
import { useRouter } from "next/navigation";

interface BookingItemProps {
  booking: {
    id: string;
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    listing: {
      name: string;
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
    <div className="border p-4 mb-2">
      <h2>{booking.listing.name}</h2>
      <p>
        Booking by: {booking.user.name} ({booking.user.email})
      </p>
      <p>
        Dates: {new Date(booking.checkInDate).toLocaleDateString()} -{" "}
        {new Date(booking.checkOutDate).toLocaleDateString()}
      </p>
      <p>Total Price: ${booking.totalPrice}</p>
      <div className="mt-2">
        <button onClick={handleAccept} className="mr-2 btn btn-primary">
          Accept
        </button>
        <button onClick={handleReject} className="btn btn-secondary">
          Reject
        </button>
      </div>
    </div>
  );
}

export default BookingItem;
