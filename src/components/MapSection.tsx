import { useState } from 'react';
import Icon from '@/components/ui/icon';

const locations = [
  { id: 1, name: 'Форт №11 «Дёнхофф»', category: 'Форт', x: 28, y: 42, status: 'accessible', desc: 'Немецкий форт 1890-х годов. Отличная сохранность, подземные казематы.' },
  { id: 2, name: 'Бумажная фабрика', category: 'Завод', x: 55, y: 33, status: 'risky', desc: 'Советский завод 1950-х. Огромные цеха с остатками оборудования.' },
  { id: 3, name: 'Замок Бранденбург', category: 'Замок', x: 18, y: 60, status: 'accessible', desc: 'Руины тевтонского замка XIII века на берегу залива.' },
  { id: 4, name: 'Военный санаторий', category: 'Здание', x: 68, y: 55, status: 'accessible', desc: 'Заброшенный санаторий советской эпохи с интерьерами 70-х.' },
  { id: 5, name: 'Авиабаза Нойтиф', category: 'Военный', x: 12, y: 78, status: 'risky', desc: 'Секретная немецкая авиабаза. Бункеры и ангары под водой.' },
  { id: 6, name: 'Целлюлозный завод', category: 'Завод', x: 72, y: 25, status: 'closed', desc: 'Огромный промышленный комплекс. Охраняется, есть пролезы.' },
  { id: 7, name: 'Форт №3 «Король Фридрих III»', category: 'Форт', x: 45, y: 68, status: 'accessible', desc: 'Один из лучших фортов пояса. Полное подземелье доступно.' },
  { id: 8, name: 'Монетный двор', category: 'Здание', x: 38, y: 22, status: 'accessible', desc: 'Историческое здание в центре города, ждёт реставрации.' },
];

const statusConfig = {
  accessible: { label: 'Доступно', color: '#4ade80', dot: 'bg-green-400' },
  risky: { label: 'Сложный вход', color: '#fb923c', dot: 'bg-orange-400' },
  closed: { label: 'Закрыто', color: '#f87171', dot: 'bg-red-400' },
};

const categories = ['Все', 'Форт', 'Завод', 'Замок', 'Здание', 'Военный'];

export default function MapSection() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState('Все');

  const filtered = filter === 'Все' ? locations : locations.filter(l => l.category === filter);
  const activeObj = locations.find(l => l.id === active);

  return (
    <section id="map" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="font-oswald text-[var(--rust)] text-xs tracking-[0.4em] uppercase">— Интерактивная карта</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-700 uppercase text-[var(--text-primary)] mt-2">
            Объекты
          </h2>
          <p className="font-golos text-[var(--text-muted)] mt-3 max-w-md">
            47 задокументированных заброшенных объектов Калининградской области
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-oswald text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                filter === cat
                  ? 'bg-[var(--rust)] border-[var(--rust)] text-[#111009]'
                  : 'border-[var(--dark-border)] text-[var(--text-muted)] hover:border-[var(--rust)]/50 hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map visual */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a1710 0%, #141210 50%, #1c1a15 100%)',
                border: '1px solid var(--dark-border)',
                aspectRatio: '16/10',
              }}
            >
              {/* Grid lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c4622d" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Kaliningrad shape outline (simplified) */}
              <div className="absolute inset-8 opacity-5 border border-[var(--rust)] rounded-sm" />

              {/* Map label */}
              <div className="absolute top-4 left-4 font-oswald text-xs tracking-widest text-[var(--text-muted)] uppercase">
                Калининград · 54°42'N 20°30'E
              </div>

              {/* Compass */}
              <div className="absolute bottom-4 right-4 text-[var(--text-muted)] opacity-40">
                <div className="font-oswald text-xs text-center">N</div>
                <div className="w-px h-6 bg-[var(--rust)] mx-auto" />
              </div>

              {/* Pins */}
              {filtered.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActive(active === loc.id ? null : loc.id)}
                  className="absolute group"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: 'translate(-50%, -100%)' }}
                >
                  <div className={`relative flex flex-col items-center ${active === loc.id ? 'z-10' : ''}`}>
                    {/* Tooltip */}
                    <div className={`absolute bottom-full mb-1 bg-[#1c1a15] border border-[var(--dark-border)] px-2 py-1 whitespace-nowrap text-xs font-golos text-[var(--text-primary)] transition-all duration-200 ${active === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0'}`}>
                      {loc.name}
                    </div>
                    {/* Pin */}
                    <div
                      className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${active === loc.id ? 'scale-150' : 'group-hover:scale-125'} ${active === loc.id ? 'map-pin-pulse' : ''}`}
                      style={{
                        backgroundColor: statusConfig[loc.status as keyof typeof statusConfig].color,
                        borderColor: active === loc.id ? '#fff' : 'rgba(255,255,255,0.3)',
                      }}
                    />
                    <div className="w-px h-2 bg-current opacity-50" style={{ color: statusConfig[loc.status as keyof typeof statusConfig].color }} />
                  </div>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-4">
              {Object.entries(statusConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${val.dot}`} />
                  <span className="font-golos text-xs text-[var(--text-muted)]">{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-1">
            {filtered.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActive(active === loc.id ? null : loc.id)}
                className={`text-left p-4 border transition-all duration-200 card-hover ${
                  active === loc.id
                    ? 'border-[var(--rust)] bg-[var(--rust-dim)]'
                    : 'border-[var(--dark-border)] bg-[var(--dark-card)] hover:border-[var(--rust)]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-oswald text-sm font-500 text-[var(--text-primary)] leading-tight">{loc.name}</span>
                  <span
                    className="shrink-0 w-2 h-2 rounded-full mt-1"
                    style={{ backgroundColor: statusConfig[loc.status as keyof typeof statusConfig].color }}
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-oswald text-xs text-[var(--rust)] tracking-wider uppercase">{loc.category}</span>
                </div>
                {active === loc.id && (
                  <p className="font-golos text-xs text-[var(--text-muted)] leading-relaxed animate-fade-in">
                    {loc.desc}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
