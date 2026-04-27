import { Suspense } from "react";
import AdminNotifications from "@/components/admin/notifications";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#F3F4F6' }}>
      <Suspense fallback={null}>
        <AdminNotifications />
      </Suspense>
      <header style={{ background: 'var(--color-primary)', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Panel Admin Paroki</h2>
        <a href="/" style={{ color: 'white', textDecoration: 'underline', fontSize: '0.9rem' }}>Kembali ke Web Publik</a>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
