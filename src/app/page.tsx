import Link from 'next/link';
import prisma from '@/lib/prisma';

const categories = [
  { icon: '⛪', title: 'Kegiatan Iman', desc: 'Jadwal misa, doa, katekese, dan kegiatan rohani paroki', href: '/kegiatan-iman' },
  { icon: '🎭', title: 'Budaya', desc: 'Kekayaan budaya, adat istiadat, dan tradisi masyarakat Dayak', href: '/budaya' },
  { icon: '📰', title: 'Berita', desc: 'Berita umum paroki, informasi desa, dan kabar terkini', href: '/berita' },
  { icon: '🌾', title: 'Ekonomi', desc: 'UMKM, pertanian, hasil bumi, dan potensi ekonomi desa', href: '/ekonomi' },
];

export default async function HomePage() {
  // Ambil berita terbaru dari database (hanya kategori artikel utama)
  const latestPosts = await prisma.post.findMany({
    where: {
      category: {
        in: ['kegiatan-iman', 'budaya', 'berita', 'ekonomi', 'sosial'] // 'sosial' tetap dimasukkan jika masih ada data lama
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  const announcements = await prisma.announcement.findMany({
    orderBy: [
      { isPinned: 'desc' },
      { createdAt: 'desc' }
    ],
    take: 3
  });

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <img src="/images/hero-bg.png" alt="Desa Menyumbung" className="hero__bg" />
        <div className="hero__decoration" />
        <div className="hero__decoration hero__decoration--2" />
        <div className="hero__overlay" />
        <div className="container hero__content animate-in">
          <span className="hero__label">🏡 Desa Menyumbung, Ketapang</span>
          <h1 className="hero__title">Selamat Datang di<br />Paroki Menyumbung</h1>
          <p className="hero__desc">
            Melayani umat dengan penuh kasih di Desa Menyumbung, Kecamatan Hulu Sungai,
            Kabupaten Ketapang, Kalimantan Barat. Bersama membangun iman, melestarikan budaya,
            dan memajukan kehidupan sosial-ekonomi masyarakat.
          </p>
          <div className="hero__actions">
            <Link href="/kegiatan-iman" className="btn btn--primary">Lihat Kegiatan</Link>
            <Link href="/tentang" className="btn btn--outline">Tentang Kami</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--primary">
        <div className="container">
          <div className="stats">
            <div className="stat-card">
              <div className="stat-card__number">1.247</div>
              <div className="stat-card__label">Jiwa Penduduk</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">328</div>
              <div className="stat-card__label">Kepala Keluarga</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">5</div>
              <div className="stat-card__label">Dusun / Lingkungan</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">50+</div>
              <div className="stat-card__label">Tahun Pelayanan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Jadwal Misa */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Jadwal Perayaan Ekaristi</span>
            <h2 className="section-header__title">Jadwal Misa Paroki</h2>
          </div>
          
          <div className="jadwal-grid">
            <div className="jadwal-card">
              <div className="jadwal-card__header">
                <span className="jadwal-card__icon">⛪</span>
                <span className="jadwal-card__title">Misa Hari Minggu</span>
              </div>
              <div className="jadwal-card__time">🕒 Jam 07.30 WIB</div>
              <div className="jadwal-card__desc">Perayaan Ekaristi utama bersama seluruh umat paroki.</div>
            </div>

            <div className="jadwal-card">
              <div className="jadwal-card__header">
                <span className="jadwal-card__icon">🌅</span>
                <span className="jadwal-card__title">Misa Hari Sabtu (Vigili)</span>
              </div>
              <div className="jadwal-card__time">🕒 Jam 18.00 WIB</div>
              <div className="jadwal-card__desc">Misa Sabtu sore menyambut perayaan hari Minggu.</div>
            </div>

            <div className="jadwal-card">
              <div className="jadwal-card__header">
                <span className="jadwal-card__icon">☀️</span>
                <span className="jadwal-card__title">Misa Harian</span>
              </div>
              <div className="jadwal-card__time">🕒 Jam 06.00 WIB</div>
              <div className="jadwal-card__desc">Misa pagi harian di Gereja Paroki.</div>
            </div>

            <div className="jadwal-card">
              <div className="jadwal-card__header">
                <span className="jadwal-card__icon">🕯️</span>
                <span className="jadwal-card__title">Ibadat & Adorasi</span>
              </div>
              <div className="jadwal-card__time">🕒 Jam 18.00 WIB</div>
              <div className="jadwal-card__desc">Setiap Jumat Pertama dalam bulan.</div>
            </div>

            <div className="jadwal-card">
              <div className="jadwal-card__header">
                <span className="jadwal-card__icon">🕊️</span>
                <span className="jadwal-card__title">Misa Biara Susteran OSA</span>
              </div>
              <div className="jadwal-card__time">🕒 Setiap Jumat Jam 06.00 WIB</div>
              <div className="jadwal-card__desc">Perayaan Ekaristi bersama suster-suster OSA Menyumbung.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Features */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Layanan & Kegiatan</span>
            <h2 className="section-header__title">Jelajahi Paroki Menyumbung</h2>
            <p className="section-header__desc">
              Temukan berbagai informasi tentang kegiatan iman, budaya, sosial, dan ekonomi di Paroki Menyumbung.
            </p>
          </div>
          <div className="features">
            {categories.map((cat) => (
              <Link href={cat.href} key={cat.title}>
                <div className="feature-card">
                  <div className="feature-card__icon">{cat.icon}</div>
                  <h3 className="feature-card__title">{cat.title}</h3>
                  <p className="feature-card__desc">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Berita Terbaru</span>
            <h2 className="section-header__title">Kabar Terkini Paroki</h2>
            <p className="section-header__desc">
              Ikuti perkembangan terbaru dari kegiatan dan acara di Paroki Menyumbung.
            </p>
          </div>
          <div className="card-grid">
            {latestPosts.map((news: any) => (
              <Link href={`/${news.category}/${news.id}`} key={news.id}>
                <article className="card">
                  <div className="card__image-wrapper">
                    {news.imageUrl ? (
                      <img 
                        src={news.imageUrl.split('\n')[0].trim()} 
                        alt={news.title} 
                        className="card__image" 
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }} 
                      />
                    ) : (
                      <div className="card__image" style={{ background: 'linear-gradient(135deg, var(--color-secondary-light), var(--color-primary))' }} />
                    )}
                    <span className="card__badge">{news.badge || news.category}</span>
                  </div>
                  <div className="card__body">
                    <span className="card__date">📅 {new Date(news.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <h3 className="card__title">{news.title}</h3>
                    <p className="card__excerpt">
                      {news.content.length > 100 ? news.content.substring(0, 100) + '...' : news.content}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/kegiatan-iman" className="btn btn--outline">Lihat Semua Berita</Link>
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="section">
        <div className="container">
          <div className="announcement-box">
            <h2 className="announcement-box__title">📢 Pengumuman Paroki</h2>
            <ul className="announcement-list">
              {announcements.map((ann: any) => (
                <li className="announcement-item" key={ann.id}>
                  <Link href="/pengumuman" className="announcement-item__link">
                    <span className="announcement-item__text">
                      {ann.isPinned && <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>📌</span>}
                      {ann.title}
                    </span>
                    <span className="announcement-item__date">
                      {new Date(ann.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '24px' }}>
              <Link href="/pengumuman" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                Lihat Semua Pengumuman &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
