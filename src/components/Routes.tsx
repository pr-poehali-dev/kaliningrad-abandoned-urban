import Icon from '@/components/ui/icon';

const routes = [
  {
    id: 1,
    name: 'Кольцо фортов',
    duration: '6–8 часов',
    difficulty: 'Средняя',
    distance: '22 км',
    stops: 5,
    tags: ['Форты', 'История', 'Подземелья'],
    desc: 'Объезд ключевых фортов Калининградского оборонительного кольца. Форты №1, 3, 5, 11 и Астрономический бастион.',
    highlights: ['Форт №3 — полный подземный маршрут', 'Форт №11 — лучшая сохранность', 'Астрономический бастион — панорама города'],
    color: 'from-orange-900/30 to-transparent',
    icon: 'Shield',
  },
  {
    id: 2,
    name: 'Советский модернизм',
    duration: '3–4 часа',
    difficulty: 'Лёгкая',
    distance: '8 км',
    stops: 4,
    tags: ['Здания', 'СССР', 'Архитектура'],
    desc: 'Прогулка по заброшенным советским объектам в черте города — санаторий, кинотеатр, дом культуры.',
    highlights: ['Военный санаторий — мозаики 1970-х', 'ДК Строителей — советский ампир', 'Заброшенный кинотеатр Россия'],
    color: 'from-blue-900/20 to-transparent',
    icon: 'Building2',
  },
  {
    id: 3,
    name: 'Промышленный пояс',
    duration: '5–6 часов',
    difficulty: 'Сложная',
    distance: '15 км',
    stops: 6,
    tags: ['Заводы', 'Для опытных', 'Фото'],
    desc: 'Маршрут по заброшенным заводам и фабрикам. Требует подготовки — высоты, сложные пролезы, охрана.',
    highlights: ['Целлюлозный завод — масштаб впечатляет', 'Бумажная фабрика — старое оборудование', 'Рыбоконсервный завод — атмосфера упадка'],
    color: 'from-red-900/20 to-transparent',
    icon: 'Factory',
  },
];

const difficultyColor = {
  'Лёгкая': 'text-green-400',
  'Средняя': 'text-orange-400',
  'Сложная': 'text-red-400',
};

export default function Routes() {
  return (
    <section id="routes" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="font-oswald text-[var(--rust)] text-xs tracking-[0.4em] uppercase">— Готовые маршруты</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-700 uppercase text-[var(--text-primary)] mt-2">
            Экскурсии
          </h2>
          <p className="font-golos text-[var(--text-muted)] mt-3 max-w-md">
            Проверенные маршруты для самостоятельного исследования
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {routes.map((route, i) => (
            <div
              key={route.id}
              className="group relative border border-[var(--dark-border)] bg-[var(--dark-card)] overflow-hidden card-hover"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${route.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Number */}
              <div className="absolute top-4 right-4 font-oswald text-6xl font-700 text-[var(--rust)] opacity-5 group-hover:opacity-10 transition-opacity">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="relative p-6">
                {/* Icon + name */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 border border-[var(--rust)]/30 flex items-center justify-center shrink-0 group-hover:border-[var(--rust)]/60 transition-colors">
                    <Icon name={route.icon} fallback="MapPin" size={18} className="text-[var(--rust)]" />
                  </div>
                  <h3 className="font-oswald text-xl font-500 text-[var(--text-primary)] leading-tight">{route.name}</h3>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[var(--dark-border)]">
                  <div>
                    <div className="font-golos text-xs text-[var(--text-muted)]">Время</div>
                    <div className="font-oswald text-sm text-[var(--text-primary)]">{route.duration}</div>
                  </div>
                  <div>
                    <div className="font-golos text-xs text-[var(--text-muted)]">Дистанция</div>
                    <div className="font-oswald text-sm text-[var(--text-primary)]">{route.distance}</div>
                  </div>
                  <div>
                    <div className="font-golos text-xs text-[var(--text-muted)]">Сложность</div>
                    <div className={`font-oswald text-sm ${difficultyColor[route.difficulty as keyof typeof difficultyColor]}`}>{route.difficulty}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="font-golos text-[var(--text-muted)] text-sm leading-relaxed mb-4">
                  {route.desc}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-5">
                  {route.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-[var(--rust)] mt-1 shrink-0">·</span>
                      <span className="font-golos text-xs text-[var(--text-muted)]">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {route.tags.map(tag => (
                    <span key={tag} className="font-oswald text-xs tracking-wider uppercase text-[var(--rust)] border border-[var(--rust)]/30 px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full font-oswald text-sm tracking-widest uppercase py-3 border border-[var(--dark-border)] text-[var(--text-muted)] hover:border-[var(--rust)] hover:text-[var(--rust-light)] hover:bg-[var(--rust-dim)] transition-all duration-200 flex items-center justify-center gap-2 group">
                  Подробнее
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info block */}
        <div className="mt-8 p-6 border border-[var(--rust)]/20 bg-[var(--rust-dim)]">
          <div className="flex items-start gap-4">
            <Icon name="AlertTriangle" size={20} className="text-[var(--rust)] shrink-0 mt-0.5" />
            <div>
              <p className="font-oswald text-[var(--text-primary)] text-sm font-500 mb-1">Важно перед выходом</p>
              <p className="font-golos text-[var(--text-muted)] text-sm leading-relaxed">
                Посещение заброшенных объектов сопряжено с риском. Надевай защитную одежду, бери фонарь и не ходи в одиночку.
                Перед посещением проверь актуальный статус объекта в комментариях.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}