"use client";
import React, { useState } from "react";
import Calendar from "@/components/Calendar";
import ReserveButton from "./ReserveButton";

interface ListingBookingProps {
  listingId: string;
  pricePerNight: number;
  location: string;
}

const ListingBooking: React.FC<ListingBookingProps> = ({
  listingId,
  pricePerNight,
  location,
}) => {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [dates, setDates] = useState<{ startDate: Date; endDate: Date } | null>(
    null
  );
  const [nights, setNights] = useState<number | null>(null);

  const handleDateChange = (startDate: Date, endDate: Date) => {
    const calculatedNights =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    setNights(calculatedNights);
    setTotalPrice(calculatedNights * pricePerNight);
    setDates({ startDate, endDate });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center w-screen">
      {dates !== null && (nights ?? 0) > 0 && (
        <div className="w-screen flex flex-col items-center mb-2">
          <p className="w-4/5 font-semibold text-xl mb-1">
            {nights ?? 0} night{(nights ?? 0) > 1 ? "s" : ""} in {location}
          </p>
          <p className="w-4/5 opacity-80 text-sm">
            {formatDate(dates.startDate)} - {formatDate(dates.endDate)}
          </p>
        </div>
      )}
      <div className="mb-4">
        <Calendar onDateChange={handleDateChange} />
      </div>
      <div className="flex justify-center w-screen border-t-2">
        <div className="w-5/6 flex justify-between mt-4">
          <div className="flex flex-col justify-center">
            <div className="flex items-center">
              <p className="font-semibold text-lg">${pricePerNight}</p>
              <p>&nbsp;night</p>
            </div>
            {totalPrice !== null && (
              <div className="flex underline">
                <p className="">Total&nbsp;</p>
                <p className="">${totalPrice}</p>
              </div>
            )}
          </div>
          <div className="">
            <ReserveButton
              listingId={listingId}
              dates={dates}
              nights={nights}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingBooking;
