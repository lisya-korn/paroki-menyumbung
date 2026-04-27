import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';

export const metadata: Metadata = {
  title: 'Paroki Menyumbung | Desa Menyumbung, Ketapang, Kalimantan Barat',
  description: 'Website resmi Paroki Menyumbung - Informasi kegiatan iman, budaya, sosial, ekonomi, dan berita terbaru dari Desa Menyumbung, Kecamatan Hulu Sungai, Kabupaten Ketapang, Kalimantan Barat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
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
