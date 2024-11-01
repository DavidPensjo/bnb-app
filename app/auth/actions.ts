"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function registerUser(data: {
  email: string;
  password: string;
  name: string;
}) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  });

  return newUser;
}

export async function loginUser(data: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = signToken(user.id);
  cookies().set("auth_token", token, { httpOnly: true, maxAge: 3600 });

  return user;
}

export async function logoutUser() {
  cookies().set("auth_token", "", { httpOnly: true, maxAge: 0 });
}