"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Eye,
  Filter,
  Github,
  Search,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Genişletilmiş portfolio projeleri
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
  {
    id: "saas-analytics-dashboard",
    title: "SaaS Analitik Platformu",
    description: "ML tahminleri ile gerçek zamanlı iş zekası platformu. Büyük veri işleme ve görselleştirme yetenekleri.",
    technologies: ["React", "Express", "Redis", "AWS", "D3.js", "TensorFlow.js"],
    category: "SaaS Platform",
    metrics: "Günlük 250K+ veri noktası işleniyor",
    image: "/images/projects/analytics-dashboard.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "development",
    completedAt: "2024-12-01",
    duration: "4 ay",
    teamSize: "2 kişi",
    views: 650,
    featured: false,
    client: "DataCorp Analytics"
  },
  {
    id: "ai-chatbot-sistemi",
    title: "Yapay Zeka Chatbot Sistemi",
    description: "OpenAI GPT entegrasyonu ile müşteri hizmetleri chatbot. Doğal dil işleme ve otomatik yanıt sistemi.",
    technologies: ["Python", "FastAPI", "OpenAI", "React", "WebSocket", "PostgreSQL"],
    category: "AI Platform",
    metrics: "85% otomatik çözüm oranı",
    image: "/images/projects/ai-chatbot.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "demo",
    completedAt: "2024-09-15",
    duration: "2 ay",
    teamSize: "1 kişi",
    views: 420,
    featured: false,
    client: "TechSupport Inc"
  },
  {
    id: "blockchain-voting-system",
    title: "Blockchain Voting Sistemi",
    description: "Güvenli ve şeffaf dijital oylama platformu. Blockchain teknolojisi ile manipülasyon-proof sistem.",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum", "MetaMask", "IPFS"],
    category: "Blockchain",
    metrics: "100% güvenlik, sıfır manipülasyon",
    image: "/images/projects/blockchain-voting.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "beta",
    completedAt: "2024-08-30",
    duration: "3 ay",
    teamSize: "1 kişi",
    views: 780,
    featured: false,
    client: "VoteSecure"
  },
  {
    id: "iot-monitoring-dashboard",
    title: "IoT Monitoring Dashboard",
    description: "Gerçek zamanlı IoT cihaz izleme ve kontrol paneli. Endüstriyel sensör yönetimi ve alarm sistemi.",
    technologies: ["Vue.js", "Node.js", "MQTT", "InfluxDB", "Grafana", "Docker"],
    category: "IoT Platform",
    metrics: "1000+ cihaz eş zamanlı takip",
    image: "/images/projects/iot-dashboard.jpg",
    liveUrl: "#",
    githubUrl: "#",
    status: "live",
    completedAt: "2024-07-10",
    duration: "2 ay",
    teamSize: "1 kişi",
    views: 340,
    featured: false,
    client: "Industrial IoT Solutions"
  }
];

// Dinamik kategori filtreleri - proje verilerinden otomatik oluşturma
const generateCategories = () => {
  const categories = PORTFOLIO_PROJECTS.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return [
    { id: "all", name: "Tümü", count: PORTFOLIO_PROJECTS.length },
    ...Object.entries(categories).map(([category, count]) => ({
      id: category,
      name: category,
      count
    }))
  ];
};

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

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = generateCategories();
  
  // Filtreleme mantığı
  const filteredProjects = PORTFOLIO_PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Portfolio
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Başarılı <span className="text-primary">Projelerim</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            İş büyümesini tetikleyen, üretime hazır çözümler geliştiriyorum
          </p>
        </motion.div> */}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-blue-100">
            <div className="text-3xl font-bold text-primary mb-2">20</div>
            <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Müşteri Memnuniyeti</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-sm text-muted-foreground">Teknoloji Kullanıldı</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center border border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Zamanında Teslimat</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filters */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    className="rounded-full transition-all duration-200"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Proje ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-[200px]"
                />
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{filteredProjects.length}</span> proje gösteriliyor
              {selectedCategory !== "all" && (
                <span> - <span className="font-medium">{categories.find(c => c.id === selectedCategory)?.name}</span> kategorisinde</span>
              )}
              {searchTerm && (
                <span> - <span className="font-medium">{searchTerm}</span> aramasında</span>
              )}
            </p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredProjects.map((project, index) => {
              const statusBadge = getStatusBadge(project.status);
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Project Preview */}
                      <div className="h-52 relative overflow-hidden bg-gray-50">
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge variant="secondary" className="bg-white/95 text-gray-800 backdrop-blur-md">
                            {project.category}
                          </Badge>
                          <Badge className={`${statusBadge.color} text-xs backdrop-blur-md`}>
                            {statusBadge.text}
                          </Badge>
                          {project.featured && (
                            <Badge variant="success" className="text-xs backdrop-blur-md">
                              ⭐ Öne Çıkan
                            </Badge>
                          )}
                        </div>

                        {/* Quick Info */}
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{project.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{project.teamSize}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{project.views}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Client */}
                        <div className="mb-4">
                          <span className="text-xs text-gray-500">Müşteri: </span>
                          <span className="text-xs font-medium text-gray-700">{project.client}</span>
                        </div>

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
                        <div className="flex items-center justify-between mt-auto gap-3">
                          <Button variant="default" size="sm" className="flex-1" asChild>
                            <Link href={`/portfolio/${project.id}`}>
                              <Zap className="w-4 h-4 mr-2" />
                              Detayları Gör
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4" />
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
        ) : (
          // No Results State
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Proje Bulunamadı</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? (
                <>Bu arama terimi için proje bulunamadı: <span className="font-medium">{searchTerm}</span></>
              ) : (
                <>Bu kategoride henüz proje bulunmuyor.</>
              )}
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Filtreleri Temizle
              </Button>
              <Button asChild>
                <Link href="/#contact">
                  Proje Başlat
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Bir Sonraki Proje Sizinki Olsun</h2>
            <p className="text-xl mb-8 opacity-90">
              Hayalinizdeki projeyi birlikte hayata geçirelim
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/#contact">
                  <Zap className="w-5 h-5 mr-2" />
                  Projeye Başla
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-dark border-white hover:bg-white hover:text-primary" asChild>
                <Link href="/#contact">
                  Ücretsiz Danışmanlık
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}