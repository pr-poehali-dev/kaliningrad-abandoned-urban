import { useState } from 'react';
import Icon from '@/components/ui/icon';

const reviews = [
  {
    id: 1,
    name: 'Андрей К.',
    date: '12 апреля 2025',
    place: 'Форт №11',
    rating: 5,
    text: 'Был на форту в прошлые выходные — место потрясающее. Подземные казематы почти полностью сохранились. Взял налобный фонарь, провёл внутри часа 3. Грибок местами, но это добавляет атмосферы. Рекомендую приходить утром — меньше народу.',
    badge: 'Исследователь',
    visits: 12,
  },
  {
    id: 2,
    name: 'Марина Т.',
    date: '8 марта 2025',
    place: 'Военный санаторий',
    rating: 5,
    text: 'Советский санаторий — мечта для фотографа. Мозаики на стенах, советские плакаты, люстры прямо из 1970-х. Приезжала специально с камерой, провела там весь день. Теперь это моё любимое место в Калининграде.',
    badge: 'Фотограф',
    visits: 8,
  },
  {
    id: 3,
    name: 'Дмитрий В.',
    date: '15 февраля 2025',
    place: 'Замок Бранденбург',
    rating: 4,
    text: 'Руины замка на закате — это что-то. Вид на залив просто невероятный. Немного разочаровал сам замок — от него мало что осталось. Но место намоленное, история чувствуется. Хорош как финальная точка маршрута.',
    badge: 'Путешественник',
    visits: 24,
  },
  {
    id: 4,
    name: 'Екатерина Р.',
    date: '3 января 2025',
    place: 'Бумажная фабрика',
    rating: 4,
    text: 'Огромные цеха с ржавым оборудованием, везде битые окна — очень атмосферно. Ходили вчетвером, хорошо что были с опытным человеком. Один блок недоступен — там охрана, но основная часть свободна.',
    badge: 'Новичок',
    visits: 3,
  },
  {
    id: 5,
    name: 'Михаил З.',
    date: '20 декабря 2024',
    place: 'Форт №3',
    rating: 5,
    text: 'Лучший форт кольца. Полностью проходимый, есть несколько уровней подземелья. Взяли с собой верёвку и хорошие фонари — спустились в самый нижний ярус. Там стоит совершенно другой воздух, пахнет историей.',
    badge: 'Исследователь',
    visits: 19,
  },
];

const badgeColor: Record<string, string> = {
  'Исследователь': 'text-orange-400 border-orange-400/30',
  'Фотограф': 'text-blue-400 border-blue-400/30',
  'Путешественник': 'text-green-400 border-green-400/30',
  'Новичок': 'text-gray-400 border-gray-400/30',
};

export default function Reviews() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="reviews" className="py-24 px-6 bg-[#0e0d0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-oswald text-[var(--rust)] text-xs tracking-[0.4em] uppercase">— Истории посетителей</span>
            <h2 className="font-oswald text-5xl md:text-6xl font-700 uppercase text-[var(--text-primary)] mt-2">
              Отзывы
            </h2>
            <p className="font-golos text-[var(--text-muted)] mt-3 max-w-md">
              Реальные истории исследователей заброшенных объектов
            </p>
          </div>
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="shrink-0 inline-flex items-center gap-2 bg-[var(--rust)] hover:bg-[var(--rust-light)] text-[#111009] font-oswald text-sm tracking-widest uppercase px-6 py-3 transition-all duration-200"
          >
            <Icon name="PenLine" size={16} />
            Поделиться историей
          </button>
        </div>

        {/* Form */}
        {formOpen && (
          <div className="mb-8 p-6 border border-[var(--rust)]/30 bg-[var(--dark-card)] animate-fade-in">
            <h3 className="font-oswald text-lg text-[var(--text-primary)] mb-4 uppercase tracking-wide">Твоя история</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Имя"
                className="bg-[var(--dark-base)] border border-[var(--dark-border)] text-[var(--text-primary)] font-golos text-sm px-4 py-3 focus:outline-none focus:border-[var(--rust)] transition-colors placeholder:text-[var(--text-muted)]"
              />
              <input
                type="text"
                placeholder="Объект (форт, завод...)"
                className="bg-[var(--dark-base)] border border-[var(--dark-border)] text-[var(--text-primary)] font-golos text-sm px-4 py-3 focus:outline-none focus:border-[var(--rust)] transition-colors placeholder:text-[var(--text-muted)]"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Расскажи о своём визите..."
              className="w-full bg-[var(--dark-base)] border border-[var(--dark-border)] text-[var(--text-primary)] font-golos text-sm px-4 py-3 focus:outline-none focus:border-[var(--rust)] transition-colors placeholder:text-[var(--text-muted)] resize-none mb-4"
            />
            <div className="flex gap-3">
              <button className="font-oswald text-sm tracking-widest uppercase px-6 py-3 bg-[var(--rust)] hover:bg-[var(--rust-light)] text-[#111009] transition-colors">
                Отправить
              </button>
              <button
                onClick={() => setFormOpen(false)}
                className="font-oswald text-sm tracking-widest uppercase px-6 py-3 border border-[var(--dark-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-[var(--dark-border)] bg-[var(--dark-card)] p-5 card-hover"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-7 h-7 bg-[var(--rust)]/20 border border-[var(--rust)]/30 flex items-center justify-center">
                      <span className="font-oswald text-xs text-[var(--rust)]">{review.name[0]}</span>
                    </div>
                    <span className="font-oswald text-sm text-[var(--text-primary)]">{review.name}</span>
                  </div>
                  <span className={`font-oswald text-xs tracking-wider uppercase border px-2 py-0.5 ${badgeColor[review.badge] || 'text-gray-400 border-gray-400/30'}`}>
                    {review.badge}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex gap-0.5 justify-end mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-[var(--rust)]' : 'text-[var(--dark-border)]'} style={{ fontSize: 12 }}>★</span>
                    ))}
                  </div>
                  <span className="font-golos text-xs text-[var(--text-muted)]">{review.date}</span>
                </div>
              </div>

              {/* Place */}
              <div className="flex items-center gap-1.5 mb-3">
                <Icon name="MapPin" size={12} className="text-[var(--rust)]" />
                <span className="font-golos text-xs text-[var(--rust)]">{review.place}</span>
              </div>

              {/* Text */}
              <p className="font-golos text-sm text-[var(--text-muted)] leading-relaxed">
                {expanded === review.id ? review.text : review.text.slice(0, 120) + '...'}
              </p>
              <button
                onClick={() => setExpanded(expanded === review.id ? null : review.id)}
                className="font-oswald text-xs text-[var(--rust)] hover:text-[var(--rust-light)] mt-2 tracking-wider uppercase transition-colors"
              >
                {expanded === review.id ? 'Свернуть' : 'Читать полностью'}
              </button>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--dark-border)]">
                <span className="font-golos text-xs text-[var(--text-muted)]">
                  Посещений: <span className="text-[var(--text-primary)]">{review.visits}</span>
                </span>
                <button className="flex items-center gap-1.5 font-golos text-xs text-[var(--text-muted)] hover:text-[var(--rust)] transition-colors">
                  <Icon name="ThumbsUp" size={12} />
                  Полезно
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
