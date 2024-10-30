import React from "react";
import { Listing } from "@prisma/client";
import ListingImageCarousel from "./ListingImageCarousel";
import Link from "next/link";

const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <li key={listing.id}>
      <Link
        className="w-screen flex flex-col items-center"
        href={`/listings/${listing.id}`}
        passHref
      >
        <div className="flex flex-col w-screen h-full items-center mt-7 px-4">
          {listing.images && listing.images.length > 0 ? (
            <ListingImageCarousel images={listing.images} />
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className="w-5/6">
          <p className="font-semibold text-base pt-1">{listing.location}</p>
          <div className="flex gap-1">
            {listing.rooms > 1 ? (
              <p>{listing.rooms} bedrooms</p>
            ) : (
              <p>{listing.rooms} bedroom</p>
            )}
            <p>/</p>
            {listing.beds > 1 ? (
              <p>{listing.beds} beds</p>
            ) : (
              <p>{listing.beds} bed</p>
            )}
          </div>
          <div className="flex items-baseline">
            <p className=" font-semibold">${listing.pricePerNight}</p>
            <span className="text-base">&nbsp;night</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingCard;
