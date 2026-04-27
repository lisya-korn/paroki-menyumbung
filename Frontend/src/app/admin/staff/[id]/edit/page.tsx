import Link from 'next/link';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { updateStaff } from '../../actions';
import SubmitButton from '@/components/admin/submit-button';

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staff = await prisma.post.findUnique({
    where: { id }
  });

  if (!staff || staff.category !== 'staff') {
    notFound();
  }

  const updateWithId = updateStaff.bind(null, id);

  return (
    <div className="admin-container">
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/staff" style={{ color: 'var(--color-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          &larr; Kembali ke Daftar Pengurus
        </Link>
        <h1 style={{ marginTop: '16px' }}>Edit Pengurus</h1>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <form action={updateWithId} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nama Lengkap</label>
              <input 
                name="name" 
                type="text" 
                required
                defaultValue={staff.title}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Jabatan</label>
              <input 
                name="position" 
                type="text" 
                required
                defaultValue={staff.content}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Foto Pengurus (Opsional)</label>
            {staff.imageUrl && (
              <div style={{ marginBottom: '16px' }}>
                <img src={staff.imageUrl} alt={staff.title} style={{ width: '100px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>Foto saat ini</p>
              </div>
            )}
            <input 
              name="image" 
              type="file" 
              accept="image/*"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
            />
            <input type="hidden" name="existingImageUrl" value={staff.imageUrl || ''} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <SubmitButton label="Simpan Perubahan" />
            <Link href="/admin/staff" className="btn btn--outline" style={{ color: '#374151', borderColor: '#D1D5DB' }}>
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
