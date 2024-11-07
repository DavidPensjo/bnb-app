import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET() {
  const token = cookies().get("auth_token")?.value;
  if (!token) {
    return new Response("Not authenticated", { status: 401 });
  }

  const decoded = verifyToken(token) as JwtPayload | null;
  const userId = decoded?.userId;

  if (!userId) {
    return new Response("Invalid or expired token", { status: 403 });
  }

  try {
    const listings = await prisma.listing.findMany({
      where: { userId },
      include: { bookings: true },
    });

    return new Response(JSON.stringify(listings), { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return new Response("Failed to fetch listings", { status: 500 });
  }
}
