import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ImageSlider from '@/components/ui/image-slider';

export default async function BudayaDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.post.findUnique({
    where: { id }
  });

  if (!post || post.category !== 'budaya') {
    notFound();
  }

  // Pisahkan link gambar jika ada lebih dari 1
  const images = post.imageUrl 
    ? post.imageUrl.split('\n').map((img: string) => img.trim()).filter((img: string) => img !== '') 
    : [];

  const beritaLainnya = await prisma.post.findMany({
    where: { 
      category: 'budaya',
      id: { not: id }
    },
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <section className="section" style={{ paddingTop: 'calc(24px)' }}>
      <div className="container">
        <div className="article-layout">
          <div className="article-main">
            <div className="article-breadcrumb">
              <Link href="/">🏠</Link>
              <span className="article-breadcrumb__separator">/</span>
              <Link href="/budaya">Budaya</Link>
              <span className="article-breadcrumb__separator">/</span>
              <span>Detail</span>
            </div>

            <h1 className="article-title">{post.title}</h1>

            <div className="article-meta">
              <span className="article-meta__item">🗓 {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="article-meta__item">✍️ Admin Paroki</span>
            </div>

            {images.length > 0 ? (
              <ImageSlider images={images} altPrefix={post.title} />
            ) : (
              <div className="article-image">
                <div style={{ width: '100%', height: '400px', background: 'linear-gradient(135deg, #FFA62B, #F8E6A0)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '4rem', borderRadius: '12px' }}>
                  📷
                </div>
              </div>
            )}

            <div className="article-body">
              {post.content.split('\n').map((p: string, i: number) => (
                <p key={i} style={{ marginBottom: '1.5rem' }}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="article-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-card__title">Konten Budaya Lainnya</h3>
              <div className="sidebar-list">
                {beritaLainnya.map((item: any) => (
                  <Link href={`/budaya/${item.id}`} key={item.id} className="sidebar-item">
                    <div className="sidebar-item__text">
                      <div className="sidebar-item__title">{item.title}</div>
                      <div className="sidebar-item__date">{new Date(item.createdAt).toLocaleDateString('id-ID')}</div>
                    </div>
                  </Link>
                ))}
                {beritaLainnya.length === 0 && <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Belum ada konten lain.</p>}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
