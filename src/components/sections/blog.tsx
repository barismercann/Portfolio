"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, ExternalLink, Eye, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Mock blog data - cleaner structure
const FEATURED_POST = {
  id: "nextjs-15-yenilikleri",
  title: "Next.js 15'te Gelen Devrim Niteliğinde Yenilikler",
  excerpt: "React Server Components'tan Turbopack'e kadar Next.js 15'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.",
  publishedAt: "2024-12-15",
  readTime: 8,
  category: "Frontend",
  featured: true,
  views: 1250,
  tags: ["Next.js", "React", "Performance"],
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
    views: 890,
    tags: ["TypeScript", "Design Patterns"]
  },
  {
    id: "ai-integration-web-apps",
    title: "Modern Web Uygulamalarında AI Entegrasyonu",
    excerpt: "OpenAI, Claude ve diğer AI modellerini web uygulamalarınıza nasıl entegre edeceğinizi pratik örneklerle anlatıyorum.",
    publishedAt: "2024-12-05",
    readTime: 15,
    category: "AI/ML",
    views: 1456,
    tags: ["AI", "OpenAI"]
  },
  {
    id: "performance-optimization-react",
    title: "React Uygulamalarında Performans Optimizasyonu",
    excerpt: "Büyük ölçekli React uygulamalarında performansı artıran teknikler ve best practice'ler.",
    publishedAt: "2024-11-28",
    readTime: 10,
    category: "Frontend",
    views: 734,
    tags: ["React", "Performance"]
  }
];

const CATEGORIES = [
  { name: "Frontend", count: 12, color: "bg-blue-100 text-blue-800" },
  { name: "Backend", count: 8, color: "bg-green-100 text-green-800" },
  { name: "AI/ML", count: 5, color: "bg-purple-100 text-purple-800" },
  { name: "DevOps", count: 6, color: "bg-orange-100 text-orange-800" }
];

const POPULAR_TAGS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'AI', 'DevOps', 'AWS', 'Performance'
];

export function BlogSection() {
  const t = useTranslations('blog');

  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            {t('title')}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Bilgi <span className="text-primary">Hazinem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-900 to-purple-900 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Öne Çıkan
                    </Badge>
                    <Badge variant="outline" className="text-gray-300 border-gray-500">
                      {FEATURED_POST.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                    {FEATURED_POST.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed text-lg">
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
                      <span>{FEATURED_POST.views.toLocaleString()} görüntülenme</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {FEATURED_POST.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-gray-300 border-gray-500 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <Button variant="secondary" size="lg" className="group" asChild>
                      <Link href={`/blog/${FEATURED_POST.id}`}>
                        Makaleyi Oku
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white hover:bg-white/10">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Paylaş
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Posts */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Son Yazılar</h3>
              <div className="space-y-6">
                {RECENT_POSTS.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                              <span>{post.views}</span>
                            </div>
                          </div>
                        </div>

                        <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="link" size="sm" className="p-0 h-auto group" asChild>
                            <Link href={`/blog/${post.id}`}>
                              Devamını Oku
                              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Kategoriler
                  </h4>
                  <div className="space-y-3">
                    {CATEGORIES.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Link 
                          href="/blog"
                          className="text-sm font-medium hover:text-primary transition-colors"
                        >
                          {category.name}
                        </Link>
                        <Badge variant="secondary" className={`text-xs ${category.color}`}>
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
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
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Popüler Etiketler
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_TAGS.map((tag) => (
                      <Link key={tag} href="/blog">
                        <Badge 
                          variant="outline" 
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Blog Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
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
                      <span className="font-semibold text-green-600">+3 yazı</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button size="lg" asChild className="group">
            <Link href="/blog">
              <BookOpen className="w-5 h-5 mr-2" />
              Tüm Blog Yazılarını Gör
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}