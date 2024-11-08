"use client";
import React, { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import { useRouter } from "next/navigation";
import { Listing } from "@prisma/client";
import { Button } from "@/components/ui/button";

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [userId, setUserId] = useState<string | null>(null); // Store logged-in user ID
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndListings() {
      // Fetch user data to get the logged-in user's ID
      const userResponse = await fetch("/api/auth/user");
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserId(userData.id); // Assuming the user ID is stored as `id`
      }

      const listingsResponse = await fetch("/api/my-listings");
      if (listingsResponse.ok) {
        setListings(await listingsResponse.json());
      } else if (listingsResponse.status === 401) {
        router.push("/");
      }
    }
    fetchUserAndListings();
  }, [router]);

  const handleCreateListing = () => {
    router.push("/listings/create");
  };

  return (
    <div>
      <div className="flex justify-between items-center mx-6 mt-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8">
          Your Listings
        </h1>
        <Button onClick={handleCreateListing}>Create Listing</Button>
      </div>
      <ul className="grid">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} userId={userId} />
        ))}
      </ul>
    </div>
  );
}
