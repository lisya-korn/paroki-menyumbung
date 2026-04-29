"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkLoginBlock } from "./actions";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const router = useRouter();

  // Cek blokir saat halaman dimuat
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const checkStatus = async () => {
      const res = await checkLoginBlock();
      if (res.isBlocked && res.expiresAt) {
        setIsBlocked(true);
        
        // Fungsi untuk update countdown
        const updateTimer = () => {
          const now = new Date().getTime();
          const distance = res.expiresAt! - now;

          if (distance < 0) {
            setIsBlocked(false);
            setError("");
            clearInterval(timer);
            return;
          }

          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          setTimeLeft(`${minutes} menit ${seconds} detik`);
          setError(`Terlalu banyak percobaan login. Silakan coba lagi dalam ${minutes}m ${seconds}s.`);
        };

        updateTimer();
        timer = setInterval(updateTimer, 1000);
      }
    };

    checkStatus();
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        // Jika error mengandung kata tertentu, tampilkan pesan dari server
        if (res.error.includes("percobaan login")) {
          setError(res.error);
        } else {
          setError("Email atau password salah.");
        }
        setLoading(false);
      } else {
        // Gunakan window.location.href daripada router.push untuk memastikan 
        // middleware membaca cookie session yang baru diset (menghindari harus klik 2x)
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: 'var(--color-white)', padding: '32px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>Admin Login</h2>
          <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Silakan masuk untuk mengelola konten website Paroki.</p>
        </div>

        {error && (
          <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
              placeholder="admin@menyumbung.id"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || isBlocked}
            className="btn btn--primary" 
            style={{ 
              width: '100%', 
              marginTop: '8px', 
              opacity: (loading || isBlocked) ? 0.7 : 1,
              cursor: isBlocked ? 'not-allowed' : 'pointer',
              background: isBlocked ? '#9CA3AF' : 'var(--color-accent)'
            }}
          >
            {loading ? 'Memproses...' : isBlocked ? 'Akses Dibekukan' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
