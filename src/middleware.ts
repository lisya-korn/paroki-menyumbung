import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const SESSION_MAX_AGE_SECONDS = 15 * 60; // 15 menit - harus sama dengan auth.ts

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthPage = req.nextUrl.pathname.startsWith("/admin/login");

    // Cek apakah token valid DAN belum expired
    let isAuth = false;
    if (token) {
      const now = Math.floor(Date.now() / 1000);
      const issuedAt = token.iat as number | undefined;
      
      if (issuedAt && (now - issuedAt) > SESSION_MAX_AGE_SECONDS) {
        // Token sudah expired, paksa logout
        isAuth = false;
      } else {
        isAuth = true;
      }
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }

      return NextResponse.redirect(
        new URL(`/admin/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      // Izinkan middleware function di atas yang handle logic auth,
      // jangan block di level ini agar redirect bisa berjalan
      authorized: () => true,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
