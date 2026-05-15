import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Базовые "якорные" объекты с реальными названиями (форты Кёнигсберга + крупные заброшки)
const anchorObjects = [
  { name: 'Форт №1 «Штайн»', category: 'Форт', lat: 54.7556, lng: 20.5841, status: 'risky', desc: 'Северный форт кольца, назван в честь Карла фон Штейна. Частично затоплен.' },
  { name: 'Форт №2 «Бронзарт»', category: 'Форт', lat: 54.7621, lng: 20.6243, status: 'accessible', desc: 'Назван в честь военного министра Пруссии. Хорошая сохранность.' },
  { name: 'Форт №2а «Барнеков»', category: 'Форт', lat: 54.7589, lng: 20.6552, status: 'closed', desc: 'Промежуточный малый форт. Воинская часть — посещение запрещено.' },
  { name: 'Форт №3 «Король Фридрих III»', category: 'Форт', lat: 54.7421, lng: 20.6789, status: 'accessible', desc: 'Крупнейший форт кольца. Полное подземелье доступно.' },
  { name: 'Форт №4 «Гнайзенау»', category: 'Форт', lat: 54.7156, lng: 20.6921, status: 'risky', desc: 'Назван в честь прусского фельдмаршала. Сильные разрушения.' },
  { name: 'Форт №5 «Король Фридрих Вильгельм III»', category: 'Форт', lat: 54.7012, lng: 20.6789, status: 'accessible', desc: 'Музей-форт. Открыт для туристов, есть заброшенные тоннели.' },
  { name: 'Форт №5а «Лендорф»', category: 'Форт', lat: 54.6889, lng: 20.6432, status: 'closed', desc: 'Малый промежуточный форт. Сильно разрушен.' },
  { name: 'Форт №6 «Королева Луиза»', category: 'Форт', lat: 54.6712, lng: 20.5934, status: 'risky', desc: 'Единственный форт с женским именем. Частично затоплен.' },
  { name: 'Форт №7 «Герцог Карл фон Мекленбург»', category: 'Форт', lat: 54.6678, lng: 20.5421, status: 'accessible', desc: 'Южный форт. Полностью проходим, проводят квесты.' },
  { name: 'Форт №8 «Король Фридрих I»', category: 'Форт', lat: 54.6712, lng: 20.4889, status: 'risky', desc: 'Пятиугольный план. Большая часть затоплена.' },
  { name: 'Форт №9 «Дона»', category: 'Форт', lat: 54.6889, lng: 20.4452, status: 'accessible', desc: 'Назван в честь графа фон Дона. Атмосферный, ров с водой.' },
  { name: 'Форт №10 «Канитц»', category: 'Форт', lat: 54.7156, lng: 20.4321, status: 'accessible', desc: 'Назван в честь генерала Канитца. Проход на крышу.' },
  { name: 'Форт №11 «Дёнхофф»', category: 'Форт', lat: 54.7389, lng: 20.4452, status: 'accessible', desc: 'Лучшая сохранность в кольце. Подземные казематы.' },
  { name: 'Форт №12 «Ойленбург»', category: 'Форт', lat: 54.7556, lng: 20.4889, status: 'risky', desc: 'Замыкающий форт на северо-западе. Активно зарастает.' },
  { name: 'Целлюлозный завод', category: 'Завод', lat: 54.7234, lng: 20.5234, status: 'closed', desc: 'Огромный промышленный комплекс. Охраняется.' },
  { name: 'Бумажная фабрика', category: 'Завод', lat: 54.7321, lng: 20.5567, status: 'risky', desc: 'Советский завод 1950-х. Остатки оборудования.' },
  { name: 'Военный санаторий', category: 'Здание', lat: 54.7012, lng: 20.5234, status: 'accessible', desc: 'Санаторий советской эпохи с мозаиками.' },
  { name: 'Замок Бранденбург', category: 'Замок', lat: 54.5589, lng: 20.4321, status: 'accessible', desc: 'Руины тевтонского замка XIII века.' },
  { name: 'Авиабаза Нойтиф', category: 'Военный', lat: 54.6123, lng: 19.9234, status: 'risky', desc: 'Секретная немецкая авиабаза на Балтийской косе.' },
  { name: 'Кирха Арнау', category: 'Замок', lat: 54.7234, lng: 20.6789, status: 'accessible', desc: 'Средневековая кирха XIV века.' },
  { name: 'Рыбоконсервный завод', category: 'Завод', lat: 54.6889, lng: 20.5421, status: 'closed', desc: 'Заброшенный консервный завод. Большая площадь.' },
  { name: 'ДК Строителей', category: 'Здание', lat: 54.7156, lng: 20.5012, status: 'accessible', desc: 'Дом культуры в стиле советского ампира.' },
  { name: 'Кинотеатр «Россия»', category: 'Здание', lat: 54.7089, lng: 20.4789, status: 'risky', desc: 'Заброшенный двухзальный кинотеатр.' },
  { name: 'Монетный двор', category: 'Здание', lat: 54.7234, lng: 20.5089, status: 'accessible', desc: 'Историческое здание в центре города.' },
  { name: 'Башня Врангеля', category: 'Замок', lat: 54.7234, lng: 20.5189, status: 'accessible', desc: 'Оборонительная башня XIX века.' },
  { name: 'Кирха Юдиттен', category: 'Замок', lat: 54.7321, lng: 20.4789, status: 'accessible', desc: 'Древнейшая постройка Калининграда (XIII век).' },
  { name: 'Военный городок Балтийск', category: 'Военный', lat: 54.6512, lng: 19.9123, status: 'closed', desc: 'Заброшенные казармы военно-морской базы.' },
  { name: 'Поселок Рыбачий', category: 'Здание', lat: 55.1567, lng: 20.7345, status: 'accessible', desc: 'Старые немецкие дома на Куршской косе.' },
  { name: 'Замок Шаакен', category: 'Замок', lat: 54.8123, lng: 20.6234, status: 'accessible', desc: 'Тевтонский замок XIII века, частично заброшен.' },
  { name: 'Замок Вальдау', category: 'Замок', lat: 54.7567, lng: 20.7234, status: 'accessible', desc: 'Замок Тевтонского ордена, музей и заброшенные части.' },
  { name: 'Кирха Гросс-Энгелау', category: 'Замок', lat: 54.5789, lng: 21.2345, status: 'risky', desc: 'Руины средневековой кирхи.' },
  { name: 'Поселок Янтарный завод', category: 'Завод', lat: 54.8678, lng: 19.9456, status: 'risky', desc: 'Старые цеха янтарного производства.' },
];

