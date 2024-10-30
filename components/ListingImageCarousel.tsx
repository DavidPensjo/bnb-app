import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ListingImageCarouselProps {
  images: string[];
  variant?: "detailed" | "preview";
}

const ListingImageCarousel: React.FC<ListingImageCarouselProps> = ({
  images,
  variant = "preview",
}) => {
  return (
    <Carousel
      className={`w-full ${
        variant === "detailed" ? "aspect-[10/7]" : "aspect-square w-[95%]"
      }`}
    >
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className={`${
                    variant === "detailed" ? "" : "p-4"
                  }`}>
                <CardContent
                  className={`${
                    variant === "detailed" ? "aspect-[10/7] p-0" : "aspect-square p-0"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`Listing image ${index + 1}`}
                    className={`h-full w-full object-cover ${
                      variant === "detailed" ? "" : "rounded-xl"
                    }`}
                  />
                </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ListingImageCarousel;
