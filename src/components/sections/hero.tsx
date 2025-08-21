"use client";

import { Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CheckCircle, Code2, Sparkles, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TypewriterCode from '../animations/typewriterCode';

export function HeroSection() {
  return (
    <section className="px-20 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-20 pb-32">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Elite Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
                className="text-5xl lg:text-7xl font-bold"
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
                <h2 className="text-2xl lg:text-3xl font-light text-muted-foreground">
                  The <span className="text-purple-600 font-semibold">Code Architect</span>
                </h2>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Yarının dijital gerçekliğini bugünden inşa eden full-stack geliştirici. En son teknolojilerde uzmanlaşmış, karmaşık problemler için imkansız çözümler üretiyorum.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 py-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-lightBlue">20+</div>
                <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple">30+</div>
                <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Yıl Tecrübe</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="xl" asChild className="group">
                <Link href="/contact">
                  Elite&apos;yi İşe Al
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link
                  href="/portfolio" >
                  Projelerimi Keşfet
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Visual */}
          <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          {/* Main Image Container */}
          <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl bg-gradient-to-br from-[var(--dark-background-color)] to-gray-800 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              src={"/images/hero.webp"}
              width={400}
              height={400}
              alt=''
              className='w-full h-full object-cover rounded-3xl'
            />
          </div>

          {/* Floating Içons - Görsele daha yakın konumlandırıldı */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-44 left-2 bg-blue-500 p-3 rounded-full shadow-lg"
          >
            <Code2 className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 left-14 bg-green-500 p-3 rounded-full shadow-lg"
          >
            <Star className="w-8 h-8 text-white" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute bottom-10 right-14 bg-purple-500 p-3 rounded-full shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-16 right-16 bg-orange-500 p-3 rounded-full shadow-lg"
            >
              <BarChart3 className="w-10 h-10 text-white" />
            </motion.div>

            <div className="absolute -bottom-14 left-12 transform">
              <TypewriterCode />
            </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}