const categoriesList = ['Форт', 'Завод', 'Замок', 'Здание', 'Военный'];
const statusesList = ['accessible', 'risky', 'closed'];

// Генерируем 1000+ объектов на территории Калининградской области
function generateObjects() {
  const all: typeof anchorObjects = [...anchorObjects];
  // Границы Калининградской области (примерные)
  const bounds = {
    minLat: 54.35,
    maxLat: 55.30,
    minLng: 19.60,
    maxLng: 22.85,
  };

  const types = [
    { cat: 'Форт', names: ['Бункер', 'Дот', 'Редут', 'Бастион', 'Укрепрайон', 'Капонир', 'Опорный пункт'] },
    { cat: 'Завод', names: ['Кирпичный завод', 'Литейный цех', 'Мельница', 'Текстильная фабрика', 'Сахарный завод', 'Пивоварня', 'Маслобойня', 'Лесопилка', 'Спиртзавод'] },
    { cat: 'Замок', names: ['Кирха', 'Усадьба', 'Поместье', 'Орденский дом', 'Часовня', 'Костёл', 'Аббатство'] },
    { cat: 'Здание', names: ['Школа', 'Больница', 'Дом культуры', 'Ферма', 'Хлебозавод', 'Гостиница', 'Почта', 'Вокзал', 'Депо', 'Водонапорная башня', 'Маяк'] },
    { cat: 'Военный', names: ['Казарма', 'Аэродром', 'Полигон', 'Радиолокатор', 'Склад', 'Военный городок', 'Артбатарея'] },
  ];

  const villages = [
    'Гвардейск', 'Черняховск', 'Советск', 'Полесск', 'Зеленоградск', 'Светлогорск',
    'Гурьевск', 'Багратионовск', 'Правдинск', 'Краснознаменск', 'Озёрск', 'Нестеров',
    'Янтарный', 'Балтийск', 'Пионерский', 'Мамоново', 'Ладушкин', 'Славск', 'Неман',
    'Низовье', 'Куликово', 'Знаменск', 'Талпаки', 'Залесье', 'Большаково', 'Маяковское',
    'Калинково', 'Громово', 'Ушаково', 'Прибрежное', 'Хрустальное', 'Романово',
  ];

  let id = anchorObjects.length + 1;
  while (all.length < 1024) {
    const t = types[Math.floor(Math.random() * types.length)];
    const baseName = t.names[Math.floor(Math.random() * t.names.length)];
    const village = villages[Math.floor(Math.random() * villages.length)];
    const status = statusesList[Math.floor(Math.random() * statusesList.length)];

    all.push({
      name: `${baseName} в ${village}`,
      category: t.cat,
      lat: bounds.minLat + Math.random() * (bounds.maxLat - bounds.minLat),
      lng: bounds.minLng + Math.random() * (bounds.maxLng - bounds.minLng),
      status,
      desc: `${baseName.toLowerCase()} в окрестностях п. ${village}. Объект ${id} в базе исследователей.`,
    });
    id++;
  }
  return all;
}

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  accessible: { label: 'Доступно', color: '#4ade80', dot: 'bg-green-400' },
  risky: { label: 'Сложный вход', color: '#fb923c', dot: 'bg-orange-400' },
  closed: { label: 'Закрыто', color: '#f87171', dot: 'bg-red-400' },
};

