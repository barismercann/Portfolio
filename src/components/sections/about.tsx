"use client";

import { Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  CheckCircle,
  Clock,
  Code2,
  Globe,
  Heart,
  Shield,
  Star,
  Target,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';

export function AboutSection() {
  return (
    <section id="about" className="px-4 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <Badge variant="gradient" className="mb-4 px-4 py-2">
            <Shield className="w-5 h-5 mr-2" />
            <p className="text-base">Profesyonel Yaklaşım</p>
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Projelerinizi Bir Sonraki <span className="text-primary">Seviyeye</span> Taşımaya Hazır mısınız?
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Markanızın öne çıkmasına ve müşteri memnuniyetini en üst düzeye çıkarmasına yardımcı olmak için 
            modern ve sezgisel web deneyimleri tasarlayan, deneyimli bir freelance geliştirici.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Deneyim ve Uzmanlık</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">5 yıllık</strong> frontend ve web geliştirme deneyimi, 
                <strong className="text-foreground"> 1,400+ saat</strong> çalışma süresi ve 
                <strong className="text-foreground"> 40+ tamamlanmış proje</strong> ile müşterilerimin hedeflerini 
                aşmayı ve hedef kitlelerinin beklentilerini karşılamayı seviyorum.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg mb-6">
                <p className="text-sm text-blue-800 italic">
                  &apos;Uzmanlığım sadece web siteleriyle sınırlı değil; aynı zamanda kullanıcı dostu web uygulamaları, 
                  interaktif panolar ve dönüşümleri artıran, marka değerini yükselten veri açısından zengin platformlar oluşturmada uzmanlaşıyorum.&apos;
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Modern Teknolojiler</h4>
                  <p className="text-sm text-muted-foreground">Next.js, React, TypeScript ile en güncel çözümler</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Zamanında Teslimat</h4>
                  <p className="text-sm text-muted-foreground">Belirlenen sürelere %100 uyum</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Müşteri Odaklı</h4>
                  <p className="text-sm text-muted-foreground">Her projede %95 müşteri memnuniyeti</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Güvenilir İş Ortağı</h4>
                  <p className="text-sm text-muted-foreground">Uzun vadeli ilişkiler kuruyorum</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Stats & Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">40+</div>
                <div className="text-sm text-gray-600">Başarılı Proje</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">30+</div>
                <div className="text-sm text-gray-600">Mutlu Müşteri</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">1400+</div>
                <div className="text-sm text-gray-600">Çalışma Saati</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">5+</div>
                <div className="text-sm text-gray-600">Yıl Deneyim</div>
              </div>
            </div>

            {/* Expertise Areas */}
            <div className="bg-gradient-to-br from-primary/10 to-blue-100 p-6 rounded-2xl">
              <h4 className="text-xl font-bold mb-4 text-center">Uzmanlık Alanlarım</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Web Uygulamaları</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Kurumsal Çözümler</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">E-ticaret Platformları</span>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-12">Çalıştığım Sektörler ve Projeler</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Accounting & Data Applications */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
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
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
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
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold mb-3">Kurumsal ve Pazarlama Siteleri</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Portfolio, blog ve kurumsal siteler için etkileyici bir dijital varlık oluşturmak temel hedefim. 
                Marka kimliğinizi en iyi yansıtan modern temalar ve özel tasarımlar.
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Özel marka tasarımları</li>
                <li>• SEO optimizasyonu</li>
                <li>• Performans odaklı geliştirme</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Fikirleriniz aylardır hayalinizde mi? Hadi onları gerçeğe dönüştürelim!
          </h3>
          <p className="text-lg lg:text-xl mb-8 opacity-90">
            En doğru zamanda, en doğru yerdesiniz. Projenizi birlikte başlatalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                <Target className="w-5 h-5 mr-2" />
                Proje Başlat
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-dark border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/portfolio">
                Çalışmalarımı İncele
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}