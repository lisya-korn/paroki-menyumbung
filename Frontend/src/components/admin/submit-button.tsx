'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton({ 
  label = 'Simpan', 
  loadingLabel = 'Menyimpan...',
  className = 'btn btn--primary'
}: { 
  label?: string; 
  loadingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending} 
      className={className}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '10px',
        opacity: pending ? 0.7 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }}
    >
      {pending && <div className="spinner" />}
      {pending ? loadingLabel : label}
    </button>
  );
}