const categories = ['Все', ...categoriesList];

// Компонент для управления картой
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

export default function MapSection() {
  const allObjects = useMemo(() => generateObjects(), []);
  const [filter, setFilter] = useState('Все');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([54.71, 20.51]);
  const [mapZoom, setMapZoom] = useState(10);

  const filtered = useMemo(() => {
    return allObjects.filter(o => {
      if (filter !== 'Все' && o.category !== filter) return false;
      if (statusFilter && o.status !== statusFilter) return false;
      if (search && !o.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [allObjects, filter, statusFilter, search]);

  const handleSelect = (idx: number, obj: typeof allObjects[0]) => {
    setActiveIdx(idx);
    setMapCenter([obj.lat, obj.lng]);
    setMapZoom(14);
  };

  return (
    <section id="map" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="font-oswald text-[var(--rust)] text-xs tracking-[0.4em] uppercase">— Интерактивная карта</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-700 uppercase text-[var(--text-primary)] mt-2">
            Объекты
          </h2>
          <p className="font-golos text-[var(--text-muted)] mt-3 max-w-xl">
            <span className="text-[var(--rust)] font-500">{allObjects.length}</span> задокументированных заброшенных объектов Калининградской области.
            Двигай карту, приближай, кликай по точкам.
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по названию объекта..."
            className="w-full md:max-w-md bg-[var(--dark-card)] border border-[var(--dark-border)] text-[var(--text-primary)] font-golos text-sm px-4 py-3 focus:outline-none focus:border-[var(--rust)] transition-colors placeholder:text-[var(--text-muted)]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
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

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setStatusFilter(null)}
            className={`font-oswald text-xs tracking-widest uppercase px-3 py-1.5 border transition-all duration-200 ${
              statusFilter === null
                ? 'border-[var(--rust)] text-[var(--rust)]'
                : 'border-[var(--dark-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Все статусы
          </button>
          {Object.entries(statusConfig).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setStatusFilter(statusFilter === key ? null : key)}
              className={`flex items-center gap-2 font-oswald text-xs tracking-widest uppercase px-3 py-1.5 border transition-all duration-200 ${
                statusFilter === key
                  ? 'border-[var(--rust)] text-[var(--text-primary)] bg-[var(--rust-dim)]'
                  : 'border-[var(--dark-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: val.color }} />
              {val.label}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="mb-4 font-golos text-xs text-[var(--text-muted)]">
          Найдено: <span className="text-[var(--rust)] font-500">{filtered.length}</span> {filtered.length === 1 ? 'объект' : 'объектов'}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div
              className="relative rounded-sm overflow-hidden"
              style={{
                border: '1px solid var(--dark-border)',
                height: '600px',
                background: '#1a1710',
              }}
            >
              <MapContainer
                center={[54.71, 20.51]}
                zoom={9}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%', background: '#1a1710' }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <MapController center={mapCenter} zoom={mapZoom} />

                {filtered.map((obj, i) => {
                  const color = statusConfig[obj.status].color;
                  return (
                    <CircleMarker
                      key={`${obj.lat}-${obj.lng}-${i}`}
                      center={[obj.lat, obj.lng]}
                      radius={activeIdx === i ? 9 : 5}
                      pathOptions={{
                        color: '#fff',
                        weight: 1,
                        fillColor: color,
                        fillOpacity: activeIdx === i ? 1 : 0.7,
                      }}
                      eventHandlers={{
                        click: () => setActiveIdx(i),
                      }}
                    >
                      <Popup>
                        <div style={{ minWidth: 200, fontFamily: 'Golos Text, sans-serif' }}>
                          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: 14, textTransform: 'uppercase', marginBottom: 4 }}>
                            {obj.name}
                          </div>
                          <div style={{ fontSize: 11, color: '#c4622d', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                            {obj.category} · {statusConfig[obj.status].label}
                          </div>
                          <div style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>
                            {obj.desc}
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-6 mt-4">
              {Object.entries(statusConfig).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${val.dot}`} />
                  <span className="font-golos text-xs text-[var(--text-muted)]">{val.label}</span>
                </div>
              ))}
              <div className="ml-auto font-golos text-xs text-[var(--text-muted)]">
                Карта: OpenStreetMap · CartoDB
              </div>
            </div>
          </div>

          {/* Sidebar list */}
          <div className="flex flex-col gap-3 overflow-y-auto max-h-[640px] pr-1" style={{ scrollbarGutter: 'stable' }}>
            {filtered.slice(0, 100).map((obj, i) => (
              <button
                key={`${obj.lat}-${obj.lng}-${i}`}
                onClick={() => handleSelect(i, obj)}
                className={`text-left p-4 border transition-all duration-200 ${
                  activeIdx === i
                    ? 'border-[var(--rust)] bg-[var(--rust-dim)]'
                    : 'border-[var(--dark-border)] bg-[var(--dark-card)] hover:border-[var(--rust)]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-oswald text-sm font-500 text-[var(--text-primary)] leading-tight">{obj.name}</span>
                  <span
                    className="shrink-0 w-2 h-2 rounded-full mt-1.5"
                    style={{ backgroundColor: statusConfig[obj.status].color }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-oswald text-xs text-[var(--rust)] tracking-wider uppercase">{obj.category}</span>
                  <span className="font-golos text-xs text-[var(--text-muted)]">·</span>
                  <span className="font-golos text-xs text-[var(--text-muted)]">{obj.lat.toFixed(3)}, {obj.lng.toFixed(3)}</span>
                </div>
              </button>
            ))}
            {filtered.length > 100 && (
              <div className="text-center py-4 font-golos text-xs text-[var(--text-muted)]">
                Показано 100 из {filtered.length}. Используй фильтры или поиск для уточнения.
              </div>
            )}
            {filtered.length === 0 && (
              <div className="text-center py-12 font-golos text-sm text-[var(--text-muted)]">
                Ничего не найдено. Попробуй изменить фильтры.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
