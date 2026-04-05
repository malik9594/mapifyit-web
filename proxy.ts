import { NextResponse, type NextRequest } from "next/server";

const ONE_YEAR = 31536000; // seconds
const HSTS = `max-age=${ONE_YEAR}; includeSubDomains; preload`;

// Runs for every request; adds security headers including nosniff to all responses
export function proxy(_req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("Strict-Transport-Security", HSTS);
  res.headers.set("X-Content-Type-Options", "nosniff");
  return res;
}

export const config = {
  matcher: "/:path*",
};
