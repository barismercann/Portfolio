// src/app/blog/page.tsx
"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock data - gerçek API'den gelecek
const FEATURED_POST = {
  id: "nextjs-15-yenilikleri",
  title: "Next.js 15'te Gelen Devrim Niteliğinde Yenilikler",
  excerpt: "React Server Components'tan Turbopack'e kadar Next.js 15'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.",
  publishedAt: "2024-12-15",
  readTime: 8,
  category: "Frontend",
  viewCount: 1250,
  tags: ["Next.js", "React", "Performance"],
  coverImage: "/images/blog/nextjs-15.jpg",
  author: {
    name: "Barış Mercan",
    avatar: "/avatars/baris.jpg"
  }
};

const RECENT_POSTS = [
  {
    id: "typescript-advanced-patterns",
    title: "TypeScript'te İleri Seviye Design Pattern'lar",
    excerpt: "Enterprise uygulamalarda TypeScript ile güçlü, tip-güvenli mimari yapıları nasıl oluşturacağınızı öğrenin.",
    publishedAt: "2024-12-10",
    readTime: 12,
    category: "Backend",
    viewCount: 890,
    tags: ["TypeScript", "Design Patterns"],
    coverImage: "/images/blog/typescript.jpg",
  },
  {
    id: "ai-integration-web-apps",
    title: "Modern Web Uygulamalarında AI Entegrasyonu",
    excerpt: "OpenAI, Claude ve diğer AI modellerini web uygulamalarınıza nasıl entegre edeceğinizi pratik örneklerle anlatıyorum.",
    publishedAt: "2024-12-05",
    readTime: 15,
    category: "AI/ML",
    viewCount: 1456,
    tags: ["AI", "OpenAI", "Integration"],
    coverImage: "/images/blog/ai-integration.jpg",
  },
  {
    id: "performance-optimization-react",
    title: "React Uygulamalarında Performans Optimizasyonu",
    excerpt: "Büyük ölçekli React uygulamalarında performansı artıran teknikler ve best practice'ler.",
    publishedAt: "2024-11-28",
    readTime: 10,
    category: "Frontend",
    viewCount: 734,
    tags: ["React", "Performance", "Optimization"],
    coverImage: "/images/blog/react-performance.jpg",
  },
  {
    id: "nodejs-microservices",
    title: "Node.js ile Microservices Mimarisi",
    excerpt: "Scalable Node.js microservices yapısı kurmak için pratik rehber ve best practice'ler.",
    publishedAt: "2024-11-20",
    readTime: 18,
    category: "Backend",
    viewCount: 567,
    tags: ["Node.js", "Microservices", "Architecture"],
    coverImage: "/images/blog/nodejs-microservices.jpg",
  },
  {
    id: "docker-development-workflow",
    title: "Docker ile Modern Development Workflow",
    excerpt: "Development ortamından production'a Docker container'ları ile etkili geliştirme süreci.",
    publishedAt: "2024-11-15",
    readTime: 14,
    category: "DevOps",
    viewCount: 423,
    tags: ["Docker", "DevOps", "Containerization"],
    coverImage: "/images/blog/docker-workflow.jpg",
  },
  {
    id: "database-optimization-tips",
    title: "PostgreSQL Performans Optimizasyonu",
    excerpt: "Production PostgreSQL veritabanlarında performansı artıran indexleme ve query optimization teknikleri.",
    publishedAt: "2024-11-08",
    readTime: 16,
    category: "Database",
    viewCount: 389,
    tags: ["PostgreSQL", "Database", "Performance"],
    coverImage: "/images/blog/postgres-optimization.jpg",
  }
];

const CATEGORIES = [
  { id: "all", name: "Tümü", count: 31 },
  { id: "frontend", name: "Frontend", count: 12 },
  { id: "backend", name: "Backend", count: 8 },
  { id: "ai-ml", name: "AI/ML", count: 5 },
  { id: "devops", name: "DevOps", count: 6 }
];

const POPULAR_TAGS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'AI', 'DevOps', 'AWS', 'Performance'
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(RECENT_POSTS);

  useEffect(() => {
    let filtered = RECENT_POSTS;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => 
        post.category.toLowerCase() === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Teknik Blog
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Bilgi <span className="text-primary">Hazinem</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            En son teknolojiler, best practice&apos;ler ve pratik çözümler hakkında derinlemesine yazılar
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-900 to-purple-900 text-white">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 min-h-[400px]">
                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Öne Çıkan
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-500">
                      {FEATURED_POST.category}
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    {FEATURED_POST.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {FEATURED_POST.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(FEATURED_POST.publishedAt).toLocaleDateString('tr-TR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{FEATURED_POST.readTime} dk okuma</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{FEATURED_POST.viewCount.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button variant="secondary" size="lg" className="self-start" asChild>
                    <Link href={`/blog/${FEATURED_POST.id}`}>
                      Makaleyi Oku
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Image */}
                <div className="relative bg-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20" />
                  {FEATURED_POST.coverImage && (
                    <img 
                      src={FEATURED_POST.coverImage}
                      alt={FEATURED_POST.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-white/20" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Category Filters */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className="rounded-full"
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
                      placeholder="Blog yazılarında ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrele
                  </Button>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{filteredPosts.length}</span> yazı gösteriliyor
                  {selectedCategory !== "all" && (
                    <span> - <span className="font-medium">{CATEGORIES.find(c => c.id === selectedCategory)?.name}</span> kategorisinde</span>
                  )}
                  {searchTerm && (
                    <span> - <span className="font-medium">{searchTerm}</span> aramasında</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group">
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Image */}
                          <div className="relative h-48 md:h-32 bg-gray-100 rounded-lg overflow-hidden">
                              <Image 
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            { !post.coverImage ? (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-gray-400" />
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{post.readTime} dk</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  <span>{post.viewCount}</span>
                                </div>
                              </div>
                            </div>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                              <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                                <Link href={`/blog/${post.id}`}>
                                  Devamını Oku
                                  <ArrowRight className="w-3 h-3 ml-1" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Yazı bulunamadı</h3>
                <p className="text-muted-foreground mb-4">
                  Arama kriterlerinize uygun blog yazısı bulunamadı.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Newsletter */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Newsletter
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Yeni yazılardan ve teknoloji güncellemelerinden haberdar olun
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="E-posta adresiniz"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Button size="sm" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Abone Ol
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Haftalık en fazla 1 email gönderiyoruz
                </p>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Popüler Etiketler
                </h4>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="outline" 
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                      onClick={() => setSearchTerm(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">📊 Blog İstatistikleri</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Toplam Yazı</span>
                    <span className="font-semibold">31</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Toplam Okunma</span>
                    <span className="font-semibold">12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bu Ay</span>
                    <span className="font-semibold text-green-600">+6 yazı</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}