// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcryptjs';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Starting database seed...');

//   // Create admin user with hashed password
//   const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
//   const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
//   const admin = await prisma.user.upsert({
//     where: { email: 'barismercan53@gmail.com' },
//     update: {
//       password: hashedPassword,
//       hashedPassword: hashedPassword,
//     },
//     create: {
//       email: 'barismercan53@gmail.com',
//       password: hashedPassword,
//       hashedPassword: hashedPassword,
//       name: 'Barış Mercan',
//       role: 'ADMIN',
//       isActive: true,
//     },
//   });
//   console.log('✅ Admin user created:', admin.email);

//   // Create sample blog posts
//   const blogPosts = [
//     {
//       title: 'Next.js 15\'te Gelen Devrim Niteliğinde Yenilikler',
//       slug: 'nextjs-15-yenilikleri',
//       excerpt: 'React Server Components\'tan Turbopack\'e kadar Next.js 15\'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.',
//       content: 'Next.js 15 ile gelen yenilikler web geliştirme dünyasında çığır açıyor...',
//       category: 'Frontend',
//       tags: ['Next.js', 'React', 'Performance'],
//       status: 'PUBLISHED' as const, // Use string literal instead of enum
//       publishedAt: new Date(),
//       readTime: 8,
//     },
//     {
//       title: 'TypeScript\'te İleri Seviye Design Pattern\'lar',
//       slug: 'typescript-advanced-patterns',
//       excerpt: 'Enterprise uygulamalarda TypeScript ile güçlü, tip-güvenli mimari yapıları nasıl oluşturacağınızı öğrenin.',
//       content: 'TypeScript\'in güçlü tip sistemi ile enterprise seviye uygulamalar geliştirmek...',
//       category: 'Backend',
//       tags: ['TypeScript', 'Design Patterns'],
//       status: 'PUBLISHED' as const, // Use string literal instead of enum
//       publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
//       readTime: 12,
//     },
//     {
//       title: 'Modern Web Uygulamalarında AI Entegrasyonu',
//       slug: 'ai-integration-web-apps',
//       excerpt: 'OpenAI, Claude ve diğer AI modellerini web uygulamalarınıza nasıl entegre edeceğinizi pratik örneklerle anlatıyorum.',
//       content: 'Yapay zeka teknolojilerinin web uygulamalarına entegrasyonu...',
//       category: 'AI/ML',
//       tags: ['AI', 'OpenAI', 'Integration'],
//       status: 'PUBLISHED' as const, // Use string literal instead of enum
//       publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
//       readTime: 15,
//     },
//   ];

//   for (const post of blogPosts) {
//     const created = await prisma.blogPost.upsert({
//       where: { slug: post.slug },
//       update: {},
//       create: post,
//     });
//     console.log('✅ Blog post created:', created.title);
//   }

//   // Create sample portfolio projects
//   const portfolioProjects = [
//     {
//       title: 'Kurumsal ERP Yönetim Sistemi',
//       slug: 'kurumsal-erp-sistemi',
//       description: 'Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü.',
//       fullDescription: 'Bu proje, modern işletmelerin tüm operasyonlarını tek bir platformda yönetebilmesi için geliştirilmiş kapsamlı bir ERP sistemidir.',
//       category: 'ERP Sistemi',
//       technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Redux', 'JWT', 'Socket.io'],
//       features: ['Muhasebe ve finans yönetimi', 'İnsan kaynakları modülü', 'Satış ve CRM entegrasyonu'],
//       metrics: '40% verimlilik artışı, 3x hızlı raporlama',
//       mainImage: '/images/projects/erp-preview.webp',
//       gallery: ['/images/projects/erp-preview.webp', '/images/projects/erp-dashboard.webp'],
//       liveUrl: 'https://fabrikam360.com/',
//       status: 'LIVE' as const, // Use string literal instead of enum
//       featured: true,
//       duration: '3 ay',
//       teamSize: '1 kişi',
//       client: 'Fabrikam Corp',
//       completedAt: new Date('2024-11-15'),
//     },
//     {
//       title: 'Ölçeklenebilir E-Ticaret Platformu',
//       slug: 'e-ticaret-platformu',
//       description: 'Modern e-ticaret deneyimi sunan, gelişmiş ödeme entegrasyonları ile donatılmış platform.',
//       category: 'E-Ticaret',
//       technologies: ['Next.js', 'Prisma', 'Iyzico', 'Vercel', 'MongoDB', 'Redis'],
//       features: ['Responsive tasarım', 'Güvenli ödeme sistemi', 'Admin panel ve dashboard'],
//       metrics: '99.9% uptime, 1.84s sayfa yükleme süresi',
//       mainImage: '/images/projects/ecommerce-preview.webp',
//       gallery: ['/images/projects/ecommerce-preview.webp'],
//       liveUrl: 'https://www.aycay.com/',
//       status: 'LIVE' as const, // Use string literal instead of enum
//       featured: true,
//       duration: '2.5 ay',
//       teamSize: '1 kişi',
//       client: 'Aycay Store',
//       completedAt: new Date('2024-10-20'),
//     },
//   ];

//   for (const project of portfolioProjects) {
//     const created = await prisma.project.upsert({
//       where: { slug: project.slug },
//       update: {},
//       create: project,
//     });
//     console.log('✅ Portfolio project created:', created.title);
//   }

//   // Create sample contact messages
//   const sampleMessages = [
//   {
//     name: 'Ahmet Yılmaz',
//     email: 'ahmet@example.com',
//     phone: '+90 555 123 4567',
//     message: 'E-ticaret sitesi için teklif istiyorum. 50 ürünlü bir mağaza olacak.',
//     budget: 'RANGE_5000_15000' as const,
//     projectType: 'WEB_DEVELOPMENT' as const,
//     status: 'NEW' as const,
//   },
//   {
//     name: 'Fatma Kaya',
//     email: 'fatma@example.com',
//     message: 'Mevcut web sitemizi Next.js\'e geçirmek istiyoruz. Danışmanlık hizmeti alabilir miyiz?',
//     budget: 'RANGE_15000_50000' as const,
//     projectType: 'CONSULTING' as const,
//     status: 'NEW' as const,
//   },
// ];


//   for (const message of sampleMessages) {
//   const created = await prisma.contactMessage.create({
//     data: message,
//   });
//   console.log('✅ Sample contact message created:', created.name);
// }

//   // Create sample newsletter subscriptions
//   const sampleSubscribers = [
//     {
//       email: 'developer1@example.com',
//       name: 'Geliştirici Ali',
//       source: '/blog',
//       isActive: true,
//     },
//     {
//       email: 'designer@example.com',
//       name: 'Tasarımcı Ayşe',
//       source: '/portfolio',
//       isActive: true,
//     },
//   ];

//   for (const subscriber of sampleSubscribers) {
//     const created = await prisma.newsletter.upsert({
//       where: { email: subscriber.email },
//       update: {},
//       create: subscriber,
//     });
//     console.log('✅ Sample newsletter subscriber created:', created.email);
//   }

//   console.log('🎉 Database seed completed successfully!');
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error('❌ Seed failed:', e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });