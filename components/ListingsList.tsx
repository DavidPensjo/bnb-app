"use client";
import { useEffect, useState } from "react";
import { Listing } from "@prisma/client";
import ListingCard from "@/components/ListingCard";

export default function ListingsList() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch("/api/listings");
      const data: Listing[] = await response.json();
      setListings(data);
    };

    fetchListings();
  }, []);

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </ul>
    </div>
  );
}
