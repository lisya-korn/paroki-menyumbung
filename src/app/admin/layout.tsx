import { Suspense } from "react";
import AdminNotifications from "@/components/admin/notifications";
import AdminNavbar from "@/components/admin/admin-navbar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  console.log("Admin Session Check:", session ? "LOGGED IN" : "NOT LOGGED IN");

  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6' }}>
      <Suspense fallback={null}>
        <AdminNotifications />
      </Suspense>
      <header style={{ background: 'var(--color-primary)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Panel Admin Paroki</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {session && (
            <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>Halo, {session.user?.name}</span>
          )}
          <Link href="/" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.9rem' }}>Kembali ke Web Publik</Link>
        </div>
      </header>
      <AdminNavbar />
      <main>
        {children}
      </main>
    </div>
  );
}
