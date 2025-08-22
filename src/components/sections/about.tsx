"use client";

import { Badge } from '@/components/ui';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  Cloud,
  Code2,
  Container,
  Database,
  GitBranch,
  Globe,
  Server,
  Settings
} from 'lucide-react';

// Skill icons mapping
const skillIcons = {
  'React': Globe,
  'Next.js': Code2,
  'TypeScript': Code2,
  'Tailwind CSS': Settings,
  'GSAP': Settings,
  'Node.js': Server,
  'Express': Server,
  'PostgreSQL': Database,
  'MongoDB': Database,
  'Prisma': Database,
  'GraphQL': Database,
  'AWS': Cloud,
  'Docker': Container,
  'Vercel': Cloud,
  'CI/CD': GitBranch
};

export function AboutSection() {
  return (
    <section id="about" className="px-24 py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="gradient" className="mb-4 px-4 py-2">
            <Code2 className="w-5 h-5 mr-2" />
            <p className='text-base'>Teknoloji Uzmanlığı</p>
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
            className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:scale-110 transition-transform duration-300 cursor-pointer"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Frontend Mastery</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.frontend.map((skill) => {
                const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Code2;
                return (
                  <div key={skill.name} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <IconComponent className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Backend Sorcery */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Server className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Backend Sorcery</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.backend.map((skill) => {
                const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Server;
                return (
                  <div key={skill.name} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                    <IconComponent className="w-5 h-5 text-green-600 mr-3" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Cloud Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Cloud className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Cloud Architecture</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.cloud.map((skill) => {
                const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Cloud;
                return (
                  <div key={skill.name} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors">
                    <IconComponent className="w-5 h-5 text-purple-600 mr-3" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                );
              })}
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