import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Ambil statistik sederhana dari database
  const pengumumanCount = await prisma.announcement.count();
  const kontenCount = await prisma.post.count({ where: { category: { not: 'staff' } } });
  const galeriCount = await prisma.gallery.count();
  const staffCount = await prisma.post.count({ where: { category: 'staff' } });

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Dashboard Admin</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Selamat datang, <strong>{session.user?.name || session.user?.email}</strong>. Silakan kelola konten website di sini.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* Card Pengumuman */}
        <div style={{ background: 'var(--color-white)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--color-accent)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📢</div>
          <h3 style={{ marginBottom: '8px' }}>Pengumuman</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>Total ada <strong>{pengumumanCount}</strong> pengumuman aktif.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/admin/pengumuman" className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center' }}>Kelola</Link>
            <Link href="/admin/pengumuman/baru" className="btn btn--outline" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>+ Tambah</Link>
          </div>
        </div>

        {/* Card Konten Halaman */}
        <div style={{ background: 'var(--color-white)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #2563EB' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📝</div>
          <h3 style={{ marginBottom: '8px' }}>Konten Halaman</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>Iman, Budaya, Sosial, Ekonomi. Total: <strong>{kontenCount}</strong> artikel.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/admin/konten" className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', backgroundColor: '#2563EB', borderColor: '#2563EB' }}>Kelola</Link>
            <Link href="/admin/konten/baru" className="btn btn--outline" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', borderColor: '#2563EB', color: '#2563EB' }}>+ Tambah</Link>
          </div>
        </div>

        {/* Card Galeri */}
        <div style={{ background: 'var(--color-white)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #F59E0B' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🖼️</div>
          <h3 style={{ marginBottom: '8px' }}>Galeri Foto</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>Total ada <strong>{galeriCount}</strong> foto dalam galeri.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/admin/galeri" className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', backgroundColor: '#F59E0B', borderColor: '#F59E0B' }}>Kelola</Link>
            <Link href="/admin/galeri/baru" className="btn btn--outline" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', borderColor: '#F59E0B', color: '#F59E0B' }}>+ Tambah</Link>
          </div>
        </div>

        {/* Card Pengurus */}
        <div style={{ background: 'var(--color-white)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #10B981' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>👥</div>
          <h3 style={{ marginBottom: '8px' }}>Pengurus Paroki</h3>
          <p style={{ color: 'var(--color-text-light)', marginBottom: '24px' }}>Total ada <strong>{staffCount}</strong> pengurus terdaftar.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/admin/staff" className="btn btn--primary" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', backgroundColor: '#10B981', borderColor: '#10B981' }}>Kelola</Link>
            <Link href="/admin/staff/baru" className="btn btn--outline" style={{ padding: '8px 16px', fontSize: '0.9rem', flex: 1, textAlign: 'center', borderColor: '#10B981', color: '#10B981' }}>+ Tambah</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
