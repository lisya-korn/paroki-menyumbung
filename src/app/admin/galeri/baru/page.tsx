import { createGalleryItem } from "../actions";
import SubmitButton from "@/components/admin/submit-button";

export default function BaruGaleri() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--color-primary)' }}>Unggah Foto Baru</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Tambahkan foto dokumentasi ke dalam galeri publik.</p>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <form action={createGalleryItem} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Judul Foto (Opsional)</label>
            <input 
              name="title"
              type="text" 
              placeholder="Contoh: Gedung Gereja Tampak Depan"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Pilih Foto dari Perangkat</label>
            <input 
              name="files"
              type="file" 
              multiple
              accept="image/*"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none', background: 'white' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>Tips: Anda bisa memilih banyak foto sekaligus untuk upload massal.</p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Atau Link URL Gambar Manual</label>
            <input 
              name="imageUrl"
              type="text" 
              placeholder="Contoh: /images/galeri-1.jpg"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Keterangan / Deskripsi</label>
            <textarea 
              name="description"
              placeholder="Berikan sedikit keterangan tentang foto ini..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', minHeight: '120px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ flex: 2 }}>
              <SubmitButton label="Unggah Sekarang" loadingLabel="Mengunggah..." />
            </div>
            <a 
              href="/admin/galeri" 
              className="btn btn--outline" 
              style={{ flex: 1, textAlign: 'center', color: '#6B7280', borderColor: '#E5E7EB', padding: '14px', textDecoration: 'none' }}
            >
              Batal
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
