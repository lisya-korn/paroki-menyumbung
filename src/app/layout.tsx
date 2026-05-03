import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export const viewport: Viewport = {
  themeColor: '#2E5AA7',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'Paroki Menyumbung | Desa Menyumbung, Ketapang',
    template: '%s | Paroki Menyumbung'
  },
  description: 'Website resmi Paroki Menyumbung - Informasi kegiatan iman, budaya, sosial, ekonomi, dan berita terbaru dari Desa Menyumbung, Kecamatan Hulu Sungai, Kabupaten Ketapang, Kalimantan Barat.',
  manifest: '/manifest.json',
  keywords: ['Paroki Menyumbung', 'Gereja Katolik Ketapang', 'Desa Menyumbung', 'Keuskupan Ketapang', 'Hulu Sungai Ketapang', 'Kegiatan Iman', 'Budaya Dayak'],
  authors: [{ name: 'Paroki Menyumbung' }],
  creator: 'Paroki Menyumbung',
  publisher: 'Paroki Menyumbung',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Paroki Menyumbung | Desa Menyumbung, Ketapang',
    description: 'Website resmi Paroki Menyumbung, Ketapang, Kalimantan Barat.',
    url: 'https://parokimenyumbung.com',
    siteName: 'Paroki Menyumbung',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paroki Menyumbung | Desa Menyumbung, Ketapang',
    description: 'Website resmi Paroki Menyumbung, Ketapang, Kalimantan Barat.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PlaceOfWorship",
  "name": "Paroki Menyumbung",
  "alternateName": "Paroki Salib Suci Menyumbung",
  "description": "Gereja Katolik Paroki Menyumbung, Keuskupan Ketapang, Kalimantan Barat.",
  "url": "https://parokimenyumbung.com",
  "logo": "https://parokimenyumbung.com/images/logoP.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Desa Menyumbung",
    "addressRegion": "Kalimantan Barat",
    "addressCountry": "ID"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main className="mt-header">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
