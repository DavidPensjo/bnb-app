"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import { useRouter } from "next/navigation";
import { Listing } from "@prisma/client";

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchListings() {
      const res = await fetch("/api/my-listings");
      if (res.ok) {
        setListings(await res.json());
      } else if (res.status === 401) {
        router.push("/");
      }
    }
    fetchListings();
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 mx-6 mt-6">
        Your Listings
      </h1>
      <div className="grid gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
