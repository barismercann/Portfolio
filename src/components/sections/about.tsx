"use client";

import { Badge, Progress } from '@/components/ui';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Teknoloji Uzmanlığı
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Tam Yığın <span className="text-primary">Hakimiyeti</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Modern web teknolojilerinde derin uzmanlık ile karmaşık projeleri hayata geçiriyorum
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Frontend Mastery */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <div className="w-6 h-6 bg-blue-500 rounded" />
              </div>
              <h3 className="text-xl font-semibold">Frontend Mastery</h3>
            </div>
            
            <div className="space-y-4">
              {SKILLS.frontend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Sorcery */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <div className="w-6 h-6 bg-green-500 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold">Backend Sorcery</h3>
            </div>
            
            <div className="space-y-4">
              {SKILLS.backend.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cloud Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <div className="w-6 h-6 bg-purple-500 rounded-lg" />
              </div>
              <h3 className="text-xl font-semibold">Cloud Architecture</h3>
            </div>
            
            <div className="space-y-4">
              {SKILLS.cloud.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Expertise Levels */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-900 rounded-3xl p-8 lg:p-12 text-white"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Uzmanlık Seviyeleri</h3>
          <p className="text-center text-slate-300 mb-8">Her alanda kanıtlanmış deneyim ve derin bilgi</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-sm text-slate-300">Full-Stack Development</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
              <div className="text-sm text-slate-300">AI/ML Integration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
              <div className="text-sm text-slate-300">Cloud Architecture</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">88%</div>
              <div className="text-sm text-slate-300">DevOps Excellence</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}