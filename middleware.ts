import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/api/view", "/api/view/:id*"],
};

export function middleware(request: NextRequest) {
  request.headers.delete("cache-control");

  const object: { [key: string]: string } = {};
  for (const [key, value] of request.headers) {
    object[key] = value;
  }

  console.log("middleware", {
    url: request.url,
    headers: object,
    cache: request.cache,
    cookies: request.cookies.getAll().map((cookie) => cookie.toString()),
    referrer: request.referrer,
  });

  return NextResponse.next();
}
