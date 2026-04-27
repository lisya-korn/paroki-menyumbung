'use client';

import SubmitButton from './submit-button';

export default function DeleteStaffButton({ id, onDelete }: { id: string, onDelete: (formData: FormData) => void }) {
  const confirmDelete = (e: React.FormEvent) => {
    if (!confirm('Hapus pengurus ini?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={onDelete} onSubmit={confirmDelete}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit" 
        style={{ padding: '6px 12px', background: '#FEE2E2', color: '#DC2626', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer' }}
      >
        Hapus
      </button>
    </form>
  );
}
