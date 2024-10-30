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
  const sortedAmenities = [...amenitiesData].sort(
    (a, b) => Number(amenities[b.key]) - Number(amenities[a.key])
  );

  return (
    <div>
      <p className="ml-10 mb-4 font-bold">Amenities</p>
      <div className="grid grid-cols-2 gap-4 justify-center mb-2 mx-10">
        {sortedAmenities.map((amenity, index) => {
          const isAvailable = amenities[amenity.key];
          return (
            <div
              key={index}
              className={`flex items-center gap-2 border rounded-full shadow-md p-1 pl-3 ${
                isAvailable
                  ? "text-gray-700"
                  : "text-gray-400 bg-gray-200"
              }`}
              style={{
                backgroundImage: isAvailable
                  ? "none"
                  : "repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 10px, #f7fafc 10px, #f7fafc 20px)",
              }}
            >
              <amenity.Icon
                className={isAvailable ? "text-gray-600" : "text-gray-400"}
              />
              <div className="text-sm font-medium">{amenity.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Amenities;