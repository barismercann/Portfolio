"use client";

import { Badge } from '@/components/ui';
import { SKILLS } from '@/lib/constants';
import { motion } from 'framer-motion';
import {
  Cloud,
  Code2,
  Globe,
  Server
} from 'lucide-react';

// React Icons import (install: npm install react-icons)
import {
  SiAmazonwebservices,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiGreensock,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel
} from 'react-icons/si';

// Gerçek teknoloji logoları mapping
const skillIcons = {
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'TypeScript': SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Redux': SiRedux,
  'GSAP': SiGreensock,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'PostgreSQL': SiPostgresql,
  'MongoDB': SiMongodb,
  'Prisma': SiPrisma,
  'GraphQL': SiGraphql,
  'AWS': SiAmazonwebservices,
  'Docker': SiDocker,
  'Vercel': SiVercel,
  'CI/CD': SiGithubactions,
  'Git': SiGit
};

// Her teknoloji için özel renk tanımları
const skillColors = {
  'React': '#61DAFB',
  'Next.js': '#000000',
  'TypeScript': '#3178C6',
  'Tailwind CSS': '#06B6D4',
  'Redux': '#764ABC',
  'GSAP': '#88CE02',
  'Node.js': '#339933',
  'Express': '#000000',
  'PostgreSQL': '#336791',
  'MongoDB': '#47A248',
  'Prisma': '#2D3748',
  'GraphQL': '#E10098',
  'AWS': '#FF9900',
  'Docker': '#2496ED',
  'Vercel': '#000000',
  'CI/CD': '#2088FF',
  'Git': '#F05032'
};

// Container animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

// Card animasyon varyantları
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Skill item animasyon varyantları
// const skillItemVariants = {
//   hidden: { opacity: 0, x: -20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut"
//     }
//   },
//   hover: {
//     scale: 1.02,
//     x: 5,
//     transition: {
//       duration: 0.2,
//       ease: "easeOut"
//     }
//   }
// };

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
            <Code2 className="w-5 h-5 mr-2" />
            <p className='text-base'>Teknoloji Uzmanlığı</p>
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Tam Yığın <span className="text-primary">Hakimiyeti</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Modern web teknolojilerinde ile SaaS, B2B/B2C, e-ticaretve kurumsal projeler geliştiriyorum
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Frontend Development */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 cursor-pointer relative group"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
            
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Globe className="w-6 h-6 text-blue-600" />
              </motion.div>
              <h3 className="text-xl font-semibold">Frontend Development</h3>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {SKILLS.frontend.map((skill, index) => {
                const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Code2;
                const iconColor = skillColors[skill.name as keyof typeof skillColors] || '#3B82F6';
                
                return (
                  <motion.div 
                    key={skill.name} 
                    whileHover="hover"
                    custom={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300 group"
                  >
                    <motion.div
                      className="mr-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{ color: iconColor }}
                      />
                    </motion.div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Backend & Database */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 cursor-pointer relative group"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
            
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Server className="w-6 h-6 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-semibold">Backend & Database</h3>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {SKILLS.backend.map((skill, index) => {
                const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Server;
                const iconColor = skillColors[skill.name as keyof typeof skillColors] || '#10B981';
                
                return (
                  <motion.div 
                    key={skill.name} 
                    whileHover="hover"
                    custom={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300"
                  >
                    <motion.div
                      className="mr-3"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{ color: iconColor }}
                      />
                    </motion.div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* DevOps & Deployment */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 cursor-pointer relative group"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
            
            <div className="flex items-center mb-6">
              <motion.div 
                className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Cloud className="w-6 h-6 text-purple-600" />
              </motion.div>
              <h3 className="text-xl font-semibold">DevOps & Deployment</h3>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {SKILLS.cloud.map((skill, index) => {
                const IconComponent = skillIcons[skill.name as keyof typeof skillIcons] || Cloud;
                const iconColor = skillColors[skill.name as keyof typeof skillColors] || '#8B5CF6';
                
                return (
                  <motion.div 
                    key={skill.name} 
                    whileHover="hover"
                    custom={index}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-300"
                  >
                    <motion.div
                      className="mr-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{ color: iconColor }}
                      />
                    </motion.div>
                    <span className="text-sm font-medium">{skill.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Expertise Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="mt-16 bg-slate-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          </div>
          
          <div className="relative z-10">
            <motion.h3 
              className="text-2xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Uzmanlık Alanları
            </motion.h3>
            <motion.p 
              className="text-center text-slate-300 mb-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Proje gereksinimlerine göre modern teknolojiler ile çözüm üretiyorum
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  percentage: 90, 
                  title: "Full-Stack Development", 
                  color: "from-green-400 to-emerald-500",
                  bgColor: "bg-green-400/20",
                  description: "React, Next.js, Node.js, TypeScript, Tailwind CSS, GSAP"
                },
                { 
                  percentage: 84, 
                  title: "Architecture & Design", 
                  color: "from-purple-400 to-purple-600",
                  bgColor: "bg-purple-400/20",
                  description: "DDD, RESTful API, Microservices, System Design"
                },
                { 
                  percentage: 86, 
                  title: "Database & Backend", 
                  color: "from-blue-400 to-blue-600",
                  bgColor: "bg-blue-400/20",
                  description: "MongoDB, PostgreSQL, Prisma, Express.js"
                },
                { 
                  percentage: 89, 
                  title: "DevOps & Deployment", 
                  color: "from-cyan-400 to-teal-500",
                  bgColor: "bg-cyan-400/20",
                  description: "Docker, AWS, Vercel, CI/CD Pipeline"
                },
              ].map((skill, index) => (
                <motion.div 
                  key={skill.title}
                  className="mb-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.3 + index * 0.1, 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-3">
                    <motion.h4 
                      className="text-lg font-semibold text-white"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    >
                      {skill.title}
                    </motion.h4>
                    <motion.span 
                      className={`text-xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 150
                      }}
                    >
                      {skill.percentage}%
                    </motion.span>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="relative">
                    {/* Background Bar */}
                    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                      {/* Animated Progress Bar */}
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                        initial={{ width: "0%" }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.7 + index * 0.1,
                          duration: 1.2,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-full blur-sm opacity-50`} />
                        
                        {/* Shine Animation */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                          initial={{ x: "-100%" }}
                          whileInView={{ x: "100%" }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 1.2 + index * 0.1,
                            duration: 0.8,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Skill Description */}
                    <motion.p 
                      className="text-sm text-slate-400 mt-2"
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                    >
                      {skill.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Skills Summary */}
            <motion.div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              {[
                { label: "Proje Sayısı", value: "20+", icon: "📁" },
                { label: "Teknoloji", value: "13+", icon: "🧩" },
                { label: "Memnuniyet", value: "95%", icon: "🏅" },
                { label: "Deneyim", value: "5+ Yıl", icon: "⏳" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>


          </div>
        </motion.div>
      </div>
    </section>
  );
}