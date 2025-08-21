"use client";

import { Badge, Button } from '@/components/ui';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code2, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
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
                <span>Elite Developer Certified</span>
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
              className="text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              Yarının dijital gerçekliğini bugünden inşa eden elit full-stack geliştirici. 
              En son teknolojilerde uzmanlaşmış, karmaşık problemler için imkansız 
              çözümler üretiyorum.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 py-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">40+</div>
                <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8+</div>
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
                  Elite'yi İşe Al
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/portfolio">
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
            <div className="relative w-full max-w-lg">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse-slow" />
              
              {/* Main Visual */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
                {/* Code Editor Mockup */}
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center space-x-2 pb-4 border-b border-slate-600">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-sm text-slate-400 ml-4">// Expertise in action</div>
                  </div>

                  {/* Code Lines */}
                  <div className="space-y-3 font-mono text-sm">
                    <div className="text-slate-400">
                      <span className="text-blue-400">const</span>{' '}
                      <span className="text-green-400">developer</span> = {'{'}
                    </div>
                    <div className="text-slate-400 pl-4">
                      <span className="text-purple-400">name:</span>{' '}
                      <span className="text-yellow-400">'Barış Mercan'</span>,
                    </div>
                    <div className="text-slate-400 pl-4">
                      <span className="text-purple-400">skills:</span> [
                    </div>
                    <div className="text-slate-400 pl-8">
                      <span className="text-yellow-400">'React'</span>,{' '}
                      <span className="text-yellow-400">'Next.js'</span>,
                    </div>
                    <div className="text-slate-400 pl-8">
                      <span className="text-yellow-400">'TypeScript'</span>,{' '}
                      <span className="text-yellow-400">'Node.js'</span>
                    </div>
                    <div className="text-slate-400 pl-4">],</div>
                    <div className="text-slate-400 pl-4">
                      <span className="text-purple-400">experience:</span>{' '}
                      <span className="text-blue-400">8</span>,
                    </div>
                    <div className="text-slate-400 pl-4">
                      <span className="text-purple-400">passion:</span>{' '}
                      <span className="text-yellow-400">'Unlimited'</span>
                    </div>
                    <div className="text-slate-400">{'}'}</div>
                  </div>
                </div>

                {/* Floating AI Badge */}
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
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>AI</span>
                </motion.div>
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 left-8 bg-blue-500 p-3 rounded-xl shadow-lg"
              >
                <Code2 className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-8 -left-8 bg-green-500 p-3 rounded-xl shadow-lg"
              >
                <Star className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-4 right-8 bg-purple-500 p-3 rounded-xl shadow-lg"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}