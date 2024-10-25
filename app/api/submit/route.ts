import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { input } = await request.json();
  // Perform any logic you need with the input data
  console.log('Received input:', input);

  // Return a response
  return NextResponse.json({ message: 'Form submitted successfully', input });
}