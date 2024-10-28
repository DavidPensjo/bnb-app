import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
  });

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-semibold">{listing.name}</h1>
      <p className="text-lg">{listing.location}</p>
      <p>{listing.description}</p>
      <p className="font-bold">${listing.pricePerNight} / night</p>
      
      <Button className="mt-4">Confirm Booking</Button>
    </div>
  );
}
