"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Portfolio içerikleri - gerçek proje görselleri ile güncellenecek
const PORTFOLIO_PROJECTS = [
  {
    id: "kurumsal-erp-sistemi",
    title: "Kurumsal ERP Yönetim Sistemi",
    description: "Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü. Muhasebe, İK, satış ve envanter modülleri ile tam entegre sistem.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Redux", "JWT", "Socket.io"],
    category: "ERP Sistemi",
    metrics: "40% verimlilik artışı, 3x hızlı raporlama",
    image: "/images/projects/erp-preview.webp",
    liveUrl: "https://fabrikam360.com/",
    githubUrl: "#",
    status: "live",
    completedAt: "2024-11-15",
    duration: "3 ay",
    teamSize: "1 kişi",
    views: 1250,
    featured: true,
    client: "Fabrikam Corp"
  },
  {
    id: "e-ticaret-platformu",
    title: "Ölçeklenebilir E-Ticaret Platformu",
    description: "Modern e-ticaret deneyimi sunan, gelişmiş ödeme entegrasyonları ve envanter yönetimi ile donatılmış tam özellikli platform.",
    technologies: ["Next.js", "Prisma", "Iyzico", "Vercel", "MongoDB", "Redis", "Tailwind"],
    category: "E-Ticaret",
    metrics: "99.9% uptime, 1.84s sayfa yükleme süresi",
    image: "/images/projects/ecommerce-preview.webp",
    liveUrl: "https://www.aycay.com/",
    githubUrl: "#",
    status: "live",
    completedAt: "2024-10-20",
    duration: "2.5 ay",
    teamSize: "1 kişi",
    views: 890,
    featured: true,
    client: "Aycay Store"
  },
];

// Proje durum badge'leri
const getStatusBadge = (status: string) => {
  const statusConfig = {
    live: { text: "🟢 Canlı", color: "bg-green-100 text-green-800" },
    development: { text: "🟡 Geliştirme", color: "bg-yellow-100 text-yellow-800" },
    demo: { text: "🔵 Demo", color: "bg-blue-100 text-blue-800" },
    beta: { text: "🟠 Beta", color: "bg-orange-100 text-orange-800" }
  };
  
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.demo;
};

// Metin kısaltma fonksiyonu
const truncateText = (text: string, maxLength: number = 120) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation handlers
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === PORTFOLIO_PROJECTS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? PORTFOLIO_PROJECTS.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="portfolio" className="px-4 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="gradient" className="mb-4 px-4 py-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            Öne Çıkan Çalışmalar
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Başarılı <span className="text-primary">Projeler</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            İş büyümesini tetikleyen, üretime hazır çözümler geliştiriyorum
          </p>
        </motion.div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {PORTFOLIO_PROJECTS.map((project, index) => {
            const statusBadge = getStatusBadge(project.status);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Project Preview Area */}
                    <div className="h-52 relative overflow-hidden bg-gray-50">
                      <div className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover transition-transform duration-300"
                        />
                      </div>

                      {/* Gradient Shadow Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 group-hover:via-black/15 transition-all duration-300" />
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-all duration-300" />
                      
                      {/* Top badges */}
                      <div className="absolute top-4 left-4 flex gap-2 z-10">
                        <Badge variant="secondary" className="bg-white/95 text-gray-800 backdrop-blur-md shadow-lg">
                          {project.category}
                        </Badge>
                        <Badge className={`${statusBadge.color} text-xs backdrop-blur-md shadow-lg`}>
                          {statusBadge.text}
                        </Badge>
                      </div>

                      {/* Mobile view indicators */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-3 bg-white/90 rounded-sm backdrop-blur-sm shadow-sm" />
                          <div className="w-2 h-3 bg-white/90 rounded-sm backdrop-blur-sm shadow-sm" />
                        </div>
                      </div>

                      {/* Project title overlay */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <h4 className="text-white font-semibold text-sm drop-shadow-2xl bg-white/20 px-2 py-1 rounded" 
                            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                          {project.title}
                        </h4>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Metrics */}
                      <div className="flex items-center text-sm text-emerald-600 font-medium mb-6 bg-emerald-50 px-3 py-2 rounded-lg">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        {project.metrics}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-auto">
                        <Button variant="link" size="sm" className="p-0 text-primary" asChild>
                          <Link href={`/portfolio/${project.id}`}>
                            Proje Detayı
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            Canlı Site
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-12">
          {/* Carousel Container */}
          <div className="relative">
            {/* Main Slide */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              {(() => {
                const project = PORTFOLIO_PROJECTS[currentIndex];
                const statusBadge = getStatusBadge(project.status);
                
                return (
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardContent className="p-0">
                      {/* Project Preview Area */}
                      <div className="h-48 sm:h-56 relative overflow-hidden bg-gray-50">
                        <div className="absolute inset-0">
                          <Image
                            src={project.image}
                            alt={`${project.title} preview`}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Gradient Shadow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        
                        {/* Top badges */}
                        <div className="absolute top-3 left-3 flex gap-2 z-10">
                          <Badge variant="secondary" className="bg-white/95 text-gray-800 backdrop-blur-md shadow-lg text-xs">
                            {project.category}
                          </Badge>
                          <Badge className={`${statusBadge.color} text-xs backdrop-blur-md shadow-lg`}>
                            {statusBadge.text}
                          </Badge>
                        </div>

                        {/* Project title overlay */}
                        <div className="absolute bottom-3 left-3 right-3 z-10">
                          <h4 className="text-white font-semibold text-lg leading-tight drop-shadow-lg">
                            {project.title}
                          </h4>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                          {truncateText(project.description, 80)}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center text-sm text-emerald-600 font-medium mb-4 bg-emerald-50 px-3 py-2 rounded-lg">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {truncateText(project.metrics, 30)}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="flex-1" asChild>
                            <Link href={`/portfolio/${project.id}`}>
                              Proje Detayları
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                          <Button variant="outline" className="flex-1" asChild>
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              Canlı Site
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
            </motion.div>

            {/* Navigation Controls - Ortalanmış */}
            <div className="flex items-center justify-center mt-6 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevious}
                className="h-10 w-10 p-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-lightBlue">
                  <Link href="/portfolio">
                    <span className="mr-2">📁</span>
                    Tüm Projeleri Gör
                    <ArrowUpRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNext}
                className="h-10 w-10 p-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 gap-2">
              {PORTFOLIO_PROJECTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-primary w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center hidden lg:block"
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-lightBlue">
            <Link href="/portfolio">
              <span className="mr-2">📁</span>
              Tüm Projeleri Gör
              <ArrowUpRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}