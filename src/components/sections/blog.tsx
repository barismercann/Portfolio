"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, Clock, ExternalLink, TrendingUp } from 'lucide-react';
import Link from 'next/link';

// Mock blog data
const BLOG_POSTS = [
  {
    id: "nextjs-15-yenilikleri",
    title: "Next.js 15'te Gelen Devrim Niteliğinde Yenilikler",
    excerpt: "React Server Components'tan Turbopack'e kadar Next.js 15'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.",
    publishedAt: "2024-12-15",
    readTime: 8,
    category: "Frontend",
    featured: true,
    tags: ["Next.js", "React", "Performance"],
    author: {
      name: "Barış Mercan",
      avatar: "/avatars/baris.jpg"
    }
  },
  {
    id: "typescript-advanced-patterns",
    title: "TypeScript'te İleri Seviye Design Pattern'lar",
    excerpt: "Enterprise uygulamalarda TypeScript ile güçlü, tip-güvenli mimari yapıları nasıl oluşturacağınızı öğrenin.",
    publishedAt: "2024-12-10",
    readTime: 12,
    category: "Backend",
    featured: false,
    tags: ["TypeScript", "Design Patterns", "Architecture"],
    author: {
      name: "Barış Mercan",
      avatar: "/avatars/baris.jpg"
    }
  },
  {
    id: "ai-integration-web-apps",
    title: "Modern Web Uygulamalarında AI Entegrasyonu",
    excerpt: "OpenAI, Claude ve diğer AI modellerini web uygulamalarınıza nasıl entegre edeceğinizi pratik örneklerle anlatıyorum.",
    publishedAt: "2024-12-05",
    readTime: 15,
    category: "AI/ML",
    featured: false,
    tags: ["AI", "OpenAI", "Integration"],
    author: {
      name: "Barış Mercan",
      avatar: "/avatars/baris.jpg"
    }
  }
];

const CATEGORIES = [
  { name: "Frontend", count: 12, color: "bg-blue-100 text-blue-800" },
  { name: "Backend", count: 8, color: "bg-green-100 text-green-800" },
  { name: "AI/ML", count: 5, color: "bg-purple-100 text-purple-800" },
  { name: "DevOps", count: 6, color: "bg-orange-100 text-orange-800" }
];

export function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Teknik Blog
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Bilgi <span className="text-primary">Hazinem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            En son teknolojiler, best practice&apos;ler ve pratik çözümler hakkında derinlemesine yazılar
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {BLOG_POSTS.filter(post => post.featured).map((post) => (
            <Card key={post.id} className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="success">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Öne Çıkan
                      </Badge>
                      <Badge variant="outline" className="text-gray-300 border-gray-600">
                        {post.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} dk okuma</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-gray-300 border-gray-600 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                      <Button variant="outline" size="lg" className="text-white border-gray-600 hover:bg-gray-800 group" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Makaleyi Oku
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="lg" className="text-gray-400 hover:text-white">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Paylaş
                      </Button>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      {/* Code Mockup */}
                      <div className="bg-gray-900 rounded-lg p-6 shadow-xl font-mono text-sm">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                          </div>
                          <span className="text-gray-400 text-xs">next.config.ts</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="text-purple-400">
                            <span className="text-blue-400">import</span> type {'{'} NextConfig {'}'} 
                            <span className="text-blue-400"> from</span> <span className="text-green-400">&apos;next&apos;</span>
                          </div>
                          <div className="text-gray-400">
                            <span className="text-blue-400">const</span> <span className="text-yellow-400">config</span>: NextConfig = {'{'}
                          </div>
                          <div className="text-gray-400 pl-2">
                            <span className="text-purple-400">experimental</span>: {'{'}
                          </div>
                          <div className="text-gray-400 pl-4">
                            <span className="text-purple-400">turbo</span>: {'{'} 
                            <span className="text-purple-400">enabled</span>: <span className="text-blue-400">true</span> {'}'}
                          </div>
                          <div className="text-gray-400 pl-2">{'}'}</div>
                          <div className="text-gray-400">{'}'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                    >
                      🔥 Trending
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Other Posts Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Posts */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Son Yazılar</h3>
            <div className="space-y-6">
              {BLOG_POSTS.filter(post => !post.featured).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
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
                        <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                          <Link href={`/blog/${post.id}`}>
                            Devamını Oku
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Kategoriler</h4>
                  <div className="space-y-3">
                    {CATEGORIES.map((category) => (
                      <div key={category.name} className="flex items-center justify-between">
                        <Link 
                          href="/blog" // Geçici olarak ana blog sayfasına yönlendir
                          className="text-sm hover:text-primary transition-colors"
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-3">📧 Newsletter</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Yeni yazılardan ve teknoloji güncellemelerinden haberdar olun
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="E-posta adresiniz"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button size="sm" className="w-full">
                      Abone Ol
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Popüler Etiketler</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'AI', 'DevOps', 'AWS', 'Performance'].map((tag) => (
                      <Link key={tag} href="/blog"> {/* Geçici olarak ana blog sayfasına yönlendir */}
                        <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/blog">
              <BookOpen className="w-5 h-5 mr-2" />
              Tüm Blog Yazılarını Gör
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}