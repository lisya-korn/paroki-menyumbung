import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteGalleryItem } from "./actions";

export default async function AdminGaleriList() {
  const items = await prisma.gallery.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)' }}>Kelola Galeri Foto</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Unggah dan kelola foto dokumentasi paroki.</p>
        </div>
        <Link href="/admin/galeri/baru" className="btn btn--primary" style={{ padding: '12px 24px' }}>+ Unggah Foto Baru</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '40px', color: 'var(--color-text-light)', background: 'white', borderRadius: '12px' }}>
            Belum ada foto. Silakan unggah foto pertama Anda!
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
              <div style={{ height: '160px', overflow: 'hidden' }}>
                <img src={item.imageUrl} alt={item.title || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{item.title || 'Tanpa Judul'}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#6B7280', height: '40px', overflow: 'hidden' }}>{item.description || '-'}</p>
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <form action={async () => {
                    "use server";
                    await deleteGalleryItem(item.id);
                  }}>
                    <button type="submit" style={{ color: '#DC2626', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                      Hapus Foto
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
