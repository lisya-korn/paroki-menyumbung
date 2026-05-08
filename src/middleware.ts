import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const SESSION_MAX_AGE_SECONDS = 15 * 60; // 15 menit - harus sama dengan auth.ts

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthPage = req.nextUrl.pathname.startsWith("/admin/login");

    let isAuth = !!token;
    let isIdle = false;

    if (token) {
      const now = Math.floor(Date.now() / 1000);
      const lastActivityStr = req.cookies.get("admin-last-activity")?.value;
      const lastActivity = lastActivityStr ? parseInt(lastActivityStr, 10) : (token.iat as number);
      
      if (now - lastActivity > SESSION_MAX_AGE_SECONDS) {
        // Token sudah expired karena idle, paksa logout
        isAuth = false;
        isIdle = true;
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

      const response = NextResponse.redirect(
        new URL(`/admin/login?from=${encodeURIComponent(from)}`, req.url)
      );

      if (isIdle) {
        // Hapus token next-auth dan cookie activity agar benar-benar terlogout
        const secure = req.nextUrl.protocol === "https:";
        const cookieName = secure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
        response.cookies.delete(cookieName);
        response.cookies.delete("admin-last-activity");
      }

      return response;
    }

    // Jika terautentikasi dan tidak idle, update cookie activity
    const response = NextResponse.next();
    response.cookies.set("admin-last-activity", Math.floor(Date.now() / 1000).toString(), {
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
      httpOnly: true,
      secure: req.nextUrl.protocol === "https:",
      sameSite: "lax",
    });

    return response;
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
