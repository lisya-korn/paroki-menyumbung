"use server";

import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function checkLoginBlock() {
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  const attempt = await prisma.loginAttempt.findUnique({
    where: { ip }
  });

  if (attempt && attempt.attempts >= 5) {
    const now = new Date();
    const tenMinutesInMs = 10 * 60 * 1000;
    const timePassed = now.getTime() - attempt.lastAttempt.getTime();

    if (timePassed < tenMinutesInMs) {
      const expiresAt = attempt.lastAttempt.getTime() + tenMinutesInMs;
      return {
        isBlocked: true,
        expiresAt: expiresAt,
        message: `Terlalu banyak percobaan login. Akun Anda dibekukan sementara.`
      };
    } else {
      // Sudah lewat 10 menit, hapus dari database agar bisa coba lagi
      await prisma.loginAttempt.delete({ where: { ip } });
    }
  }

  return { isBlocked: false };
}
