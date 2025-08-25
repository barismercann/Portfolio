import { BudgetRange, MessageStatus, PostStatus, PrismaClient, ProjectStatus, ProjectType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user with env credentials
  const adminEmail = process.env.ADMIN_EMAIL || 'barismercan53@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123!';

  // Hash password before storing
  const bcrypt = await import('bcryptjs');
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      hashedPassword,
      isActive: true,
    },
    create: {
      email: adminEmail,
      name: 'Barış Mercan',
      role: 'ADMIN',
      hashedPassword,
      isActive: true,
      emailVerified: new Date(),
    },
  });
  console.log('✅ Admin user created/updated:', admin.email);
  console.log('🔐 Password set from env:', adminPassword ? 'YES' : 'NO (using default)');

  // Create sample blog posts
  const blogPosts = [
    {
      title: 'Next.js 15\'te Gelen Devrim Niteliğinde Yenilikler',
      slug: 'nextjs-15-yenilikleri',
      excerpt: 'React Server Components\'tan Turbopack\'e kadar Next.js 15\'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.',
      content: 'Next.js 15 ile gelen yenilikler web geliştirme dünyasında çığır açıyor...',
      category: 'Frontend',
      tags: ['Next.js', 'React', 'Performance'],
      status: PostStatus.PUBLISHED, // Use enum instead of string
      publishedAt: new Date(),
      readTime: 8,
    },
    {
      title: 'TypeScript\'te İleri Seviye Design Pattern\'lar',
      slug: 'typescript-advanced-patterns',
      excerpt: 'Enterprise uygulamalarda TypeScript ile güçlü, tip-güvenli mimari yapıları nasıl oluşturacağınızı öğrenin.',
      content: 'TypeScript\'in güçlü tip sistemi ile enterprise seviye uygulamalar geliştirmek...',
      category: 'Backend',
      tags: ['TypeScript', 'Design Patterns'],
      status: PostStatus.PUBLISHED, // Use enum instead of string
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      readTime: 12,
    },
    {
      title: 'Modern Web Uygulamalarında AI Entegrasyonu',
      slug: 'ai-integration-web-apps',
      excerpt: 'OpenAI, Claude ve diğer AI modellerini web uygulamalarınıza nasıl entegre edeceğinizi pratik örneklerle anlatıyorum.',
      content: 'Yapay zeka teknolojilerinin web uygulamalarına entegrasyonu...',
      category: 'AI/ML',
      tags: ['AI', 'OpenAI', 'Integration'],
      status: PostStatus.PUBLISHED, // Use enum instead of string
      publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      readTime: 15,
    },
  ];

  for (const post of blogPosts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
    console.log('✅ Blog post created:', created.title);
  }

  // Create sample portfolio projects
  const portfolioProjects = [
    {
      title: 'Kurumsal ERP Yönetim Sistemi',
      slug: 'kurumsal-erp-sistemi',
      description: 'Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü.',
      fullDescription: 'Bu proje, modern işletmelerin tüm operasyonlarını tek bir platformda yönetebilmesi için geliştirilmiş kapsamlı bir ERP sistemidir.',
      category: 'ERP Sistemi',
      technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'Redux', 'JWT', 'Socket.io'],
      features: ['Muhasebe ve finans yönetimi', 'İnsan kaynakları modülü', 'Satış ve CRM entegrasyonu'],
      metrics: '40% verimlilik artışı, 3x hızlı raporlama',
      mainImage: '/images/projects/erp-preview.webp',
      gallery: ['/images/projects/erp-preview.webp', '/images/projects/erp-dashboard.webp'],
      liveUrl: 'https://fabrikam360.com/',
      status: ProjectStatus.LIVE, // Use enum instead of string
      featured: true,
      duration: '3 ay',
      teamSize: '1 kişi',
      client: 'Fabrikam Corp',
      completedAt: new Date('2024-11-15'),
    },
    {
      title: 'Ölçeklenebilir E-Ticaret Platformu',
      slug: 'e-ticaret-platformu',
      description: 'Modern e-ticaret deneyimi sunan, gelişmiş ödeme entegrasyonları ile donatılmış platform.',
      category: 'E-Ticaret',
      technologies: ['Next.js', 'Prisma', 'Iyzico', 'Vercel', 'MongoDB', 'Redis'],
      features: ['Responsive tasarım', 'Güvenli ödeme sistemi', 'Admin panel ve dashboard'],
      metrics: '99.9% uptime, 1.84s sayfa yükleme süresi',
      mainImage: '/images/projects/ecommerce-preview.webp',
      gallery: ['/images/projects/ecommerce-preview.webp'],
      liveUrl: 'https://www.aycay.com/',
      status: ProjectStatus.LIVE, // Use enum instead of string
      featured: true,
      duration: '2.5 ay',
      teamSize: '1 kişi',
      client: 'Aycay Store',
      completedAt: new Date('2024-10-20'),
    },
  ];

  for (const project of portfolioProjects) {
    const created = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
    console.log('✅ Portfolio project created:', created.title);
  }

  // Create sample contact messages
  const sampleMessages = [
  {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    message: 'E-ticaret sitesi için teklif istiyorum. 50 ürünlü bir mağaza olacak.',
    budget: BudgetRange.RANGE_5000_15000,
    projectType: ProjectType.WEB_DEVELOPMENT,
    status: MessageStatus.NEW,
  },
  {
    name: 'Fatma Kaya',
    email: 'fatma@example.com',
    message: 'Mevcut web sitemizi Next.js\'e geçirmek istiyoruz. Danışmanlık hizmeti alabilir miyiz?',
    budget: BudgetRange.RANGE_15000_50000,
    projectType: ProjectType.CONSULTING,
    status: MessageStatus.NEW,
  },
];


  for (const message of sampleMessages) {
  const created = await prisma.contactMessage.create({
    data: message,
  });
  console.log('✅ Sample contact message created:', created.name);
}



  // Create sample newsletter subscriptions
  const sampleSubscribers = [
    {
      email: 'developer1@example.com',
      name: 'Geliştirici Ali',
      source: '/blog',
      isActive: true,
    },
    {
      email: 'designer@example.com',
      name: 'Tasarımcı Ayşe',
      source: '/portfolio',
      isActive: true,
    },
  ];

  for (const subscriber of sampleSubscribers) {
    const created = await prisma.newsletter.upsert({
      where: { email: subscriber.email },
      update: {},
      create: subscriber,
    });
    console.log('✅ Sample newsletter subscriber created:', created.email);
  }

  console.log('🎉 Database seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });