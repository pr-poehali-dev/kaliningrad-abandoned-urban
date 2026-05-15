interface HeroProps {
  bgImage: string;
}

export default function Hero({ bgImage }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111009]/70 via-[#111009]/50 to-[#111009]" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,9,7,0.8) 100%)'
      }} />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines" />

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent to-[var(--rust)] opacity-30" />
      <div className="absolute bottom-1/3 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-[var(--rust)] opacity-20" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-up opacity-0 delay-100">
          <span className="inline-block font-oswald text-[var(--rust)] text-xs tracking-[0.4em] uppercase mb-6 border border-[var(--rust)]/30 px-4 py-1.5">
            Калининград · Urban Exploration
          </span>
        </div>

        <h1 className="animate-fade-up opacity-0 delay-200 font-oswald font-700 text-6xl md:text-8xl lg:text-9xl uppercase leading-none tracking-tight mb-6">
          <span className="block text-[var(--text-primary)]">ЗАБЫТЫЕ</span>
          <span className="block text-[var(--rust)]" style={{
            textShadow: '0 0 60px rgba(196,98,45,0.4)'
          }}>МЕСТА</span>
        </h1>

        <p className="animate-fade-up opacity-0 delay-300 font-golos text-[var(--text-muted)] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Исследуй заброшенные объекты Калининграда — от немецких фортов до советских заводов
        </p>

        <div className="animate-fade-up opacity-0 delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#map"
            className="group inline-flex items-center gap-2 bg-[var(--rust)] hover:bg-[var(--rust-light)] text-[#111009] font-oswald font-600 text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
          >
            Открыть карту
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#routes"
            className="inline-flex items-center gap-2 border border-[var(--rust)]/40 hover:border-[var(--rust)] text-[var(--text-primary)] font-oswald text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:bg-[var(--rust-dim)]"
          >
            Готовые маршруты
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up opacity-0 delay-500 mt-16 grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[
            { num: '12', label: 'Фортов' },
            { num: '20+', label: 'Объектов' },
            { num: '200+', label: 'Историй' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-oswald text-3xl font-700 text-[var(--rust)]">{s.num}</div>
              <div className="font-golos text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-oswald text-xs tracking-widest text-[var(--text-muted)] uppercase">Вниз</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--rust)] to-transparent" />
      </div>
    </section>
  );
}