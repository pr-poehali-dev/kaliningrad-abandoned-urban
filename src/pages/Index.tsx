import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MapSection from '@/components/MapSection';
import Gallery from '@/components/Gallery';
import RoutesSection from '@/components/Routes';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';

const HERO_BG = 'https://cdn.poehali.dev/projects/42972322-7ce8-4f1e-a343-7dc030e9e759/files/2a5824ee-cfbb-4a58-9073-78182c121b7d.jpg';

const galleryImages = [
  {
    url: 'https://cdn.poehali.dev/projects/42972322-7ce8-4f1e-a343-7dc030e9e759/files/10a76c3c-f8ff-4715-9e54-d20277aea667.jpg',
    title: 'Форт №11 «Дёнхофф»',
    category: 'Форт',
    year: '2025',
    desc: 'Подземные казематы немецкого форта 1890-х годов. Отличная сохранность, полный проход.',
  },
  {
    url: 'https://cdn.poehali.dev/projects/42972322-7ce8-4f1e-a343-7dc030e9e759/files/f896a6d2-3d76-45e2-a812-41649afa05e7.jpg',
    title: 'Целлюлозный завод',
    category: 'Завод',
    year: '2024',
    desc: 'Огромный советский промышленный комплекс. Несколько корпусов, высотные цеха.',
  },
  {
    url: 'https://cdn.poehali.dev/projects/42972322-7ce8-4f1e-a343-7dc030e9e759/files/edf701d4-194e-4a97-bc68-abef2a854f71.jpg',
    title: 'Военный санаторий',
    category: 'СССР',
    year: '2025',
    desc: 'Советский санаторий с сохранившимися мозаиками и интерьерами 1970-х годов.',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-[var(--dark-base)] text-[var(--text-primary)]">
      <Navbar />
      <Hero bgImage={HERO_BG} />
      <div className="section-divider" />
      <MapSection />
      <div className="section-divider" />
      <Gallery images={galleryImages} />
      <div className="section-divider" />
      <RoutesSection />
      <div className="section-divider" />
      <Reviews />
      <Footer />
    </div>
  );
}
