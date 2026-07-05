import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import CleanupButton from "../../../components/admin/cleanup-button";

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

  // Hitung konten yang akan kadaluarsa dalam 7 hari ke depan
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
  const sevenDaysFromExpiry = new Date(fiveMonthsAgo);
  sevenDaysFromExpiry.setDate(sevenDaysFromExpiry.getDate() + 7);

  const expiredCount = await prisma.post.count({
    where: {
      category: { in: ['berita', 'kegiatan-iman', 'budaya', 'ekonomi'] },
      createdAt: { lt: fiveMonthsAgo },
    },
  });

  const soonExpireCount = await prisma.post.count({
    where: {
      category: { in: ['berita', 'kegiatan-iman', 'budaya', 'ekonomi'] },
      createdAt: { gte: fiveMonthsAgo, lt: sevenDaysFromExpiry },
    },
  });

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

        {/* Card Manajemen Storage */}
        <div style={{ background: 'var(--color-white)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid #EF4444', gridColumn: '1 / -1', marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '2rem' }}>🗂️</span>
                <h3 style={{ margin: 0 }}>Manajemen Storage</h3>
              </div>
              <p style={{ color: 'var(--color-text-light)', margin: 0, fontSize: '0.95rem' }}>
                Konten (Berita, Iman, Budaya, Ekonomi) otomatis dihapus setelah <strong>5 bulan</strong> sejak upload, termasuk foto di Cloudinary.
              </p>
              <div style={{ display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
                <div style={{ background: '#FEF2F2', padding: '10px 16px', borderRadius: '8px', borderLeft: '3px solid #EF4444' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#EF4444' }}>{expiredCount}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Sudah kadaluarsa</div>
                </div>
                <div style={{ background: '#FFFBEB', padding: '10px 16px', borderRadius: '8px', borderLeft: '3px solid #F59E0B' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F59E0B' }}>{soonExpireCount}</div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Kadaluarsa dalam 7 hari</div>
                </div>
              </div>
            </div>
            <CleanupButton secret={process.env.CRON_SECRET || ''} />
          </div>
        </div>

    </div>
  );
}
