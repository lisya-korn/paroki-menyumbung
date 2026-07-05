import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/logoP.png" 
                alt="Logo Paroki Menyumbung" 
                style={{ height: '56px', width: 'auto', borderRadius: '8px' }} 
              />
              <div className="footer__brand-name" style={{ marginBottom: 0 }}>Paroki Menyumbung</div>
            </div>
            <p className="footer__brand-desc" style={{ marginTop: 0 }}>
              Paroki Menyumbung terletak di Desa Menyumbung, Kecamatan Hulu Sungai,
              Kabupaten Ketapang, Kalimantan Barat. Melayani umat dengan penuh kasih
              dalam iman, budaya, dan kehidupan sosial.
            </p>
          </div>

          <div>
            <h4 className="footer__heading">Menu</h4>
            <Link href="/kegiatan-iman" className="footer__link">Kegiatan Iman</Link>
            <Link href="/budaya" className="footer__link">Budaya</Link>
            <Link href="/berita" className="footer__link">Berita</Link>
            <Link href="/ekonomi" className="footer__link">Ekonomi</Link>
          </div>

          <div>
            <h4 className="footer__heading">Informasi</h4>
            <Link href="/galeri" className="footer__link">Galeri</Link>
            <Link href="/pengumuman" className="footer__link">Pengumuman</Link>
            <Link href="/tentang" className="footer__link">Tentang Kami</Link>
          </div>

          <div>
            <h4 className="footer__heading">Kontak</h4>
            <p className="footer__link">📍 Desa Menyumbung, Kec. Hulu Sungai</p>
            <p className="footer__link">📍 Kab. Ketapang, Kalbar</p>
            <p className="footer__link">📞 +62 822-5206-9686</p>
          </div>
        </div>

        <div className="footer__bottom" style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', textAlign: 'center' }}>
          <span>© {new Date().getFullYear()} Paroki Menyumbung. Hak Cipta Dilindungi.</span>
          <span style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.6 }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/>
            </svg>
            Dikembangkan oleh <strong style={{ color: 'rgba(255,255,255,0.65)' }}>KKN UAJY 89 &mdash; Kelompok 74</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}
