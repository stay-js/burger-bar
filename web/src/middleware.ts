import {
  type NextFetchEvent,
  NextResponse,
  type NextRequest,
} from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { env } from "./env";
import { type NextMiddlewareResult } from "next/dist/server/web/types";

const clerkHandler = clerkMiddleware();

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const clerkResponse = clerkHandler(request, event);
  if (clerkResponse instanceof Promise) {
    return clerkResponse.then((res) => apiMiddleware(request, res));
  }
}

function apiMiddleware(
  request: NextRequest,
  response: NextMiddlewareResult | undefined,
) {
  if (!request.nextUrl.pathname.startsWith("/api"))
    return response ?? NextResponse.next();

  const apiKey = request.headers.get("x-api-key");

  if (!apiKey || apiKey !== env.API_KEY) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return response ?? NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
