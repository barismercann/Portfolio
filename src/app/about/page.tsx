"use client";

import { Badge, Button } from '@/components/ui';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Award,
    CheckCircle,
    Clock,
    Cloud,
    Code2,
    Globe,
    Heart,
    Mail,
    MapPin,
    Phone,
    Server,
    Shield,
    Star,
    Target,
    Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// React Icons import
import {
    SiAmazonwebservices,
    SiDocker,
    SiExpress,
    SiGit,
    SiGithubactions,
    SiGraphql,
    SiGreensock,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiReact,
    SiRedux,
    SiTailwindcss,
    SiTypescript,
    SiVercel
} from 'react-icons/si';

// Skill icons mapping
const skillIcons = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Redux': SiRedux,
  'GSAP': SiGreensock,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'Prisma': SiPrisma,
  'GraphQL': SiGraphql,
  'AWS': SiAmazonwebservices,
  'Docker': SiDocker,
  'Vercel': SiVercel,
  'CI/CD': SiGithubactions,
  'Git': SiGit
};

const skillColors = {
  'React': '#61DAFB',
  'Next.js': '#000000',
  'TypeScript': '#3178C6',
  'Tailwind CSS': '#06B6D4',
  'Redux': '#764ABC',
  'GSAP': '#88CE02',
  'Node.js': '#339933',
  'Express': '#000000',
  'PostgreSQL': '#336791',
  'MongoDB': '#47A248',
  'Prisma': '#2D3748',
  'GraphQL': '#E10098',
  'AWS': '#FF9900',
  'Docker': '#2496ED',
  'Vercel': '#000000',
  'CI/CD': '#2088FF',
  'Git': '#F05032'
};

