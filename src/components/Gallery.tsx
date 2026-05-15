import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface GalleryProps {
  images: { url: string; title: string; category: string; year: string; desc: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 px-6 bg-[#0e0d0a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="font-oswald text-[var(--rust)] text-xs tracking-[0.4em] uppercase">— Фото и видео</span>
          <h2 className="font-oswald text-5xl md:text-6xl font-700 uppercase text-[var(--text-primary)] mt-2">
            Объекты
          </h2>
          <p className="font-golos text-[var(--text-muted)] mt-3 max-w-md">
            Документальная фотография заброшенных мест Калининграда
          </p>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden cursor-pointer card-hover ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{
                border: '1px solid var(--dark-border)',
                aspectRatio: i === 0 ? '16/9' : '4/3',
              }}
              onClick={() => setSelected(i)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111009]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-oswald text-[var(--rust)] text-xs tracking-wider uppercase">{img.category}</span>
                  <span className="text-[var(--text-muted)] text-xs">· {img.year}</span>
                </div>
                <h3 className="font-oswald text-[var(--text-primary)] font-500 text-lg leading-tight">{img.title}</h3>
                <p className="font-golos text-[var(--text-muted)] text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                  {img.desc}
                </p>
              </div>

              {/* Corner bracket */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Expand" size={16} className="text-[var(--rust)]" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selected !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <img
                src={images[selected].url}
                alt={images[selected].title}
                className="w-full max-h-[80vh] object-contain"
              />
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-oswald text-[var(--rust)] text-xs tracking-wider uppercase">{images[selected].category}</span>
                  <span className="text-[var(--text-muted)] text-xs">· {images[selected].year}</span>
                </div>
                <h3 className="font-oswald text-white text-xl">{images[selected].title}</h3>
                <p className="font-golos text-gray-400 text-sm mt-1">{images[selected].desc}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
              <div className="absolute inset-y-0 left-0 flex items-center -ml-12">
                <button
                  onClick={() => setSelected((selected - 1 + images.length) % images.length)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name="ChevronLeft" size={32} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center -mr-12">
                <button
                  onClick={() => setSelected((selected + 1) % images.length)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon name="ChevronRight" size={32} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
