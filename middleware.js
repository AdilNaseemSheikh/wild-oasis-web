import { auth } from "./app/_lib/auth";
/* import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}

*/

// this middleware is to protect /account page
// if authorize, user will be redirected to /account otherwise to the signin route provided by NexAuth.

export const middleware = auth; // just exporting auth by renaming it to middleware

export const config = {
  matcher: ["/account"],
};
