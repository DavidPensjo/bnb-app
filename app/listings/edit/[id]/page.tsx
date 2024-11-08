"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  MinusCircle,
  Home,
  DollarSign,
  BedDouble,
  Image,
} from "lucide-react";

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    pricePerNight: 0,
    rooms: 1,
    beds: 1,
    images: [""],
    hasDishwasher: false,
    hasWifi: false,
    hasAirConditioning: false,
    hasPool: false,
    hasParking: false,
    hasGym: false,
    hasWasher: false,
    hasDryer: false,
  });

  useEffect(() => {
    async function fetchListing() {
      try {
        const response = await fetch(`/api/listings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...data,
            pricePerNight: Number(data.pricePerNight),
            rooms: Number(data.rooms),
            beds: Number(data.beds),
            images: data.images || [""],
          });
        } else {
          console.error("Failed to fetch listing data");
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    }

    if (id) fetchListing();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : ["pricePerNight", "rooms", "beds"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ""],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedImages = formData.images.map((img, i) =>
      i === index ? e.target.value : img
    );
    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      router.push("/my-listings");
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  const amenities = [
    { name: "hasDishwasher", label: "Dishwasher" },
    { name: "hasWifi", label: "Wi-Fi" },
    { name: "hasAirConditioning", label: "Air Conditioning" },
    { name: "hasPool", label: "Pool" },
    { name: "hasParking", label: "Parking" },
    { name: "hasGym", label: "Gym" },
    { name: "hasWasher", label: "Washer" },
    { name: "hasDryer", label: "Dryer" },
  ];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Edit Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-lg font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-lg font-medium">
                    Location
                  </Label>
                  <div className="flex items-center mt-1">
                    <Home className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="pricePerNight"
                    className="text-lg font-medium"
                  >
                    Price per Night
                  </Label>
                  <div className="flex items-center mt-1">
                    <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
                    <Input
                      id="pricePerNight"
                      name="pricePerNight"
                      type="number"
                      value={formData.pricePerNight}
                      onChange={handleChange}
                      min={0}
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="rooms" className="text-lg font-medium">
                      Rooms
                    </Label>
                    <Input
                      id="rooms"
                      name="rooms"
                      type="number"
                      value={formData.rooms}
                      onChange={handleChange}
                      min={1}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="beds" className="text-lg font-medium">
                      Beds
                    </Label>
                    <div className="flex items-center mt-1">
                      <BedDouble className="w-5 h-5 mr-2 text-muted-foreground" />
                      <Input
                        id="beds"
                        name="beds"
                        type="number"
                        value={formData.beds}
                        onChange={handleChange}
                        min={1}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-lg font-medium">Images (URLs)</Label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <Image className="w-5 h-5 mr-2 text-muted-foreground" />
                      <Input
                        name="images"
                        value={image}
                        onChange={(e) => handleImageChange(e, index)}
                        placeholder={`Image URL ${index + 1}`}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                        className="ml-2"
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={handleAddImage}
                    variant="outline"
                    className="mt-2"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Another Image
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {amenities.map((amenity) => (
                  <div
                    key={amenity.name}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={amenity.name}
                      name={amenity.name}
                      checked={
                        formData[
                          amenity.name as keyof typeof formData
                        ] as boolean
                      }
                      onCheckedChange={(checked: boolean) =>
                        setFormData((prev) => ({
                          ...prev,
                          [amenity.name]: checked,
                        }))
                      }
                    />
                    <Label htmlFor={amenity.name}>{amenity.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Update Listing
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