export default function AboutPage() {
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
            <Users className="w-4 h-4 mr-2" />
            Hakkımda
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Barış <span className="text-primary">Mercan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            5+ yıllık deneyime sahip, modern web teknolojileri konusunda uzmanlaşmış freelance full-stack developer
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Personal Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/hero.webp"
                    width={96}
                    height={96}
                    alt="Barış Mercan"
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Profesyonel Hikayem</h2>
                  <p className="text-muted-foreground">
                    Markanızın öne çıkmasına ve müşteri memnuniyetini en üst düzeye çıkarmasına yardımcı olmak için 
                    modern ve sezgisel web deneyimleri tasarlayan, deneyimli bir freelance geliştirici.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">5 yıllık</strong> frontend ve web geliştirme deneyimi, 
                  <strong className="text-foreground"> 1,400+ saat</strong> çalışma süresi ve 
                  <strong className="text-foreground"> 40+ tamamlanmış proje</strong> ile müşterilerimin hedeflerini 
                  aşmayı ve hedef kitlelerinin beklentilerini karşılamayı seviyorum.
                </p>
                
                <p>
                  Uzmanlığım sadece web siteleriyle sınırlı değil; aynı zamanda kullanıcı dostu web uygulamaları, 
                  interaktif panolar ve dönüşümleri artıran, marka değerini yükselten veri açısından zengin platformlar 
                  oluşturmada uzmanlaşıyorum.
                </p>
                
                <p>
                  Teknik mükemmelliği yaratıcı vizyonla birleştiren bir profesyonel olarak, fikirlerinizi hayata 
                  geçirmek için sabırsızlanıyorum.
                </p>
              </div>
            </motion.div>

            {/* Expertise Areas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold">Çalıştığım Sektörler ve Projeler</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Accounting & Data Applications */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">Muhasebe ve Veri Uygulamaları</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    11 proje için detaylı gelir-gider raporları hazırladım, cari hesap güncellemelerini otomatikleştirdim, 
                    maliyet ve verimlilik analizi panoları oluşturdum.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Finansal dashboard geliştirme</li>
                    <li>• Otomatik raporlama sistemleri</li>
                    <li>• Veri görselleştirme çözümleri</li>
                  </ul>
                </div>

                {/* E-commerce Solutions */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">E-ticaret Çözümleri</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    4 farklı proje için satış, pazar yeri sipariş entegrasyonları ve sanal POS sistemlerini yeniden tasarladım. 
                    2 e-ticaret sitesini sıfırdan başlatıp canlıya aldım.
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Ödeme sistemi entegrasyonları</li>
                    <li>• Envanter yönetim sistemleri</li>
                    <li>• Müşteri sadakat programları</li>
                  </ul>
                </div>

                {/* Corporate Websites */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 md:col-span-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">Kurumsal ve Pazarlama Siteleri</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Portfolio, blog ve kurumsal siteler için etkileyici bir dijital varlık oluşturmak temel hedefim. 
                    Marka kimliğinizi en iyi yansıtan modern temalar ve özel tasarımlar ile unutulmaz siteler tasarlıyorum.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div>• Özel marka tasarımları</div>
                    <div>• SEO optimizasyonu</div>
                    <div>• Performans odaklı geliştirme</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-bold">Teknik Yetenekler</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Frontend */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold">Frontend</h4>
                  </div>
                  <div className="space-y-2">
                    {SKILLS.frontend.map((skill) => {
                      const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Code2;
                      const iconColor = skillColors[skill.name as keyof typeof skillColors] || '#3B82F6';
                      
                      return (
                        <div key={skill.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <IconComponent 
                            className="w-4 h-4" 
                            style={{ color: iconColor }}
                          />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Backend */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <Server className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold">Backend & Database</h4>
                  </div>
                  <div className="space-y-2">
                    {SKILLS.backend.map((skill) => {
                      const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Server;
                      const iconColor = skillColors[skill.name as keyof typeof skillColors] || '#10B981';
                      
                      return (
                        <div key={skill.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <IconComponent 
                            className="w-4 h-4" 
                            style={{ color: iconColor }}
                          />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DevOps */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <Cloud className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold">DevOps & Cloud</h4>
                  </div>
                  <div className="space-y-2">
                    {SKILLS.cloud.map((skill) => {
                      const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Cloud;
                      const iconColor = skillColors[skill.name as keyof typeof skillColors] || '#8B5CF6';
                      
                      return (
                        <div key={skill.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <IconComponent 
                            className="w-4 h-4" 
                            style={{ color: iconColor }}
                          />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Expertise Levels */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark rounded-2xl p-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-8 text-center">Uzmanlık Seviyeleri</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { 
                      percentage: 95, 
                      title: "Full-Stack Development", 
                      color: "from-green-400 to-emerald-500",
                      description: "React, Next.js, Node.js, TypeScript ile modern web uygulamaları"
                    },
                    { 
                      percentage: 90, 
                      title: "Frontend Architecture", 
                      color: "from-blue-400 to-blue-600",
                      description: "Component tasarımı, state management, performans optimizasyonu"
                    },
                    { 
                      percentage: 85, 
                      title: "Backend & API Development", 
                      color: "from-purple-400 to-purple-600",
                      description: "RESTful API, GraphQL, veritabanı tasarımı ve optimizasyonu"
                    },
                    { 
                      percentage: 88, 
                      title: "DevOps & Deployment", 
                      color: "from-cyan-400 to-teal-500",
                      description: "Docker, AWS, CI/CD pipeline kurulumu ve yönetimi"
                    }
                  ].map((skill, index) => (
                    <motion.div 
                      key={skill.title}
                      className="mb-6"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold">{skill.title}</h4>
                        <span className={`text-lg font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                          {skill.percentage}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-slate-700 rounded-full mb-2">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 1 }}
                        />
                      </div>
                      
                      <p className="text-xs text-slate-400">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 sticky top-32 self-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-lg font-semibold mb-4">İletişim Bilgileri</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">E-posta</div>
                    <a href="mailto:barismercan53@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
                      barismercan53@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Telefon</div>
                    <a href="tel:+905435535310" className="text-sm text-muted-foreground hover:text-primary">
                      +90 543 553 5310
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Lokasyon</div>
                    <div className="text-sm text-muted-foreground">İstanbul, Türkiye</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-lg font-semibold mb-4">İstatistikler</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-sm">Tamamlanan Proje</span>
                  </div>
                  <span className="font-bold text-orange-600">40+</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <span className="text-sm">Mutlu Müşteri</span>
                  </div>
                  <span className="font-bold text-green-600">30+</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Çalışma Saati</span>
                  </div>
                  <span className="font-bold text-blue-600">1,400+</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="text-sm">Deneyim</span>
                  </div>
                  <span className="font-bold text-purple-600">5+ Yıl</span>
                </div>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2 text-green-800">Müsaitlik Durumu</h4>
                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Yeni projeler için müsait
                </div>
                
                <div className="space-y-2 text-xs text-green-700">
                  <div className="flex justify-between">
                    <span>Yanıt Süresi:</span>
                    <span className="font-semibold">24 saat</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Proje Kapasitesi:</span>
                    <span className="font-semibold">1/3 dolu</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Qualities */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-lg font-semibold mb-4">Çalışma Prensipleri</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Müşteri Odaklı</div>
                    <div className="text-xs text-muted-foreground">Her projede %95 memnuniyet</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Zamanında Teslimat</div>
                    <div className="text-xs text-muted-foreground">%100 süre uyumu</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Güvenilir İş Ortağı</div>
                    <div className="text-xs text-muted-foreground">Uzun vadeli ilişkiler</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Kalite Tutkusu</div>
                    <div className="text-xs text-muted-foreground">Her detaya özen</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white text-center"
            >
              <h4 className="text-lg font-semibold mb-3">Birlikte Çalışalım!</h4>
              <p className="text-sm opacity-90 mb-4">
                Projenizi bir üst seviyeye taşımak için hemen iletişime geçin
              </p>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/#contact">
                  <Target className="w-4 h-4 mr-2" />
                  Proje Başlat
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}