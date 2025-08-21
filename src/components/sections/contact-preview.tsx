"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Mail, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';

export function ContactPreviewSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
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

            {/* Contact Methods */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">E-posta</div>
                  <div className="text-muted-foreground">baris@example.com</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Telefon</div>
                  <div className="text-muted-foreground">+90 555 123 4567</div>
                </div>
              </div>
            </div>

            {/* Response Promise */}
            <div className="flex items-center space-x-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-semibold text-green-800">24 saat içinde yanıt garantisi</div>
                <div className="text-green-600">Tüm mesajlarınıza hızlı dönüş sağlıyorum</div>
              </div>
            </div>

            <Button size="lg" asChild className="group">
              <Link href="/contact">
                İletişim Formunu Doldur
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Right Content - Form Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Hızlı İletişim</h3>
                  <p className="text-muted-foreground">Projenizi kısaca anlatın, size geri dönelim</p>
                </div>

                <div className="space-y-4">
                  {/* Form Fields Preview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Ad Soyad</label>
                      <div className="mt-1 h-10 bg-gray-100 rounded-md border border-gray-200" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">E-posta</label>
                      <div className="mt-1 h-10 bg-gray-100 rounded-md border border-gray-200" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                    <div className="mt-1 h-10 bg-gray-100 rounded-md border border-gray-200" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bütçe Aralığı</label>
                    <div className="mt-1 h-10 bg-gray-100 rounded-md border border-gray-200 flex items-center px-3">
                      <span className="text-muted-foreground text-sm">Bütçe aralığınızı seçin</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Proje Detayları</label>
                    <div className="mt-1 h-24 bg-gray-100 rounded-md border border-gray-200 p-3">
                      <div className="text-muted-foreground text-sm">
                        Projenizle ilgili detayları paylaşın... (Ne tür bir proje, hangi özellikler, hedef kitle, zaman çerçevesi vs.)
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" disabled>
                    <Clock className="w-4 h-4 mr-2" />
                    Formunuzu aldıktan sonra 24 saat içinde size geri döneceğim
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Not:</strong> Formunuzu aldıktan sonra size geri döneceğim
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}