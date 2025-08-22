"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Portfolio içerikleri - gerçek proje görselleri ile güncellenecek
const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Kurumsal ERP Yönetim Sistemi",
    description: "Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Redux"],
    category: "ERP Sistemi",
    metrics: "40% verimlilik artışı, 3x hızlı raporlama",
    image: "/images/projects/erp-preview.webp",
    previewImage: "/images/projects/erp-preview.webp", 
    liveUrl: "https://fabrikam360.com/",
    githubUrl: "#",
    caseStudyUrl: "#",
    status: "live"
  },
  {
    id: 2,
    title: "Ölçeklenebilir E-Ticaret Platformu",
    description: "Gelişmiş ödeme entegrasyonu ile ölçeklenebilir e-ticaret çözümü",
    technologies: ["Next.js", "Prisma", "Iyzico", "Vercel", "MongoDB"],
    category: "E-Ticaret",
    metrics: "99.9% uptime, 1.84s sayfa yükleme süresi",
    image: "/images/projects/ecommerce-preview.webp",
    previewImage: "/images/projects/ecommerce-preview.webp",
    liveUrl: "https://www.aycay.com/",
    githubUrl: "#",
    caseStudyUrl: "#",
    status: "live"
  },
  {
    id: 3,
    title: "SaaS Analitik Platformu",
    description: "ML tahminleri ile gerçek zamanlı iş zekası platformu geliştirdim",
    technologies: ["React", "Express", "Redis", "AWS"],
    category: "SaaS Platform",
    metrics: "Günlük 250K+ veri noktası işleniyor",
    image: "/images/projects/analytics-dashboard.jpg",
    previewImage: "/images/projects/analytics-preview.jpg",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    status: "development"
  },
  
  {
    id: 4,
    title: "Yapay Zeka Chatbot Sistemi",
    description: "OpenAI GPT entegrasyonu ile müşteri hizmetleri chatbot geliştirdim",
    technologies: ["Python", "FastAPI", "OpenAI", "React"],
    category: "AI Platform",
    metrics: "85% otomatik çözüm oranı",
    image: "/images/projects/ai-chatbot.jpg",
    previewImage: "/images/projects/ai-preview.jpg",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    status: "demo"
  },
  {
    id: 5,
    title: "Blockchain Voting Sistemi",
    description: "Güvenli ve şeffaf dijital oylama platformu geliştirdim",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
    category: "Blockchain",
    metrics: "100% güvenlik, sıfır manipülasyon",
    image: "/images/projects/blockchain-voting.jpg",
    previewImage: "/images/projects/blockchain-preview.jpg",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    status: "beta"
  },
  {
    id: 6,
    title: "IoT Monitoring Dashboard",
    description: "Gerçek zamanlı IoT cihaz izleme ve kontrol paneli",
    technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB"],
    category: "IoT Platform",
    metrics: "1000+ cihaz eş zamanlı takip",
    image: "/images/projects/iot-dashboard.jpg",
    previewImage: "/images/projects/iot-preview.jpg",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    status: "live"
  }
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

export function PortfolioSection() {

  return (
    <section id="portfolio" className="px-6 md:px-24 py-20 bg-gradient-to-b from-blue-50 to-white">
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

        {/* Projects Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {PORTFOLIO_PROJECTS.slice(0, 3).map((project, index) => {
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
                      {/* Live Preview Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover transition-transform duration-300"
                        />
                      </div>

                      {/* Saydam Gölge Overlay - Gradient Shadow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 group-hover:via-black/15 transition-all duration-300" />
                      
                      {/* İlave saydam gölge overlay - daha güçlü efekt için */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-all duration-300" />
                      
                      {/* Top badges - daha net görünmesi için backdrop-blur eklendi */}
                      <div className="absolute top-4 left-4 flex gap-2 z-10">
                        <Badge variant="secondary" className="bg-white/95 text-gray-800 backdrop-blur-md shadow-lg">
                          {project.category}
                        </Badge>
                        <Badge className={`${statusBadge.color} text-xs backdrop-blur-md shadow-lg`}>
                          {statusBadge.text}
                        </Badge>
                      </div>

                      {/* Mobile view indicators - daha net görünmesi için */}
                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="flex items-center gap-1">
                          {/* Desktop icon */}
                          <div className="w-4 h-3 bg-white/90 rounded-sm backdrop-blur-sm shadow-sm" />
                          {/* Mobile icon */}
                          <div className="w-2 h-3 bg-white/90 rounded-sm backdrop-blur-sm shadow-sm" />
                        </div>
                      </div>

                      {/* Project title overlay - daha net görünmesi için text-shadow eklendi */}
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
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
                            {tech}
                          </Badge>
                        ))}
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
                            Canlı Web Sitesi
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
      </div>
    </section>
  );
}