import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Kategori yang TERKENA auto-delete (bukan tentang/staff/pengumuman/galeri)
const CATEGORIES_TO_CLEANUP = ['berita', 'kegiatan-iman', 'budaya', 'ekonomi'];

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const cronSecret = process.env.CRON_SECRET;

  // Izinkan jika: (1) Vercel Cron header, (2) secret cocok, (3) admin login
  const authHeader = request.headers.get('authorization');
  const isVercelCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const isManualWithSecret = cronSecret && secret === cronSecret;
  const session = await getServerSession(authOptions);
  const isAdminSession = !!session;

  if (!isVercelCron && !isManualWithSecret && !isAdminSession) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Hitung batas waktu: 5 bulan yang lalu
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

    // Ambil semua post yang sudah lebih dari 5 bulan
    const expiredPosts = await prisma.post.findMany({
      where: {
        category: { in: CATEGORIES_TO_CLEANUP },
        createdAt: { lt: fiveMonthsAgo },
      },
      select: { id: true, title: true, imageUrl: true, category: true },
    });

    let deletedCount = 0;
    let cloudinaryErrors = 0;
    const deletedTitles: string[] = [];

    for (const post of expiredPosts) {
      // Hapus semua gambar dari Cloudinary
      if (post.imageUrl) {
        const urls = post.imageUrl
          .split('\n')
          .map((u) => u.trim())
          .filter((u) => u && u.startsWith('http'));

        for (const url of urls) {
          const deleted = await deleteFromCloudinary(url);
          if (!deleted) cloudinaryErrors++;
        }
      }

      // Hapus post dari database
      await prisma.post.delete({ where: { id: post.id } });
      deletedCount++;
      deletedTitles.push(`[${post.category}] ${post.title}`);
    }

    console.log(`[Cleanup] Berhasil hapus ${deletedCount} konten. Cloudinary errors: ${cloudinaryErrors}`);

    return NextResponse.json({
      success: true,
      message: `Cleanup selesai. ${deletedCount} konten dihapus.`,
      cutoffDate: fiveMonthsAgo.toISOString(),
      deletedCount,
      cloudinaryErrors,
      deletedItems: deletedTitles,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('[Cleanup] Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan sistem' },
      { status: 500 }
    );
  }
}
