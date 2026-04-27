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
          </div>
        </div>

        <div className="footer__bottom">
          © {new Date().getFullYear()} Paroki Menyumbung. Hak Cipta Dilindungi.
        </div>
      </div>
    </footer>
  );
}
