import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth"; // Ensure this is your JWT verify function or import it as needed.

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");

  if (!token || !verifyToken(token.value)) {
    // Redirect to login if the user is unauthenticated and trying to access a protected page.
    if (
      request.nextUrl.pathname.startsWith("/listings") ||
      request.nextUrl.pathname.startsWith("/bookings")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to all routes that require authentication.
export const config = {
  matcher: ["/listings/:path*", "/bookings/:path*"],
};
