import prisma from '@/lib/prisma';

const visiMisi = {
  visi: 'Umat Allah Keuskupan Ketapang bercita-cita untuk menjadi: Persaudaraan murid-murid Yesus Kristus yang semakin tangguh dalam beriman dan dalam pelayanan kasih.',
  misi: [
    'Membina kader iman.',
    'Mengajarkan iman pada umat.',
    'Melaksanakan pelayanan kasih kepada yang menderita: kecil, lemah, menderita, tersingkir, dan difabel.',
    'Melaksanakan pelayanan kasih kepada alam ciptaan.',
    'Mengembangkan tata kelola penggembalaan, administrasi, harta benda, dan keuangan yang dapat dipercaya.',
  ],
  spiritualitas: 'Cita-cita tersebut dilaksanakan dalam semangat kasih yang dicurahkan oleh Roh Kudus (Roma 5:5) dan seturut teladan Santa Gemma Galgani yang membuahkan nilai-nilai:',
  nilai: [
    'Bela Rasa',
    'Sabar',
    'Rendah Hati',
    'Tahan Banting',
    'Profesional',
    'Kreatif-Inovatif',
    'Partisipatif',
  ]
};

const strukturOrganisasi = [
  {
    jabatan: 'Ketua Umum 1 (Pastor Kepala Ex Officio)',
    nama: 'R.P Rovinus Longa, CP',
    image: '/images/panggilan-3.jpeg',
    imageStyle: { objectPosition: 'center 20%', transform: 'scale(1.8)' }
  },
  {
    jabatan: 'Ketua Umum 1 (Pastor Rekan)',
    nama: 'R.P Mauritius Lero, CP',
    image: '/images/pastor_rekan.jpeg',
    imageStyle: { objectPosition: 'center 20%', transform: 'scale(1.8)' }
  },
  { jabatan: 'Ketua 1', nama: 'Leo Pede' },
  { jabatan: 'Ketua 2', nama: 'Yohanes Jhon Fiser' },
  {
    jabatan: 'Sekretaris 1',
    nama: 'Firmus Marjuki',
    image: '/images/sekret-1.jpeg',
    imageStyle: { objectPosition: 'center', transform: 'scale(1.0)' }
  },
  {
    jabatan: 'Sekretaris 2',
    nama: 'Mardianto',
    image: '/images/sekret-2.jpeg',
    imageStyle: { objectPosition: 'center', transform: 'scale(1.0)' }
  },
  {
    jabatan: 'Bendahara 1',
    nama: 'Wilhelmus Abur',
    image: '/images/bendahara_1.jpeg',
    imageStyle: { objectPosition: 'center', transform: 'scale(1.1)' }
  },
  {
    jabatan: 'Bendahara 2',
    nama: 'Margavita M. Elin',
    image: '/images/bendahara_2.jpeg',
    imageStyle: { objectPosition: 'center', transform: 'scale(1.1)' }
  }
];

const wilayahParoki = [
  { nama: "Menyumbung", pelindung: "Salib Suci", isPusat: true },
  { nama: "Mariangin", pelindung: "Santa Maria Bunda Allah" },
  { nama: "Sepanggang", pelindung: "Santo Yoseph" },
  { nama: "Sengkuang", pelindung: "Santa Maria Ratu Pembawa Damai" },
  { nama: "Senduruhan", pelindung: "Santo Yohanes Pembaptis" },
  { nama: "Bahake", pelindung: "Sang Penebus" },
  { nama: "Coba", pelindung: "Santo Paulus Rasul" },
  { nama: "K. Ampon", pelindung: "Santa Maria" },
  { nama: "Kenyabur", pelindung: "Santo Yoseph" },
  { nama: "Teluk Songkam", pelindung: "Santo Fransiskus Xaverius" },
  { nama: "Kenabung", pelindung: "Santo Mikhael Malaikat Agung" },
  { nama: "Tanjung Bunut", pelindung: "Santo Markus" },
  { nama: "Riam Perupuk", pelindung: "Santo Vinsensius Maria Strambi" }
];

const faqPelayanan = [
  { tanya: "Mengapa tim kesehatan harus ada rekoleksi?", jawab: "Menyatukan ora et labora: berdoa dan bekerja." },
  { tanya: "Mengapa harus ada pengukuhan?", jawab: "Supaya ada otoritas untuk melayani." },
  { tanya: "Mengapa harus bekerja sama dengan paroki dan keuskupan?", jawab: "Sebagai orang beriman, mewujudkan visi dan misi Keuskupan Ketapang (Beriman, bersaudara, dan berbelaskasih)." }
];

