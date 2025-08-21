import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { AboutSection } from '@/components/sections/about';
import { HeroSection } from '@/components/sections/hero';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        {/* Diğer sectionlar buraya eklenecek */}
      </main>
      <Footer />
    </>
  );
}