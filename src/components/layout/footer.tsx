import { Button } from '@/components/ui';
import { SITE_CONFIG } from '@/lib/constants';
import { Code2, Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: `https://github.com/${SITE_CONFIG.author.github}`, label: 'GitHub' },
    { icon: Linkedin, href: `https://linkedin.com/in/${SITE_CONFIG.author.linkedin}`, label: 'LinkedIn' },
    { icon: Twitter, href: `https://x.com/${SITE_CONFIG.author.twitter}`, label: 'Twitter' },
  ];

  const services = [
    "Özel Yazılım Geliştirme",
    "Teknik Danışmanlık", 
    "DevOps Çözümleri",
    "Kod İnceleme"
  ];

  const technologies = [
    "Frontend Frameworks",
    "Backend Teknolojileri", 
    "Cloud Platformları",
    "Veritabanları"
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">barış</span>
                <span className="text-xl font-light text-gray-300 ml-1">mercan</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Yarının dijital gerçekliğini bugünden inşa eden full-stack geliştirici. 
              Karmaşık problemler için imkansız çözümler üretiyorum.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="ghost" size="icon" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
            <div className="mt-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-900/30 border border-green-600/30 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Yeni projeler için müsait
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Hizmetlerim</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/#services" className="text-gray-300 hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Teknolojiler</h3>
            <ul className="space-y-3">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                    {tech}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">İletişim & Kaynaklar</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${SITE_CONFIG.author.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.author.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+905435535310" className="hover:text-white transition-colors">
                  +90 543 553 5310
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-primary" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors">
                Blog Yazıları
              </Link>
              <Link href="/portfolio" className="block text-gray-300 hover:text-white transition-colors">
                Projeler
              </Link>
              <Link href="/#contact" className="block text-gray-300 hover:text-white transition-colors">
                Ücretsiz Danışmanlık
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Barış Mercan. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <span>24 saat içinde yanıt garantisi</span>
              <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}