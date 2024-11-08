"use client";
import { useEffect, useState } from "react";
import { Listing } from "@prisma/client";
import ListingCard from "@/components/ListingCard";

export default function ListingsList() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndListings = async () => {
      // Fetch user data
      const userResponse = await fetch("/api/auth/user");
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserId(userData.id); // Assuming the user ID is `id`
      }

      // Fetch listings
      const listingsResponse = await fetch("/api/listings");
      const data: Listing[] = await listingsResponse.json();
      setListings(data);
    };

    fetchUserAndListings();
  }, []);

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} userId={userId} />
        ))}
      </ul>
    </div>
  );
}
