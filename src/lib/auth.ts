import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Helper untuk mencatat percobaan login gagal
async function recordFailedAttempt(ip: string) {
  const attempt = await prisma.loginAttempt.findUnique({ where: { ip } });

  if (attempt) {
    await prisma.loginAttempt.update({
      where: { ip },
      data: {
        attempts: { increment: 1 },
        lastAttempt: new Date()
      }
    });
  } else {
    await prisma.loginAttempt.create({
      data: { ip, attempts: 1 }
    });
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@menyumbung.id" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan Password wajib diisi");
        }

        const ip = (req.headers?.['x-forwarded-for'] as string)?.split(',')[0] || '127.0.0.1';
        
        // 1. Cek apakah sedang diblokir (Rate Limiting)
        const attempt = await prisma.loginAttempt.findUnique({
          where: { ip }
        });

        if (attempt && attempt.attempts >= 5) {
          const now = new Date();
          const tenMinutesInMs = 10 * 60 * 1000;
          const timePassed = now.getTime() - attempt.lastAttempt.getTime();

          if (timePassed < tenMinutesInMs) {
            const remainingMinutes = Math.ceil((tenMinutesInMs - timePassed) / (60 * 1000));
            throw new Error(`Terlalu banyak percobaan login. Akun Anda dibekukan sementara. Silakan coba lagi dalam ${remainingMinutes} menit.`);
          } else {
            // Sudah lewat 10 menit, reset percobaan
            await prisma.loginAttempt.delete({ where: { ip } });
          }
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          // Catat kegagalan
          await recordFailedAttempt(ip);
          throw new Error("Email tidak ditemukan");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          // Catat kegagalan
          await recordFailedAttempt(ip);
          throw new Error("Password salah");
        }

        // 2. Jika berhasil, hapus catatan kegagalan
        try {
          await prisma.loginAttempt.delete({ where: { ip } });
        } catch (e) {
          // Abaikan jika data tidak ada
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.sub as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 menit
  },
  secret: process.env.NEXTAUTH_SECRET,
};
