import prisma from "@/lib/prisma";
import { updateAnnouncement } from "../../actions";
import { notFound } from "next/navigation";
import SubmitButton from "@/components/admin/submit-button";

export default async function EditPengumuman({ params }: { params: { id: string } }) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({
    where: { id }
  });

  if (!announcement) {
    notFound();
  }

  // Action wrapper to pass the ID
  const updateWithId = updateAnnouncement.bind(null, id);

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: 'var(--color-primary)' }}>Edit Pengumuman</h1>
        <p style={{ color: 'var(--color-text-light)' }}>Perbarui informasi pengumuman yang sudah ada.</p>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
        <form action={updateWithId} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Judul Pengumuman</label>
              <input 
                name="title"
                type="text" 
                required
                defaultValue={announcement.title}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Tanggal</label>
              <input 
                name="createdAt"
                type="date"
                defaultValue={new Date(announcement.createdAt).toISOString().split('T')[0]}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Isi Pengumuman</label>
            <textarea 
              name="content"
              required
              defaultValue={announcement.content}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', minHeight: '250px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F9FAFB', padding: '12px', borderRadius: '8px' }}>
            <input 
              type="checkbox" 
              name="isPinned" 
              id="isPinned" 
              defaultChecked={announcement.isPinned}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }} 
            />
            <label htmlFor="isPinned" style={{ cursor: 'pointer', fontWeight: 500, fontSize: '0.95rem' }}>
              Sematkan di paling atas (Pinned)
            </label>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <div style={{ flex: 2 }}>
              <SubmitButton label="Simpan Perubahan" />
            </div>
            <a 
              href="/admin/pengumuman" 
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
