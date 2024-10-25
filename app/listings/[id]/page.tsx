import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { ChevronLeft, Share } from "lucide-react";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

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
    <div className="">
      <div className="relative">
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <Link
            href={`/listings/`}
            className="bg-white rounded-full w-10 h-10 flex justify-center items-center shadow-xl"
          >
            <ChevronLeft className="absolute mr-0.5" size={24} />
          </Link>
          <ShareButton />
        </div>
        {listing.images.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`${listing.name} image ${index + 1}`}
            className="w-screen"
            width={300}
            height={300}
          />
        ))}
      </div>
      <div className="flex flex-col w-[90%] p-5">
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-semibold">{listing.name}</h1>
          <p className="pt-2 font-semibold">{listing.location}</p>
          <p>{listing.description}</p>
          <p className="">${listing.pricePerNight} / night</p>
          <p>
            {listing.rooms} rooms • {listing.beds} beds
          </p>
        </div>
      </div>
    </div>
  );
}
