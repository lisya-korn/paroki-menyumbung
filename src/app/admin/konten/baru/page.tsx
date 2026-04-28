import { createPost } from "../actions";
import SubmitButton from "@/components/admin/submit-button";

export default function BaruKonten() {
  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--color-primary)' }}>Tambah Konten Baru</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Pilih kategori dan isi detail artikel Anda.</p>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <form action={createPost} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Kategori Konten</label>
              <select 
                name="category" 
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none', background: 'white' }}
              >
                <option value="kegiatan-iman">Kegiatan Iman</option>
                <option value="budaya">Budaya</option>
                <option value="berita">Berita Umum</option>
                <option value="ekonomi">Ekonomi</option>
                <option value="tentang">Tentang Paroki</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Tanggal Publikasi (Opsional)</label>
              <input 
                name="createdAt"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Label / Badge (Tampil di Gelembung)</label>
            <input 
              name="badge"
              type="text" 
              placeholder="Contoh: Misa, Liturgi, Adat, UMKM, dll"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Judul Artikel</label>
            <input 
              name="title"
              type="text" 
              required
              placeholder="Contoh: Upacara Adat Gawai Dayak 2026"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Upload Foto dari Perangkat</label>
            <input 
              name="files"
              type="file" 
              multiple
              accept="image/*"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none', background: 'white' }}
            />
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>Anda bisa memilih lebih dari 1 foto sekaligus.</p>
          </div>


          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Isi Artikel</label>
            <textarea 
              name="content"
              required
              placeholder="Tulis isi lengkap artikel di sini..."
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', minHeight: '300px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ flex: 2 }}>
              <SubmitButton label="Simpan & Publikasikan" />
            </div>
            <a 
              href="/admin/konten" 
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
