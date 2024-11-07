import { PrismaClient } from "@prisma/client";
import BookingDetails from "@/components/BookingDetails";
import { NextPageContext } from "next";

const prisma = new PrismaClient();

interface BookingPageProps {
  params: {
    id: string;
  };
  searchParams: {
    startDate: string;
    endDate: string;
    nights: string;
  };
}

export default async function BookingPage({
  params,
  searchParams,
}: BookingPageProps) {
  const { id } = params;
  const { startDate, endDate, nights } = searchParams;

  if (!startDate || !endDate || !nights) {
    return <div>Invalid booking data</div>;
  }

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <BookingDetails
      listing={listing}
      startDate={new Date(startDate)}
      endDate={new Date(endDate)}
      nights={parseInt(nights, 10)}
    />
  );
}
