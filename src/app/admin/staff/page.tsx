import Link from 'next/link';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import DeleteItemButton from '@/components/admin/delete-item-button';

export default async function AdminStaffPage() {
  const staff = await prisma.post.findMany({
    where: { category: 'staff' },
    orderBy: { createdAt: 'asc' }
  });

  async function deleteStaff(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.post.delete({ where: { id } });
    revalidatePath('/admin/staff');
    revalidatePath('/tentang');
    redirect('/admin/staff?status=success&message=Pengurus berhasil dihapus');
  }

  return (
    <div className="admin-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ margin: 0 }}>Kelola Pengurus Paroki</h1>
        <Link href="/admin/staff/baru" className="btn btn--primary">
          + Tambah Pengurus
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
            <tr>
              <th style={{ padding: '16px' }}>Foto</th>
              <th style={{ padding: '16px' }}>Nama</th>
              <th style={{ padding: '16px' }}>Jabatan</th>
              <th style={{ padding: '16px', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((item: any) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '16px' }}>
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl.split('\n')[0]} 
                      alt={item.title} 
                      style={{ width: '50px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} 
                    />
                  ) : (
                    <div style={{ width: '50px', height: '60px', background: '#E5E7EB', borderRadius: '6px' }} />
                  )}
                </td>
                <td style={{ padding: '16px', fontWeight: 600 }}>{item.title}</td>
                <td style={{ padding: '16px', color: '#6B7280' }}>{item.content}</td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Link 
                      href={`/admin/staff/${item.id}/edit`}
                      style={{ padding: '6px 12px', background: '#F3F4F6', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      Edit
                    </Link>
                    <DeleteItemButton id={item.id} onDelete={deleteStaff} confirmMessage={`Hapus pengurus "${item.title}"?`} />
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
                  Belum ada data pengurus. Silakan tambah pengurus baru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
