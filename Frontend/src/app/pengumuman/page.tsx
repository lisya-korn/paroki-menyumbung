import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function PengumumanPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <>
      <section className="page-header">
        <div className="page-header__decoration" />
        <h1 className="page-header__title">Pengumuman</h1>
        <p className="page-header__desc">
          Informasi penting dan pengumuman terbaru dari Paroki Menyumbung
        </p>
      </section>
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
            {announcements.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-light)' }}>
                Belum ada pengumuman untuk saat ini.
              </div>
            ) : (
              announcements.map((item: any) => (
                <Link href={`/pengumuman/${item.id}`} key={item.id}>
                  <div className="announcement-banner" style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                    <div className="announcement-banner__icon">{item.isPinned ? '📌' : '🔔'}</div>
                    <div className="announcement-banner__text" style={{ flex: 1 }}>
                      <div className="announcement-banner__title">{item.title}</div>
                      <div className="announcement-banner__desc">
                        {item.content.length > 150 ? item.content.substring(0, 150) + '...' : item.content}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)', marginTop: '8px' }}>
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
