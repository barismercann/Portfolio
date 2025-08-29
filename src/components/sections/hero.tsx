"use client";

import { Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Code2, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TypewriterCode from '../animations/typewriterCode';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 sm:px-24">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-20 pb-32">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            {/* Elite Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
              <Badge variant="success" className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Hayallerini Geleceğe Taşı</span>
              </Badge>
            </motion.div>

            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold"
              >
                <span className="text-foreground">Barış</span>{' '}
                <span className="text-primary">Mercan</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-muted-foreground">
                  Kod <span className="text-purple-600 font-semibold">Mimarı</span>
                </h2>
              </motion.div>
            </div>

            Description
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Yarının dijital gerçekliğini bugünden inşa eden full-stack geliştirici. En son teknolojilerde uzmanlaşmış, karmaşık problemler için imkansız çözümler üretiyorum.
            </motion.p>

            {/* Stats - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8"
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-lightBlue">20+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Tamamlanan Proje</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple">30+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">5+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Yıl Tecrübe</div>
              </div>
            </motion.div>

            {/* CTA Buttons - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="xl" asChild className="group w-full sm:w-auto">
                <Link href="/#contact">
                  Proje Başlat
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/portfolio">
                  Projelerimi Keşfet
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Mobile Optimized 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center h-[500px] lg:h-[600px]"
          >
            {/* Main Image Container - Mobile Adjusted */}
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-[var(--dark-background-color)] to-gray-800 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/hero.webp"
                width={400}
                height={400}
                alt=""
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* Floating Icons - Mobile Responsive Positions */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-20 sm:top-44 left-0 sm:left-2 bg-blue-500 p-2 sm:p-3 rounded-full shadow-lg"
            >
              <Code2 className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-12 sm:bottom-20 left-8 sm:left-14 bg-green-500 p-2 sm:p-3 rounded-full shadow-lg"
            >
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-4 sm:bottom-10 right-8 sm:right-14 bg-purple-500 p-2 sm:p-3 rounded-full shadow-lg"
            >
              <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-8 sm:top-16 right-8 sm:right-16 bg-orange-500 p-2 sm:p-3 rounded-full shadow-lg"
            >
              <BarChart3 className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
            </motion.div>

            {/* TypewriterCode - Mobile Hidden/Adjusted */}
            <div className="absolute -bottom-8 sm:-bottom-14 left-4 sm:left-12 transform hidden sm:block">
              <TypewriterCode />
            </div>

            {/* Mobile Alternative - Simple Badge */}
            <div className="absolute -bottom-4 left-4 transform block sm:hidden">
              <div className="bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-slate-600">
                <div className="text-xs font-mono text-green-400">const dev = &apos;expert&apos;;</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}