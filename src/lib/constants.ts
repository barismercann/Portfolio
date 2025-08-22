export const SITE_CONFIG = {
  name: "Barış Mercan",
  title: "Barış Mercan - Kod Mimarı",
  description: "Yarının dijital gerçekliğini bugünden inşa eden full-stack geliştirici. En son teknolojilerde uzmanlaşmış, karmaşık problemler için imkansız çözümler üretiyorum.",
  url: "https://barismercan.com",
  ogImage: "/og-image.jpg",
  author: {
    name: "Barış Mercan",
    email: "barismercan53@gmail.com",
    twitter: "@Barismercan_",
    github: "barismercann",
    linkedin: "barış-mercan-28786b27a"
  }
};

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa", key: "home" },
  { href: "/#about", label: "Hakkımda", key: "about" },
  { href: "/portfolio", label: "Portfolio", key: "portfolio" },
  { href: "/services", label: "Hizmetler", key: "services" },
  // { href: "/blog", label: "Blog", key: "blog" },
  { href: "/#contact", label: "İletişim", key: "contact" }
];

export const SKILLS = {
  frontend: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Tailwind CSS", level: 92 }
  ],
  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "MongoDB", level: 95 }
  ],
  cloud: [
    { name: "AWS", level: 85 },
    { name: "Docker", level: 95 },
    { name: "Vercel", level: 95 },
    { name: "CI/CD", level: 78 }
  ]
};

export const PROJECTS = [
  {
    id: "kurumsal-erp",
    title: "Kurumsal ERP Yönetim Sistemi",
    description: "Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü",
    image: "/projects/erp-system.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker"],
    features: [
      "40% verimlilik artışı, 3x hızlı raporlama"
    ],
    link: "#",
    github: "#"
  },
  {
    id: "saas-analytics",
    title: "SaaS Analitik Platformu",
    description: "ML tahminleri ile gerçek zamanlı iş zekası platformu geliştirdim",
    image: "/projects/saas-platform.jpg",
    technologies: ["React", "Express", "Redis", "AWS"],
    features: [
      "Günlük 250K+ veri noktası işleniyor"
    ],
    link: "#",
    github: "#"
  },
  {
    id: "e-commerce-platform",
    title: "Ölçeklenebilir E-Ticaret Platformu",
    description: "Gelişmiş ödeme entegrasyonu ile ölçeklenebilir e-ticaret çözümü",
    image: "/projects/ecommerce.jpg",
    technologies: ["Next.js", "Prisma", "Stripe", "Vercel"],
    features: [
      "99.9% uptime, 2s sayfa yükleme süresi"
    ],
    link: "#",
    github: "#"
  }
];

export const SERVICES = [
{
    id: "technical-consulting",
    title: "Teknik Danışmanlık",
    description: "Uzman seviye danışmanlık",
    price: "₺500 - ₺1,500/saat",
    features: [
      "Mimari planlama",
      "Kod inceleme & optimizasyon",
      "Teknoloji yığını seçimi",
      "Performans optimizasyon"
    ],
    popular: false
  },
  {
    id: "custom-development",
    title: "Özel Yazılım Geliştirme",
    description: "Proje kapsamına göre",
    price: "₺10,000 - ₺150,000",
    features: [
      "Full-stack web uygulamaları",
      "Mobil uygulama geliştirme",
      "Veritabanı tasarım & optimizasyon",
      "API geliştirme & entegrasyon"
    ],
    popular: true
  },
  {
    id: "project-updates",
    title: "Proje Güncellemeleri",
    description: "Mevcut proje geliştirmeleri",
    price: "₺2,500 - ₺35,000",
    features: [
      "Yeni özellik ekleme",
      "Bug fix & performans iyileştirme",
      "Dashboard & raporlama modülleri",
      "API entegrasyonu & güncellemeler"
    ],
    popular: false
  }
];