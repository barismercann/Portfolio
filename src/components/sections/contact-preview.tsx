"use client";

import { Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { Clock, Github, Linkedin, Mail, MapPin, MessageCircle, Phone, Rocket, Twitter, Users, Zap } from 'lucide-react';
import { ProjectStartForm } from '../forms/project-start-form';

export function ContactPreviewSection() {
  return (
    <section id="contact" className="px-4 lg:px-24 py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Project Start Form - Now Dark Theme */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-dark rounded-3xl p-6 lg:p-8 text-white shadow-2xl"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              Proje Başlat
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">Projenizi Hayata Geçirelim</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Proje bilgilerinizi paylaşın, size özel çözüm önerisi hazırlayalım ve kısa sürede başlayalım.
            </p>
          </div>

          
          <div className="max-w-4xl mx-auto">
            <ProjectStartForm />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Content - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <Badge variant="secondary" className="mb-4">
                <MessageCircle className="w-4 h-4 mr-2" />
                İletişime Geçin
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Haydi <span className="text-primary">Konuşalım</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Projeniz hakkında konuşmak, teknik danışmanlık almak veya sadece 
                merhaba demek için benimle iletişime geçebilirsiniz.
              </p>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">E-posta</div>
                  <a 
                    href="mailto:barismercan53@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    barismercan53@gmail.com
                  </a>
                  <p className="text-xs text-gray-500 mt-1">En hızlı iletişim yolu</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Telefon</div>
                  <a 
                    href="tel:+905435535310"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +90 543 553 5310
                  </a>
                  <p className="text-xs text-gray-500 mt-1">Acil durumlar için</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Lokasyon</div>
                  <div className="text-muted-foreground">İstanbul, Türkiye</div>
                  <p className="text-xs text-gray-500 mt-1">GMT+3 saat dilimi</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Hızlı Toplantı</div>
                  <a 
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Meet ile Hızlı Görüşme Ayarla
                  </a>
                  <p className="text-xs text-gray-500 mt-1">15-30 dk ücretsiz görüşme</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="font-semibold mb-4 text-gray-900">Sosyal Medya & Portföy</div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild className="hover:bg-gray-900 hover:text-white transition-colors">
                  <a href="https://github.com/barismercann" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="hover:bg-blue-600 hover:text-white transition-colors">
                  <a href="https://www.linkedin.com/in/bar%C4%B1%C5%9F-mercan-28786b27a/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="hover:bg-blue-400 hover:text-white transition-colors">
                  <a href="https://x.com/Barismercan_" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Availability Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Availability Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Müsaitlik Durumu</h3>
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    Yeni projeler için müsait
                  </div>
                </div>

                <div className="space-y-3 text-left text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Yanıt Süresi
                    </span>
                    <span className="font-semibold text-green-600">24 saat içinde</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-muted-foreground">Çalışma Saatleri</span>
                    <span className="font-semibold">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Proje Kapasitesi
                    </span>
                    <span className="font-semibold text-orange-500">1/3 dolu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">✨ Neden Benimle Çalışmalısınız?</h4>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  İlk 30 dakika ücretsiz danışmanlık
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  7/24 WhatsApp desteği
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  Modern teknolojiler ve best practices
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                  Teslim sonrası 3 ay ücretsiz destek
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}