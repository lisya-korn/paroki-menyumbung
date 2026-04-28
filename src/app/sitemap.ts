import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://paroki-menyumbung.vercel.app';

  // Ambil semua berita untuk sitemap dinamis
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      updatedAt: true,
    },
  });

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/berita/${post.id}`,
    lastModified: post.updatedAt,
  }));

  // Halaman statis
  const staticPages = [
    '',
    '/berita',
    '/kegiatan-iman',
    '/budaya',
    '/ekonomi',
    '/tentang',
    '/galeri',
    '/pengumuman',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...postUrls];
}
