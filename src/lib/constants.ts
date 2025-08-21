export const SITE_CONFIG = {
  name: "Barış Mercan",
  title: "Barış Mercan - The Code Architect",
  description: "Yarının dijital gerçekliğini bugünden inşa eden elit full-stack geliştirici. En son teknolojilerde uzmanlaşmış, karmaşık problemler için imkansız çözümler üretiyorum.",
  url: "https://barismercan.com",
  ogImage: "/og-image.jpg",
  author: {
    name: "Barış Mercan",
    email: "baris@example.com",
    twitter: "@barismercan",
    github: "barismercan",
    linkedin: "barismercan"
  }
};

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa", key: "home" },
  { href: "/#about", label: "Hakkımda", key: "about" },
  { href: "/portfolio", label: "Portfolio", key: "portfolio" },
  { href: "/services", label: "Hizmetler", key: "services" },
  { href: "/blog", label: "Blog", key: "blog" },
  { href: "/contact", label: "İletişim", key: "contact" }
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
    { name: "MongoDB", level: 70 }
  ],
  cloud: [
    { name: "AWS", level: 75 },
    { name: "Docker", level: 70 },
    { name: "Vercel", level: 85 },
    { name: "CI/CD", level: 68 }
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
    id: "custom-development",
    title: "Özel Yazılım Geliştirme",
    description: "Proje kapsamına göre",
    price: "₺25,000 - ₺150,000",
    features: [
      "Full-stack web uygulamaları",
      "Mobil uygulama geliştirme",
      "Veritabanı tasarım & optimizasyon",
      "API geliştirme & entegrasyon"
    ],
    popular: false
  },
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
    popular: true
  },
  {
    id: "devops-deployment",
    title: "DevOps & Deployment",
    description: "Altyapı kurulum & yönetim",
    price: "₺15,000 - ₺50,000",
    features: [
      "AWS/Azure kurulum",
      "CI/CD pipeline uygulaması",
      "Docker konteynerizasyon",
      "İzleme & bakım"
    ],
    popular: false
  }
];