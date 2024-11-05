import { PrismaClient } from "@prisma/client";
import BookingDetails from "@/components/BookingDetails";

const prisma = new PrismaClient();

export default async function BookingPage({ params, searchParams }) {
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
      startDate={startDate}
      endDate={endDate}
      nights={nights}
    />
  );
}
