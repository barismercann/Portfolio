"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Portfolio içerikleri - İleride admin panelden yönetilebilir
const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: "Kurumsal ERP Yönetim Sistemi",
    description: "Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    category: "ERP Sistemi",
    metrics: "40% verimlilik artışı, 3x hızlı raporlama",
    image: "/api/placeholder/400/300",
    liveUrl: "https://fabrikam360.com/",
    githubUrl: "#",
    caseStudyUrl: "#",
    gradient: "from-blue-600 to-purple-700"
  },
  {
    id: 2,
    title: "SaaS Analitik Platformu",
    description: "ML tahminleri ile gerçek zamanlı iş zekası platformu geliştirdim",
    technologies: ["React", "Express", "Redis", "AWS"],
    category: "SaaS Platform",
    metrics: "Günlük 250K+ veri noktası işleniyor",
    image: "/api/placeholder/400/300",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    gradient: "from-purple-600 to-pink-600"
  },
  {
    id: 3,
    title: "Ölçeklenebilir E-Ticaret Platformu",
    description: "Gelişmiş ödeme entegrasyonu ile ölçeklenebilir e-ticaret çözümü",
    technologies: ["Next.js", "Prisma", "Stripe", "Vercel"],
    category: "E-Ticaret",
    metrics: "99.9% uptime, 2s sayfa yükleme süresi",
    image: "/api/placeholder/400/300",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    gradient: "from-green-600 to-teal-600"
  },
  {
    id: 4,
    title: "Yapay Zeka Chatbot Sistemi",
    description: "OpenAI GPT entegrasyonu ile müşteri hizmetleri chatbot geliştirdim",
    technologies: ["Python", "FastAPI", "OpenAI", "React"],
    category: "AI Platform",
    metrics: "85% otomatik çözüm oranı",
    image: "/api/placeholder/400/300",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    gradient: "from-orange-600 to-red-600"
  },
  {
    id: 5,
    title: "Blockchain Voting Sistemi",
    description: "Güvenli ve şeffaf dijital oylama platformu geliştirdim",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
    category: "Blockchain",
    metrics: "100% güvenlik, sıfır manipülasyon",
    image: "/api/placeholder/400/300",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    gradient: "from-indigo-600 to-blue-600"
  },
  {
    id: 6,
    title: "IoT Monitoring Dashboard",
    description: "Gerçek zamanlı IoT cihaz izleme ve kontrol paneli",
    technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB"],
    category: "IoT Platform",
    metrics: "1000+ cihaz eş zamanlı takip",
    image: "/api/placeholder/400/300",
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "#",
    gradient: "from-cyan-600 to-blue-600"
  }
];

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
          {PORTFOLIO_PROJECTS.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full">
                <CardContent className="p-0 h-full flex flex-col">
                  {/* Project Image with Category Badge */}
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Floating tech icons/elements */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <span className="text-3xl font-bold">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                      animate={{ 
                        x: [0, 10, 0],
                        y: [0, -5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-6 right-6 w-8 h-8 bg-white/30 rounded-lg backdrop-blur-sm"
                    />
                    <motion.div
                      animate={{ 
                        x: [0, -8, 0],
                        y: [0, 8, 0]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                      className="absolute bottom-6 right-8 w-6 h-6 bg-white/20 rounded-full"
                    />
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
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href={project.liveUrl}>
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                          <Link href={project.githubUrl}>
                            <Github className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                      <Button variant="link" size="sm" className="p-0 text-primary" asChild>
                        <Link href={project.caseStudyUrl}>
                          Vaka Çalışmasını İncele
                          <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild className="bg-gradient-to-r from-primary to-lightBlue ">
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