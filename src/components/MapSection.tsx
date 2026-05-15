import { useState } from 'react';

const locations = [
  // Все 12 фортов оборонительного кольца Кёнигсберга (1872–1890), по часовой стрелке от севера
  { id: 1, name: 'Форт №1 «Штайн»', category: 'Форт', x: 52, y: 12, status: 'risky', desc: 'Северный форт кольца, назван в честь прусского реформатора Карла фон Штейна. Частично затоплен, требует фонарей и сапог.' },
  { id: 2, name: 'Форт №2 «Бронзарт»', category: 'Форт', x: 65, y: 17, status: 'accessible', desc: 'Назван в честь военного министра Пруссии. Хорошая сохранность валов, доступны казематы.' },
  { id: 3, name: 'Форт №2а «Барнеков»', category: 'Форт', x: 72, y: 23, status: 'closed', desc: 'Промежуточный малый форт. Сейчас на территории воинской части — посещение запрещено.' },
  { id: 4, name: 'Форт №3 «Король Фридрих III»', category: 'Форт', x: 80, y: 32, status: 'accessible', desc: 'Крупнейший форт кольца. Полное подземелье доступно, есть несколько уровней.' },
  { id: 5, name: 'Форт №4 «Гнайзенау»', category: 'Форт', x: 86, y: 45, status: 'risky', desc: 'Назван в честь прусского фельдмаршала. Сильные разрушения после штурма 1945-го, но казематы целы.' },
  { id: 6, name: 'Форт №5 «Король Фридрих Вильгельм III»', category: 'Форт', x: 88, y: 58, status: 'accessible', desc: 'Музей-форт. Захвачен советскими войсками в апреле 1945. Открыт для туристов, но есть и заброшенные тоннели.' },
  { id: 7, name: 'Форт №5а «Лендорф»', category: 'Форт', x: 82, y: 68, status: 'closed', desc: 'Малый промежуточный форт. Сильно разрушен, проход закрыт военными.' },
  { id: 8, name: 'Форт №6 «Королева Луиза»', category: 'Форт', x: 70, y: 78, status: 'risky', desc: 'Единственный форт, названный женским именем. Частично затоплен, требует подготовки.' },
  { id: 9, name: 'Форт №7 «Герцог Карл фон Мекленбург»', category: 'Форт', x: 52, y: 85, status: 'accessible', desc: 'Южный форт. Полностью проходим, в одной из казарм местные исследователи проводят квесты.' },
  { id: 10, name: 'Форт №8 «Король Фридрих I»', category: 'Форт', x: 35, y: 84, status: 'risky', desc: 'Уникальный пятиугольный план. Большая часть затоплена грунтовыми водами.' },
  { id: 11, name: 'Форт №9 «Дона»', category: 'Форт', x: 22, y: 76, status: 'accessible', desc: 'Назван в честь графа Фридриха фон Дона. Один из самых атмосферных — кирпичные своды, ров с водой.' },
  { id: 12, name: 'Форт №10 «Канитц»', category: 'Форт', x: 14, y: 60, status: 'accessible', desc: 'Назван в честь генерала Канитца. Отличное место для фотосессий, есть проход на крышу.' },
  { id: 13, name: 'Форт №11 «Дёнхофф»', category: 'Форт', x: 12, y: 45, status: 'accessible', desc: 'Лучшая сохранность в кольце. Подземные казематы, экскурсии для исследователей.' },
  { id: 14, name: 'Форт №12 «Ойленбург»', category: 'Форт', x: 20, y: 30, status: 'risky', desc: 'Замыкающий форт кольца на северо-западе. Активно зарастает лесом, есть опасные провалы.' },
  // Дополнительные заброшки
  { id: 15, name: 'Бумажная фабрика', category: 'Завод', x: 55, y: 48, status: 'risky', desc: 'Советский завод 1950-х. Огромные цеха с остатками оборудования.' },
  { id: 16, name: 'Замок Бранденбург', category: 'Замок', x: 8, y: 88, status: 'accessible', desc: 'Руины тевтонского замка XIII века на берегу Калининградского залива.' },
  { id: 17, name: 'Военный санаторий', category: 'Здание', x: 60, y: 55, status: 'accessible', desc: 'Заброшенный санаторий советской эпохи с интерьерами 70-х, мозаики.' },
  { id: 18, name: 'Авиабаза Нойтиф', category: 'Военный', x: 6, y: 95, status: 'risky', desc: 'Секретная немецкая авиабаза на Балтийской косе. Бункеры и ангары под водой.' },
  { id: 19, name: 'Целлюлозный завод', category: 'Завод', x: 48, y: 52, status: 'closed', desc: 'Огромный промышленный комплекс. Охраняется, есть пролезы.' },
  { id: 20, name: 'Кирха Арнау', category: 'Замок', x: 78, y: 52, status: 'accessible', desc: 'Средневековая кирха XIV века. Частично восстановлена, рядом — заброшенные постройки.' },
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