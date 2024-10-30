"use client";

import { Button } from "@/components/ui/button";

interface ReserveButtonProps {
  listingId: string;
  dates: { startDate: Date; endDate: Date } | null;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({ listingId, dates }) => {
  return (
    <Button
      className="text-white py-6 px-6 rounded-lg min-w-[150px] font-medium text-xl mt-1"
      disabled={!dates}
      onClick={() => {
        console.log("Reserving listing with dates:", dates);
      }}
    >
      Reserve
    </Button>
  );
};

export default ReserveButton;
