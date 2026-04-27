export { default } from "next-auth/middleware";

export const config = {
  // Melindungi semua route yang diawali dengan /admin, KECUALI /admin/login
  matcher: ["/admin/((?!login).*)"]
};
