import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { input } = await request.json();
  console.log('Received input:', input);

  return NextResponse.json({ message: 'Form submitted successfully', input });
}