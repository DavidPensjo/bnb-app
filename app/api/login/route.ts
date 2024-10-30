import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET || 'your_secret_key',
    { expiresIn: '1h' }
  );

  return NextResponse.json({ token });
}
