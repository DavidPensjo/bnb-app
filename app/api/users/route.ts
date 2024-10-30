import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json(newUser);
}

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      listings: true,
      bookings: true,
    },
  });

  return NextResponse.json(users);
}