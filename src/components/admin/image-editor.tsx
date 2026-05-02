"use client";

import { useState } from "react";

interface ImageEditorProps {
  initialImageUrl: string;
}

export default function ImageEditor({ initialImageUrl }: ImageEditorProps) {
  const [urls, setUrls] = useState<string[]>(
    initialImageUrl ? initialImageUrl.split('\n').filter(url => url.trim() !== '') : []
  );

  const handleDelete = (indexToDelete: number) => {
    if (confirm("Hapus foto ini?")) {
      setUrls(urls.filter((_, index) => index !== indexToDelete));
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Foto Saat Ini</label>
      
      {urls.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
          {urls.map((url, index) => (
            <div 
              key={index} 
              style={{ 
                position: 'relative', 
                width: '100px', 
                height: '100px', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <img 
                src={url} 
                alt={`Existing ${index}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <button
                type="button"
                onClick={() => handleDelete(index)}
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '4px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.9)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
                title="Hapus foto"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '0.875rem', color: '#6B7280', fontStyle: 'italic', marginBottom: '12px' }}>Belum ada foto.</p>
      )}
      
      <input type="hidden" name="imageUrl" value={urls.join('\n')} />
    </div>
  );
}
