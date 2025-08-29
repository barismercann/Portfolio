"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { SERVICES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Code, Crown, Headphones, RefreshCw, Rocket, Search, Triangle, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(1);
  
  const iconMap = {
    'technical-consulting': Crown,
    'custom-development': Rocket,
    'devops-deployment': Zap,
    'project-updates': RefreshCw, 
  };

  const processIcons = [Search, Triangle, Code, Rocket, Headphones];

  // Mobile navigation handlers
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === SERVICES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? SERVICES.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="services" className="px-4 md:px-12 lg:px-24 py-20 bg-gradient-to-b from-white to-slate-50">
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

        {/* Desktop Services Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
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
                      <Link href="/#contact">
                        Teklif Al
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Services Carousel - Only visible on mobile */}
        <div className="md:hidden mb-16">
          <div className="relative">
            {/* Main Service Card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              {(() => {
                const service = SERVICES[currentIndex];
                const Icon = iconMap[service.id as keyof typeof iconMap];
                
                return (
                  <div className="relative">
                    {service.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                        <Badge variant="success" className="px-3 py-1 text-xs shadow-lg">
                          En Popüler
                        </Badge>
                      </div>
                    )}
                    
                    <Card className={`relative overflow-hidden shadow-xl ${
                      service.popular 
                        ? 'border-2 border-green-200 bg-gradient-to-br from-green-50 to-white' 
                        : 'border-2 border-gray-200 bg-white'
                    }`}>
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full blur-2xl" />
                      </div>
                      
                      <CardHeader className="text-center pb-4 relative z-10">
                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                          service.popular ? 'bg-green-100' : 'bg-primary/10'
                        }`}>
                          <Icon className={`w-10 h-10 ${service.popular ? 'text-green-600' : 'text-primary'}`} />
                        </div>
                        <CardTitle className="text-2xl mb-3 text-gray-800">{service.title}</CardTitle>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                        <div className="text-3xl font-bold text-primary mb-4">{service.price}</div>
                      </CardHeader>
                      
                      <CardContent className="pt-0 relative z-10">
                        <ul className="space-y-4 mb-6">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-start space-x-3">
                              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1 flex-shrink-0">
                                <Check className="w-3 h-3 text-green-600" />
                              </div>
                              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          className="w-full py-3 text-base font-semibold" 
                          variant={service.popular ? "default" : "outline"}
                          asChild
                        >
                          <Link href="/#contact">
                            Teklif Al
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                );
              })()}
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevious}
                className="h-10 w-10 p-0 rounded-full shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={goToNext}
                className="h-10 w-10 p-0 rounded-full shadow-md"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2">
              {SERVICES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex 
                      ? 'bg-primary w-8 h-3 shadow-md' 
                      : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                  }`}
                  aria-label={`${SERVICES[index].title} hizmetine git`}
                />
              ))}
            </div>

            {/* Side Preview Cards */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 z-10 hidden sm:block">
              {SERVICES[(currentIndex - 1 + SERVICES.length) % SERVICES.length] && (
                <div className="w-16 h-20 bg-white rounded-lg shadow-lg border-2 border-gray-200 opacity-60 transform -rotate-12 hover:opacity-80 transition-opacity cursor-pointer"
                     onClick={goToPrevious}>
                  <div className="p-2 h-full flex flex-col items-center justify-center">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                      {(() => {
                        const prevService = SERVICES[(currentIndex - 1 + SERVICES.length) % SERVICES.length];
                        const PrevIcon = iconMap[prevService.id as keyof typeof iconMap];
                        return <PrevIcon className="w-3 h-3 text-primary" />;
                      })()}
                    </div>
                    <div className="text-xs text-center text-gray-600 leading-tight">
                      {SERVICES[(currentIndex - 1 + SERVICES.length) % SERVICES.length].title.slice(0, 20)}...
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 z-10 hidden sm:block">
              {SERVICES[(currentIndex + 1) % SERVICES.length] && (
                <div className="w-16 h-20 bg-white rounded-lg shadow-lg border-2 border-gray-200 opacity-60 transform rotate-12 hover:opacity-80 transition-opacity cursor-pointer"
                     onClick={goToNext}>
                  <div className="p-2 h-full flex flex-col items-center justify-center">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                      {(() => {
                        const nextService = SERVICES[(currentIndex + 1) % SERVICES.length];
                        const NextIcon = iconMap[nextService.id as keyof typeof iconMap];
                        return <NextIcon className="w-3 h-3 text-primary" />;
                      })()}
                    </div>
                    <div className="text-xs text-center text-gray-600 leading-tight">
                      {SERVICES[(currentIndex + 1) % SERVICES.length].title.slice(0, 20)}...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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
          
          {/* Desktop Timeline */}
          <div className="hidden md:grid md:grid-cols-5 gap-4">
            {[
              { title: "Keşif & Planlama", time: "3-4 gün", desc: "Gereksinim analizi, teknik planlama" },
              { title: "Tasarım & Mimari", time: "1-2 hafta", desc: "Sistem mimarisi, veritabanı tasarımı" },
              { title: "Geliştirme & Test", time: "4-12 hafta", desc: "Yazılım geliştirme" },
              { title: "Deployment & Yayın", time: "1 hafta", desc: "Canlıya alma ve optimizasyon" },
              { title: "Bakım & Destek", time: "Sürekli", desc: "Bug fixes, özellik güncellemeleri" },
            ].map((step, index) => {
              const Icon = processIcons[index];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center relative"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-xs text-primary font-medium mb-2">{step.time}</p>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                  
                  {index < 4 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-primary/20 -z-10" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Timeline - Vertical */}
          <div className="md:hidden space-y-6">
            {[
              { title: "Keşif & Planlama", time: "3-4 gün", desc: "Gereksinim analizi, teknik planlama" },
              { title: "Tasarım & Mimari", time: "1-2 hafta", desc: "Sistem mimarisi, veritabanı tasarımı" },
              { title: "Geliştirme & Test", time: "4-12 hafta", desc: "Yazılım geliştirme" },
              { title: "Deployment & Yayın", time: "1 hafta", desc: "Canlıya alma ve optimizasyon" },
              { title: "Bakım & Destek", time: "Sürekli", desc: "Bug fixes, özellik güncellemeleri" },
            ].map((step, index) => {
              const Icon = processIcons[index];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 relative"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-xs text-primary font-medium mb-1">{step.time}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                  
                  {index < 4 && (
                    <div className="absolute left-6 top-12 w-0.5 h-6 bg-primary/20" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}