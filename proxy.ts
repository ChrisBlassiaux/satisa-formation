import { NextResponse } from "next/server";

// Blog posts intentionally removed for good — respond 410 Gone so search
// engines drop them from the index instead of redirecting or leaving them
// as an ambiguous 404.
export function proxy() {
  return new NextResponse(null, { status: 410 });
}

export const config = {
  matcher: ["/blog/erreurs-projet-rncp", "/blog/digitaliser-formation-par-ou-commencer"],
};
