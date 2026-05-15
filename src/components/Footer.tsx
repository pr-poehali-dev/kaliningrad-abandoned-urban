export default function Footer() {
  return (
    <footer className="border-t border-[var(--dark-border)] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <div className="font-oswald text-2xl font-700 tracking-widest uppercase text-[var(--text-primary)] mb-1">
              ZABROSHKI
            </div>
            <div className="font-golos text-xs text-[var(--text-muted)]">
              Заброшенные места Калининграда
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="font-oswald text-xs tracking-widest uppercase text-[var(--rust)] mb-3">Разделы</div>
              {['Карта', 'Объекты', 'Маршруты', 'Истории'].map(l => (
                <div key={l} className="font-golos text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors mb-2">{l}</div>
              ))}
            </div>
            <div>
              <div className="font-oswald text-xs tracking-widest uppercase text-[var(--rust)] mb-3">Информация</div>
              {['О проекте', 'Правила', 'Безопасность', 'Контакты'].map(l => (
                <div key={l} className="font-golos text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors mb-2">{l}</div>
              ))}
            </div>
            <div>
              <div className="font-oswald text-xs tracking-widest uppercase text-[var(--rust)] mb-3">Сообщество</div>
              {['Telegram', 'ВКонтакте', 'YouTube'].map(l => (
                <div key={l} className="font-golos text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors mb-2">{l}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-golos text-xs text-[var(--text-muted)]">
            © 2025 ZABROSHKI · Калининград · Исследуй с умом
          </p>
          <p className="font-golos text-xs text-[var(--text-muted)]">
            Проект создан энтузиастами для энтузиастов
          </p>
        </div>
      </div>
    </footer>
  );
}
