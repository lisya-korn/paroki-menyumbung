import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PengumumanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const announcement = await prisma.announcement.findUnique({
    where: { id }
  });

  if (!announcement) {
    notFound();
  }

  return (
    <>
      <section className="page-header">
        <div className="page-header__decoration" />
        <h1 className="page-header__title">{announcement.title}</h1>
      </section>
      <section className="detail">
        <div className="container detail__container">
          <Link href="/pengumuman" className="detail__back">← Kembali ke Pengumuman</Link>
          <div className="detail__meta">
            <span className="detail__tag">{announcement.isPinned ? '📌 Pinned' : '🔔 Pengumuman'}</span>
            <span className="detail__date">📅 {new Date(announcement.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="detail__body">
            {announcement.content.split('\n').map((p: string, i: number) => (
              <p key={i} style={{ marginBottom: '1rem' }}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
