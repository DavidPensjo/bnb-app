import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  // Handle user registration
  const { name, email, password } = await request.json();

  // Add user creation logic, such as hashing the password
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password, // Note: In production, hash the password before saving
    },
  });

  return NextResponse.json(newUser);
}

export async function GET() {
  // Fetch all users
  const users = await prisma.user.findMany({
    include: {
      listings: true,
      bookings: true,
    },
  });

  return NextResponse.json(users);
}