import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function BudayaPage() {
  const posts = await prisma.post.findMany({
    where: { category: 'budaya' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <section className="page-header">
        <div className="page-header__decoration" />
        <h1 className="page-header__title">Budaya</h1>
        <p className="page-header__desc">
          Kekayaan budaya, adat istiadat, dan tradisi masyarakat Dayak di Desa Menyumbung
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {posts.length === 0 ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px', color: 'var(--color-text-light)' }}>
                Belum ada konten budaya yang tercatat.
              </div>
            ) : (
              posts.map((item: any) => (
                <Link href={`/budaya/${item.id}`} key={item.id}>
                  <article className="card">
                    <div className="card__image-wrapper">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl.split('\n')[0].trim()} 
                          alt={item.title} 
                          className="card__image" 
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
                        />
                      ) : (
                        <div className="card__image" style={{ background: 'linear-gradient(135deg, #FFA62B, #F8E6A0)' }} />
                      )}
                      <span className="card__badge">{item.badge || 'Budaya'}</span>
                    </div>
                    <div className="card__body">
                      <span className="card__date">📅 {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <h3 className="card__title">{item.title}</h3>
                      <p className="card__excerpt">
                        {item.content.length > 120 ? item.content.substring(0, 120) + '...' : item.content}
                      </p>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
