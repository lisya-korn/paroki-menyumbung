import prisma from '@/lib/prisma';

export default async function GaleriPage() {
  const galleryItems = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <>
      <section className="page-header">
        <div className="page-header__decoration" />
        <h1 className="page-header__title">Galeri</h1>
        <p className="page-header__desc">
          Dokumentasi foto kegiatan dan kehidupan di Paroki Menyumbung
        </p>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryItems.length === 0 ? (
              <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px', color: 'var(--color-text-light)' }}>
                Belum ada foto di galeri.
              </div>
            ) : (
              galleryItems.map((item) => (
                <div className="gallery-item" key={item.id}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2E5AA7, #86C5FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '3rem' }}>
                      📷
                    </div>
                  )}
                  <div className="gallery-item__overlay">
                    <div>
                      <span className="gallery-item__caption">{item.title}</span>
                      {item.description && (
                        <>
                          <br />
                          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{item.description}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