export default async function TentangPage() {
  const staff = await prisma.post.findMany({
    where: { category: 'staff' },
    orderBy: { createdAt: 'asc' }
  });

  const pusatParoki = wilayahParoki.find(w => w.isPusat);
  const stasiList = wilayahParoki.filter(w => !w.isPusat);

  return (
    <>
      <section className="page-header">
        <div className="page-header__decoration" />
        <h1 className="page-header__title">Tentang Paroki</h1>
        <p className="page-header__desc">
          Mengenal lebih dekat Paroki Menyumbung, Desa Menyumbung, Kecamatan Hulu Sungai
        </p>
      </section>

      {/* Profil */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="section-header" style={{ textAlign: 'left' }}>
                <span className="section-header__label">Profil</span>
                <h2 className="section-header__title">Sejarah Paroki Menyumbung</h2>
              </div>
              <div style={{ color: 'var(--color-text-light)', lineHeight: '1.9', fontSize: '1.02rem' }}>
                <p style={{ marginBottom: '16px' }}>
                  Kunjungan awal para misionaris ke daerah Menyumbung diperkirakan pada tahun 1936. Dalam catatan Pastor Leo de Jong, seorang misionaris Kapusin yang pernah ditahan Jepang di Kuching tahun 1942, pada 2 November – 29 Desember 1936 P. David melakukan perjalanan dari Sintang sepanjang Hulu Pinoh, Hulu Pawan, Menyebrang Hulu Matan dan kemudian sepanjang Hulu Laur dan Sekadau, kemudian kembali ke Sanggau dan Sintang.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Pada tahun 1939 Pastor Gerardus melakukan perjalanan ke daerah Simpang. Setelah itu ia mengunjungi wilayah Sekukun di Sungai Bihak dan Menyumbung di aliran Sungai Krio. Sehabis melakukan perjalanan itu Pastor Gerardus menderita sakit tifus yang berat dan hampir meninggal.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Setelah daerah misi Ketapang diambil alih oleh misi Pasionis tahun 1946 dan mereka mulai membuka basis misi di Randau tahun 1948, Menyumbung secara rutin dikunjungi oleh pastor Plechelmus Dullaert, CP yang waktu itu mulai menetap di Randau. Pastor berikutnya yang pernah berkunjung ke Menyumbung adalah P. Augustinus Dullaert, CP dan Pastor Canisius Pijnappels, CP yang pernah tinggal di Randau dari tahun 1949 – 1954. Demikian juga P. Laurentius Puts, CP yang pernah bertugas di Randau Tahun 1949-1952, P. Raymundus de Groot, CP yang bertugas dari tahun 1952 – 1959, P. Edward Corbey, CP (1953 – 1960) dan P. Theopile Seesing, CP (1958-1961).
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Dalam buku Catatan Pater Bernardinus Knippenberg, CP dicatat beberapa Pastor yang pernah mengunjungi Menyumbung yaitu P. Canisius (September 1948, November 1956, Mei 1960), P. Bernardinus (Februari 1949), P. Rafael Kleyne, CP (April 1951).
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Pada 28 Agustus 1955 seorang gadis asal Menyumbung diterima sebagai calon Suster Agustinus. Gadis tersebut bernama Marsia Tembaga. Tiga rekannya yang juga diterima sebagai calon suster adalah Florentina Dondot dari Sekukun, Marsia Enjol dan Yulia Yoka, keduanya dari Randau. Setelah menjadi suster Marsia Tembaga menjadi Sr. Theresia Tembaga, OSA.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Pada tanggal 12 Juni 1962 Paroki Salib Suci Menyumbung secara resmi berdiri. Pastor Paroki yang pertama bertugas di sana adalah P. Theopile Seesing, CP yang sebelumnya bertugas di Randau dan sering berkunjung ke daerah ini. Pastor Theopile bertugas di Paroki ini selama 24 tahun dari tahun 1961 – 1985. Pada masa P. Theopile menjadi Pastor Paroki di Menyumbung ini pulalah didirikan SD Usaba Menyumbung di bawah naungan Yayasan Usaba yang didirikan pada tahun 1953. Belakangan SD ini diserahkan pengelolaaannya kepada Suster OSA pada 9 Januari 1979. Setelah dikelola suster OSA SD ini menjadi SD St. Augustinus Menyumbung.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Pada bulan Maret 1966 P. Theopile membawa motor GUNUNG KUAT ke Menyumbung. Motor alumunium dengan outboard 15 PK hadiah dari paroki Monford. Motor air inilah yang menjadi andalan P. Theopile untuk transportasi pulang pergi dari Ketapang - Sandai - Menyumbung.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Pada 16 Januari 1974 Kontrak pembangunan biara Suster Menyumbung ditandatangani oleh A Heng, seorang pemborong asal Siduk. Pada bulan Juni 1974 biara ini mulai dibangun oleh Frans Ampur. Pada bulan Februari 1975 ketika diadakan peninjauan oleh Pimpinan OSA (Sr. Maria Paulo) pembangunan hampir selesai. Bangunan ini dinilai cukup baik, pondasinya cukup kuat. Peresmian Biara Suster OSA ini dilakukan pada bulan Mei 1975. Kemudian pada bulan Juni 1975 diresmikan pula Poliklinik Ria Rantai di Menyumbung.
                </p>
                <p>
                  Paroki yang terdiri dari 14 stasi ini memiliki umat lebih dari 11.000 jiwa. Dari paroki ini telah muncul putra putri terbaik yang telah memiliki peran penting dalam kehidupan berbangsa dan menggereja. Sebut saja misalnya A.R. Mecer (mantan anggota MPR RI, pendiri Yayasan Pancur Kasih dan Bapak CU Indonesia), Syaikun Riyadi, (mantan Kepala PU Ketapang), Silvia Sayu (dosen Untan), Guru Madju dan Maria Magdalena Lili (mantan anggota DPRD Kabupaten Ketapang).
                </p>
              </div>
            </div>
            <div className="about-grid__images-side">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                {[2, 3, 4, 5].map((num, index) => (
                  <div key={num} style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                    aspectRatio: index === 1 ? '16 / 9' : undefined // Kunci rasio untuk foto kedua agar crop aktif
                  }}
                    className="hover-lift"
                  >
                    <img
                      src={`/images/p${num}.jpeg`}
                      alt={`Sejarah ${num}`}
                      style={{
                        width: '100%',
                        height: index === 1 ? '100%' : 'auto',
                        display: 'block',
                        objectFit: index === 1 ? 'cover' : undefined,
                        objectPosition: index === 1 ? 'center 70%' : undefined // Geser fokus ke bawah (crop atap)
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section
        className="section"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/bg2.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(25, 20, 20, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '24px 48px',
              borderRadius: 'var(--radius-lg)',
              borderBottom: '4px solid var(--color-accent)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              <span className="section-header__label" style={{ color: 'var(--color-accent)', marginBottom: '8px', display: 'block' }}>Visi & Misi</span>
              <h2 className="section-header__title" style={{ color: 'var(--color-white)', margin: 0 }}>Arah dan Tujuan Paroki</h2>
            </div>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="info-card" style={{ marginBottom: '24px', background: 'rgba(25, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderLeftColor: 'var(--color-accent)' }}>
              <h3 className="info-card__title" style={{ color: 'var(--color-accent)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '1.2rem', textAlign: 'center', marginBottom: '20px' }}>Visi</h3>
              <p className="info-card__text" style={{ color: 'var(--color-white)', fontSize: '1.25rem', fontStyle: 'italic', lineHeight: '1.8', textAlign: 'center' }}>
                "{visiMisi.visi}"
              </p>
            </div>
            <div className="info-card" style={{ marginBottom: '24px', background: 'rgba(25, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderLeftColor: 'var(--color-accent)' }}>
              <h3 className="info-card__title" style={{ color: 'var(--color-accent)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '1.2rem', textAlign: 'center', marginBottom: '16px' }}>Misi (Perutusan)</h3>
              <p className="info-card__text" style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>
                Cita-cita (visi) hendak dicapai dengan:
              </p>
              <ol style={{ paddingLeft: '0', listStyle: 'none', counterReset: 'misi-counter' }}>
                {visiMisi.misi.map((m, i) => (
                  <li key={i} className="info-card__text" style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', position: 'relative', paddingLeft: '40px' }}>
                    <span style={{ position: 'absolute', left: 0, top: '-2px', fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 'bold' }}>0{i + 1}</span>
                    {m}
                  </li>
                ))}
              </ol>
            </div>
            <div className="info-card" style={{ background: 'rgba(25, 20, 20, 0.85)', backdropFilter: 'blur(10px)', borderLeftColor: 'var(--color-accent)' }}>
              <h3 className="info-card__title" style={{ color: 'var(--color-accent)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '1.2rem', textAlign: 'center', marginBottom: '16px' }}>Spiritualitas dan Nilai-Nilai</h3>
              <p className="info-card__text" style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center' }}>
                {visiMisi.spiritualitas}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {visiMisi.nilai.map((n, i) => (
                  <span key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', color: 'var(--color-white)', fontSize: '0.9rem', letterSpacing: '1px' }}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Struktur</span>
            <h2 className="section-header__title">Pengurus Dewan Pastoral Paroki</h2>
          </div>
          <div className="info-cards">
            {staff.map((item: any, i: number) => (
              <div className="info-card" key={i}>
                <div className="info-card__icon" style={{
                  padding: 0,
                  overflow: 'hidden',
                  aspectRatio: '3 / 4',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex'
                }}>
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl.split('\n')[0]}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2E5AA7, #86C5FF)' }}>
                    </div>
                  )}
                </div>
                <h3 className="info-card__title">{item.title}</h3>
                <p className="info-card__text" style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>{item.content}</p>
              </div>
            ))}
            {staff.length === 0 && (
              <p style={{ textAlign: 'center', width: '100%', color: 'var(--color-text-light)' }}>
                Data pengurus sedang diperbarui.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Wilayah Paroki */}
      <section className="section" style={{ background: '#eef5ff' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Wilayah</span>
            <h2 className="section-header__title">Pusat Paroki & Stasi</h2>
            <p style={{ color: 'var(--color-text-light)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
              Paroki Salib Suci Menyumbung mencakup 1 Pusat Paroki dan 12 Stasi yang tersebar di wilayah pelayanan.
            </p>
          </div>

          <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
            {pusatParoki && (
              <div className="info-card hover-lift" style={{
                borderLeftColor: 'var(--color-accent)',
                background: 'white',
                padding: '32px 24px',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: 'var(--shadow-md)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  background: 'rgba(235, 186, 116, 0.15)',
                  color: '#c27e1f',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  marginBottom: '16px'
                }}>
                  Pusat Paroki
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'var(--color-text-dark)' }}>
                  {pusatParoki.nama}
                </h3>
                <div style={{ color: 'var(--color-text-light)', fontSize: '1rem' }}>
                  Pelindung: <strong style={{ color: 'var(--color-text-dark)' }}>{pusatParoki.pelindung}</strong>
                </div>
              </div>
            )}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {stasiList.map((wilayah, index) => (
              <div key={index} className="info-card hover-lift" style={{
                borderLeftColor: 'var(--color-primary)',
                background: 'white',
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    background: 'rgba(46, 90, 167, 0.08)',
                    color: 'var(--color-primary)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    marginBottom: '16px'
                  }}>
                    Stasi
                  </div>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--color-text-dark)', flexGrow: 1 }}>
                  {wilayah.nama}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
                  <span>Pelindung: <strong style={{ color: 'var(--color-text-dark)' }}>{wilayah.pelindung}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prinsip Pelayanan */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Pelayanan</span>
            <h2 className="section-header__title">Prinsip Pelayanan Pastoral</h2>
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqPelayanan.map((faq, index) => (
              <div key={index} className="hover-lift" style={{
                background: 'white',
                border: '1.5px solid rgba(46, 90, 167, 0.3)', /* Border warna primary transparan keliling */
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', marginBottom: '12px' }}>
                  {faq.tanya}
                </h3>
                <p style={{ color: 'var(--color-text-light)', margin: 0, lineHeight: '1.6' }}>
                  {faq.jawab}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-Book Paroki */}
      <section className="section" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">E-Book</span>
            <h2 className="section-header__title">Buku Paroki Salib Suci Menyumbung</h2>
            <p style={{ color: 'var(--color-text-light)', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
              Silakan baca e-book profil dan panduan paroki kami secara interaktif di bawah ini.
            </p>
          </div>
          
          <div style={{ maxWidth: '1000px', margin: '0 auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '1px solid #e2e8f0' }}>
            <iframe 
              src="https://drive.google.com/file/d/1JlNSw21JoHnx9YvIdRY-b7axyyfhg1PR/preview" 
              style={{ width: '100%', height: '800px', border: 'none' }} 
              allow="autoplay"
              title="Buku Paroki Salib Suci Menyumbung"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Lokasi */}
      <section className="section section--cream">
        <div className="container">
          <div className="section-header">
            <span className="section-header__label">Lokasi</span>
            <h2 className="section-header__title">Alamat & Kontak</h2>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="info-card">
              <p className="info-card__text" style={{ marginBottom: '12px' }}>Desa Menyumbung, Kecamatan Hulu Sungai</p>
              <p className="info-card__text" style={{ marginBottom: '12px' }}>Kabupaten Ketapang, Kalimantan Barat</p>
              <p className="info-card__text">+62 822-5206-9686</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
