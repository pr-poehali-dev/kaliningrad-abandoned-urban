import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const links = [
  { label: 'Главная', href: '#hero' },
  { label: 'Карта', href: '#map' },
  { label: 'Объекты', href: '#gallery' },
  { label: 'Маршруты', href: '#routes' },
  { label: 'Истории', href: '#reviews' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#111009]/95 backdrop-blur-md border-b border-[#2a2520]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-[var(--rust)] font-oswald text-xl font-bold tracking-widest uppercase">
            ZABROSHKI
          </span>
          <span className="text-[var(--text-muted)] font-golos text-xs tracking-wider mt-1">
            / КАЛИНИНГРАД
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-oswald text-sm font-400 tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--rust-light)] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--text-muted)] hover:text-[var(--rust)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111009]/98 border-t border-[#2a2520] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-oswald text-sm tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--rust-light)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
