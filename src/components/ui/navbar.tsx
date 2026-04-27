'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/kegiatan-iman', label: 'Kegiatan Iman' },
  { href: '/budaya', label: 'Budaya' },
  { href: '/berita', label: 'Berita' },
  { href: '/ekonomi', label: 'Ekonomi' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/pengumuman', label: 'Pengumuman' },
  { href: '/tentang', label: 'Tentang' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link href="/" className="navbar__logo">
          <img 
            src="/images/logoP.png" 
            alt="Logo Paroki Menyumbung" 
            style={{ height: '40px', width: 'auto', borderRadius: '8px' }} 
          />
          Paroki Menyumbung
        </Link>

        <div className="navbar__links" style={menuOpen ? { display: 'flex', position: 'fixed', inset: 0, top: 'var(--header-height)', background: 'rgba(255,255,255,0.98)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', zIndex: 999 } : undefined}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar__link ${pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'navbar__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
