import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "hi"],
  defaultLocale: "hi",
  localePrefix: "always",
});

export async function middleware(request: NextRequest) {
  // First, get the localized response from next-intl
  const response = intlMiddleware(request);

  // Then, pass it to Supabase for session management
  return await updateSession(request, response);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
