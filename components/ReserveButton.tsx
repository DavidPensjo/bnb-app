"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ReserveButtonProps {
  listingId: string;
  dates: { startDate: Date; endDate: Date } | null;
  nights: number | null;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({
  listingId,
  dates,
  nights,
}) => {
  const router = useRouter();

  const handleReserve = () => {
    if (dates && nights) {
      const startDate = dates.startDate.toISOString();
      const endDate = dates.endDate.toISOString();
      router.push(
        `/listings/${listingId}/booking?startDate=${startDate}&endDate=${endDate}&nights=${nights}`
      );
    }
  };

  return (
    <Button
      className="text-white py-6 px-6 rounded-lg min-w-[150px] font-medium text-xl mt-1"
      disabled={!dates}
      onClick={handleReserve}
    >
      Reserve
    </Button>
  );
};

export default ReserveButton;
