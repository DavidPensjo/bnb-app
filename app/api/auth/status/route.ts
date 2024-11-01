import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const authToken = cookies().get("auth_token");

  if (!authToken) {
    return NextResponse.json({ authenticated: false });
  }

  const decoded = verifyToken(authToken.value);

  if (decoded) {
    return NextResponse.json({ authenticated: true, user: decoded });
  } else {
    return NextResponse.json({ authenticated: false });
  }
}
