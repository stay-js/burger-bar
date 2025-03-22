import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env";

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");

  if (!apiKey || apiKey !== env.API_KEY) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
