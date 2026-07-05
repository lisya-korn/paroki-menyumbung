'use client';

import { useState } from 'react';

interface CleanupResult {
  success: boolean;
  message: string;
  deletedCount: number;
  cloudinaryErrors: number;
  deletedItems: string[];
  cutoffDate: string;
}

export default function CleanupButton({ secret }: { secret: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CleanupResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCleanup = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus semua konten yang sudah lebih dari 3 bulan? Tindakan ini tidak dapat dibatalkan!')) {
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch(`/api/cleanup?secret=${encodeURIComponent(secret)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Terjadi kesalahan saat cleanup.');
      } else {
        setResult(data);
      }
    } catch {
      setError('Gagal terhubung ke server. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', minWidth: '200px' }}>
      <button
        onClick={handleCleanup}
        disabled={loading}
        style={{
          background: loading ? '#9CA3AF' : '#EF4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 20px',
          fontWeight: 600,
          fontSize: '0.9rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'background 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {loading ? (
          <>
            <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', fontSize: '1rem' }}>⏳</span>
            Sedang cleanup...
          </>
        ) : (
          <>
            🗑️ Jalankan Cleanup Sekarang
          </>
        )}
      </button>

      {result && (
        <div style={{
          background: '#F0FDF4',
          border: '1px solid #86EFAC',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '0.85rem',
          maxWidth: '320px',
          textAlign: 'right',
        }}>
          <div style={{ color: '#16A34A', fontWeight: 600, marginBottom: '4px' }}>
            ✅ {result.message}
          </div>
          {result.deletedCount > 0 && (
            <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>
              {result.cloudinaryErrors > 0 && (
                <span style={{ color: '#F59E0B' }}>⚠️ {result.cloudinaryErrors} foto gagal dihapus dari Cloudinary. </span>
              )}
              Batas waktu: {new Date(result.cutoffDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          )}
        </div>
      )}

      {error && (
        <div style={{
          background: '#FEF2F2',
          border: '1px solid #FCA5A5',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '0.85rem',
          color: '#DC2626',
          maxWidth: '320px',
          textAlign: 'right',
        }}>
          ❌ {error}
        </div>
      )}
    </div>
  );
}
