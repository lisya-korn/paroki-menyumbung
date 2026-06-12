"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/pengumuman", label: "Pengumuman", icon: "📢" },
  { href: "/admin/konten", label: "Konten", icon: "📝" },
  { href: "/admin/galeri", label: "Galeri", icon: "🖼️" },
  { href: "/admin/staff", label: "Pengurus", icon: "👥" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  // Don't show navbar on login page
  if (pathname === "/admin/login") return null;

  return (
    <nav className="admin-nav">
      <div className="admin-nav__inner">
        <div className="admin-nav__links">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav__link ${isActive ? "admin-nav__link--active" : ""}`}
              >
                <span className="admin-nav__link-icon">{item.icon}</span>
                <span className="admin-nav__link-label">{item.label}</span>
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="admin-nav__logout"
        >
          🚪 Keluar
        </button>
      </div>
    </nav>
  );
}
