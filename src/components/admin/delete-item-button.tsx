'use client';

export default function DeleteItemButton({ 
  id, 
  onDelete, 
  label = 'Hapus',
  confirmMessage = 'Yakin ingin menghapus item ini?'
}: { 
  id: string, 
  onDelete: (formData: FormData) => void,
  label?: string,
  confirmMessage?: string
}) {
  const confirmDelete = (e: React.FormEvent) => {
    if (!confirm(confirmMessage)) {
      e.preventDefault();
    }
  };

  return (
    <form action={onDelete} onSubmit={confirmDelete}>
      <input type="hidden" name="id" value={id} />
      <button 
        type="submit" 
        style={{ 
          padding: '6px 12px', 
          background: 'none', 
          border: 'none',
          color: '#DC2626', 
          fontSize: '0.9rem', 
          cursor: 'pointer',
          fontWeight: 500 
        }}
      >
        {label}
      </button>
    </form>
  );
}
