import React from "react";
import {
  Wifi,
  AirVent,
  Waves,
  SquareParking,
  Dumbbell,
  WashingMachine,
} from "lucide-react";

const amenitiesData = [
  { name: "Wifi", Icon: Wifi, key: "hasWifi" },
  { name: "AC", Icon: AirVent, key: "hasAirConditioning" },
  { name: "Pool", Icon: Waves, key: "hasPool" },
  { name: "Parking", Icon: SquareParking, key: "hasParking" },
  { name: "Gym", Icon: Dumbbell, key: "hasGym" },
  { name: "Washer", Icon: WashingMachine, key: "hasWasher" },
];

interface AmenitiesProps {
  amenities: { [key: string]: boolean };
}

const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  const availableAmenities = amenitiesData.filter(
    (amenity) => amenities[amenity.key]
  );

  return (
    <div className="grid grid-cols-2 gap-3 justify-center mt-4 mb-10">
      {availableAmenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center gap-2 border rounded-full shadow-md p-1 pl-3"
        >
          <amenity.Icon className="text-gray-600" />
          <div className="capitalize text-sm font-medium">{amenity.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
