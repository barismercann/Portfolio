import { AboutSection } from '@/components/sections/about';
import { BlogSection } from '@/components/sections/blog';
import { ContactPreviewSection } from '@/components/sections/contact-preview';
import { HeroSection } from '@/components/sections/hero';
import { PortfolioSection } from '@/components/sections/portfolio';
import { ServicesSection } from '@/components/sections/services';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <BlogSection />
      <ContactPreviewSection />
    </>
  );
}