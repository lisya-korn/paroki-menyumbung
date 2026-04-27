import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteAnnouncement } from "./actions";
import DeleteItemButton from "@/components/admin/delete-item-button";

export default async function AdminPengumumanList() {
  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteAnnouncement(id);
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: 'var(--color-primary)' }}>Kelola Pengumuman</h1>
          <p style={{ color: 'var(--color-text-light)' }}>Daftar berita dan informasi paroki.</p>
        </div>
        <Link href="/admin/pengumuman/baru" className="btn btn--primary" style={{ padding: '12px 24px' }}>+ Buat Pengumuman Baru</Link>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            <tr>
              <th style={{ padding: '16px', fontWeight: 600 }}>Judul</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Tanggal</th>
              <th style={{ padding: '16px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '16px', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-light)' }}>
                  Belum ada pengumuman. Silakan buat yang pertama!
                </td>
              </tr>
            ) : (
              announcements.map((item: any) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{item.title}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
                    {new Date(item.createdAt).toLocaleDateString('id-ID')}
                  </td>
                  <td style={{ padding: '16px' }}>
                    {item.isPinned && (
                      <span style={{ background: '#FEF3C7', color: '#92400E', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>
                        📌 Pinned
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end' }}>
                      <Link 
                        href={`/admin/pengumuman/${item.id}/edit`} 
                        style={{ color: 'var(--color-primary)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}
                      >
                        Edit
                      </Link>
                      <DeleteItemButton id={item.id} onDelete={handleDelete} confirmMessage={`Hapus pengumuman "${item.title}"?`} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
