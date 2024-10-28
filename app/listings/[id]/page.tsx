import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";
import ListingImageCarousel from "@/components/ListingImageCarousel";
import Amenities from "@/components/Amenities";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
  });

  if (!listing) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="relative">
        <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
          <Link
            href={`/listings/`}
            className="bg-white rounded-full w-10 h-10 flex justify-center items-center shadow-xl"
          >
            <ChevronLeft className="absolute mr-0.5" size={24} />
          </Link>
          <ShareButton />
        </div>

        <ListingImageCarousel images={listing.images} variant="detailed" />
      </div>
      <div className="flex flex-col w-[90%] p-5">
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-semibold">{listing.name}</h1>
          <p className="pt-2 font-semibold">{listing.location}</p>
          <p>{listing.description}</p>
          <p>
            {listing.rooms} rooms • {listing.beds} beds
          </p>
          <p className="font-bold">${listing.pricePerNight} / night</p>
        </div>
      </div>

      <Amenities
        amenities={{
          hasWifi: listing.hasWifi,
          hasAirConditioning: listing.hasAirConditioning,
          hasPool: listing.hasPool,
          hasParking: listing.hasParking,
          hasGym: listing.hasGym,
          hasWasher: listing.hasWasher,
        }}
      />
      <div className="sticky bottom-0 ">
        <Button className="w-4/5 py-4">Reserve</Button>
      </div>
    </div>
  );
}
