import Link from 'next/link';
import { createStaff } from '../actions';
import SubmitButton from '@/components/admin/submit-button';

export default function BaruStaffPage() {
  return (
    <div className="admin-container">
      <div style={{ marginBottom: '32px' }}>
        <Link href="/admin/staff" style={{ color: 'var(--color-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          &larr; Kembali ke Daftar Pengurus
        </Link>
        <h1 style={{ marginTop: '16px' }}>Tambah Pengurus Baru</h1>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <form action={createStaff} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Nama Lengkap</label>
              <input 
                name="name" 
                type="text" 
                required
                placeholder="Contoh: R.P Rovinus Longa, CP"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Jabatan</label>
              <input 
                name="position" 
                type="text" 
                required
                placeholder="Contoh: Pastor Kepala Paroki"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Foto Pengurus</label>
            <input 
              name="image" 
              type="file" 
              accept="image/*"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
            />
            <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '8px' }}>
              Gunakan foto dengan rasio 3:4 agar terlihat rapi di struktur organisasi.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <SubmitButton label="Simpan Pengurus" />
            <Link href="/admin/staff" className="btn btn--outline" style={{ color: '#374151', borderColor: '#D1D5DB' }}>
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
