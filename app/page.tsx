import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MapPin, Star, Users } from "lucide-react";
import Link from "next/link";

export default function VacationRentalsLanding() {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Discover Your Perfect Getaway
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Discover amazing properties for your next getaway. Book with
                  ease and enjoy your dream vacation.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Search destinations"
                    type="text"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Featured Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Beachfront Villa",
                  location: "Malibu, CA",
                  price: "$350",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "Mountain Cabin",
                  location: "Aspen, CO",
                  price: "$250",
                  image: "/placeholder.svg?height=400&width=600",
                },
                {
                  title: "City Loft",
                  location: "New York, NY",
                  price: "$200",
                  image: "/placeholder.svg?height=400&width=600",
                },
              ].map((property, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{property.title}</CardTitle>
                    <CardDescription>
                      <MapPin className="h-4 w-4 inline-block mr-1" />
                      {property.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt={property.title}
                      className="w-full h-48 object-cover mb-4"
                      height="200"
                      src={property.image}
                      style={{
                        aspectRatio: "300/200",
                        objectFit: "cover",
                      }}
                      width="300"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">
                        {property.price}/night
                      </span>
                      <Button>Book Now</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Wide Selection",
                  description:
                    "Choose from thousands of unique properties worldwide.",
                  icon: <MapPin className="h-10 w-10 mb-4 text-primary" />,
                },
                {
                  title: "Best Price Guarantee",
                  description:
                    "Find the best deals and exclusive offers on vacation rentals.",
                  icon: <Star className="h-10 w-10 mb-4 text-primary" />,
                },
                {
                  title: "24/7 Support",
                  description:
                    "Our customer support team is always here to help you.",
                  icon: <Users className="h-10 w-10 mb-4 text-primary" />,
                },
              ].map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="flex justify-center">{benefit.icon}</div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              What Our Guests Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Alice Johnson",
                  comment:
                    "Amazing experience! The property was even better than the pictures.",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Bob Smith",
                  comment:
                    "Great customer service and a fantastic location. Will definitely book again!",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Carol Davis",
                  comment:
                    "Seamless booking process and a wonderful stay. Highly recommended!",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          alt={testimonial.name}
                          src={testimonial.avatar}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>"{testimonial.comment}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Book Your Dream Vacation?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                  Start your journey today and create unforgettable memories.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-black"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" variant="secondary">
                    Get Started
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 VacayStay. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
