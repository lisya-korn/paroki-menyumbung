'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminNotifications() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const status = searchParams.get('status');
    const message = searchParams.get('message');

    if (status && message) {
      setToast({ 
        message: decodeURIComponent(message), 
        type: status === 'success' ? 'success' : 'error' 
      });

      // Hilangkan param dari URL agar tidak muncul lagi saat refresh
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('status');
      newParams.delete('message');
      const newUrl = window.location.pathname + (newParams.toString() ? `?${newParams.toString()}` : '');
      window.history.replaceState({}, '', newUrl);

      // Sembunyikan toast setelah 5 detik
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast--${toast.type}`}>
        <span style={{ fontSize: '1.2rem' }}>
          {toast.type === 'success' ? '✅' : '❌'}
        </span>
        <div>
          <strong style={{ display: 'block', fontSize: '0.9rem' }}>
            {toast.type === 'success' ? 'Berhasil!' : 'Gagal!'}
          </strong>
          <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>{toast.message}</span>
        </div>
        <button 
          onClick={() => setToast(null)}
          style={{ marginLeft: 'auto', opacity: 0.5, fontSize: '1.2rem', padding: '4px' }}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
