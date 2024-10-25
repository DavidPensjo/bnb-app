import React from "react";
import { Listing } from "@prisma/client";
import Link from "next/link";

const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <li key={listing.id}>
      <Link className="w-screen flex flex-col items-center" href={`/listings/${listing.id}`} passHref>
        <div className="flex flex-col w-screen h-full items-center mt-7">
          {listing.images && listing.images.length > 0 && (
            <div className="flex justify-center overflow-hidden rounded-xl w-5/6 aspect-square">
              {listing.images.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`${listing.name} image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-4/5 mt-1">
          <p className="font-semibold text-xl">{listing.location}</p>
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
          <div className="flex items-baseline mt-1">
            <p className="text-lg font-semibold">${listing.pricePerNight}</p>
            <span className="text-base font-semibold">&nbsp;night</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListingCard;
