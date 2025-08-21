"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { PROJECTS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function PortfolioSection() {
  return (
    <section id="portfolio" className="px-30 py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Öne Çıkan Çalışmalar
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Başarı <span className="text-primary">Hikayeleri</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            İş büyümesini tetikleyen, üretime hazır çözümler geliştiriyorum
          </p>
        </motion.div>

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Project Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex items-center justify-center">
                  <div className="w-full max-w-md">
                    {/* Mockup */}
                    <div className="bg-white rounded-lg p-6 shadow-xl">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-1/2" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                        <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 right-8 bg-orange-500 p-2 rounded-lg shadow-lg"
                  >
                    <span className="text-white font-bold text-sm">ERP</span>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge variant="success" className="w-fit mb-4">
                    En Popüler
                  </Badge>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    Kurumsal ERP Yönetim Sistemi
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok 
                    kiracılı ERP çözümü geliştirdim
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Next.js', 'Node.js', 'PostgreSQL', 'Docker'].map((tech) => (
                      <Badge key={tech} variant="outline" className="text-gray-300 border-gray-600">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Key Result */}
                  <div className="flex items-center space-x-2 mb-6 text-green-400">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-semibold">40% verimlilik artışı, 3x hızlı raporlama</span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-800">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Vaka Çalışmasını İncele
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {PROJECTS.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-0">
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold">
                            {project.title.charAt(0)}
                          </span>
                        </div>
                        <h4 className="font-semibold">{project.title}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Key Feature */}
                    <div className="text-sm text-green-600 font-medium mb-4">
                      {project.features[0]}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Github className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="link" size="sm" className="p-0">
                        Detayları Gör
                        <ArrowUpRight className="w-4 h-4 ml-1" />
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
          <Button size="lg" asChild>
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