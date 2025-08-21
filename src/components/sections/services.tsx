"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { SERVICES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Crown, Rocket, Zap } from 'lucide-react';
import Link from 'next/link';

export function ServicesSection() {
  const iconMap = {
    'custom-development': Rocket,
    'technical-consulting': Crown,
    'devops-deployment': Zap,
  };

  return (
    <section id="services" className="px-30 py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <Crown className="w-4 h-4 mr-2" />
            Profesyonel Hizmetler
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            İşinizi Nasıl <span className="text-primary">Dönüştürürüm</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Teknoloji ile iş hedeflerinizi gerçeğe dönüştüren özelleştirilmiş çözümler sunuyorum
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.id as keyof typeof iconMap];
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge variant="success" className="px-4 py-1">
                      En Popüler
                    </Badge>
                  </div>
                )}
                
                <Card className={`relative overflow-hidden h-full transition-all duration-300 hover:shadow-xl ${
                  service.popular 
                    ? 'border-2 border-green-200 shadow-lg bg-gradient-to-b from-green-50 to-white' 
                    : 'border hover:border-primary/20'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                      service.popular ? 'bg-green-100' : 'bg-primary/10'
                    }`}>
                      <Icon className={`w-8 h-8 ${service.popular ? 'text-green-600' : 'text-primary'}`} />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={service.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/contact">
                        {service.popular ? "Danışmanlık Rezerve Et" : "Teklif Al"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Geliştirme Sürecim</h3>
          <p className="text-center text-muted-foreground mb-12">Başarılı sonuçlar için kanıtlanmış metodoloji</p>
          
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { title: "Keşif & Planlama", time: "1-2 hafta", desc: "Gereksinim analizi, teknik planlama" },
              { title: "Tasarım & Mimari", time: "1 hafta", desc: "Sistem mimarisi, veritabanı tasarımı" },
              { title: "Geliştirme & Test", time: "4-12 hafta", desc: "Agile geliştirme, sürekli test" },
              { title: "Deployment & Yayın", time: "1 hafta", desc: "Prodüksiyon deployment, optimizasyon" },
              { title: "Bakım & Destek", time: "Sürekli", desc: "Bug fixes, özellik güncellemeleri" },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-xs text-primary font-medium mb-2">{step.time}</p>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
                
                {index < 4 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-primary/20 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Projenizi Başlatmaya Hazır mısınız?</h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Proje bilgilerinizi paylaşın, size en uygun çözümü önerelim ve kısa sürede geri dönüş yapalım.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                <Rocket className="w-5 h-5 mr-2" />
                Projeyi Başlat
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/portfolio">
                Geçmiş Çalışmalarım
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}