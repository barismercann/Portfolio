// src/lib/seo.ts
import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'profile';
}

export function generateMetadata({
  title,
  description = "Barış Mercan - Yarının dijital gerçekliğini bugünden inşa eden full-stack geliştirici. Modern teknolojilerle özelleştirilmiş web çözümleri.",
  keywords = [],
  image = "/og-image.jpg",
  url,
  noIndex = false,
  type = 'website'
}: SEOProps = {}): Metadata {
  
  const defaultTitle = "Barış Mercan - Full-Stack Developer | Modern Web Çözümleri";
  const finalTitle = title ? `${title} | Barış Mercan` : defaultTitle;
  
  const defaultKeywords = [
    'Barış Mercan',
    'full-stack developer',
    'web geliştirici',
    'Next.js',
    'React',
    'TypeScript',
    'modern web teknolojileri',
    'özel yazılım geliştirme',
    'İstanbul web developer',
    'freelance developer',
    'portfolio'
  ];

  const finalKeywords = [...defaultKeywords, ...keywords];

  return {
    title: finalTitle,
    description,
    keywords: finalKeywords,
    authors: [{ name: 'Barış Mercan', url: 'https://barismercan.com' }],
    creator: 'Barış Mercan',
    publisher: 'Barış Mercan',
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    
    // Open Graph
    openGraph: {
      type,
      locale: 'tr_TR',
      url: url || 'https://barismercan.com',
      title: finalTitle,
      description,
      siteName: 'Barış Mercan Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description,
      images: [image],
      creator: '@Barismercan_',
    },

    // Additional Meta
    alternates: {
      canonical: url,
      languages: {
        'tr-TR': url || 'https://barismercan.com',
        'en-US': url ? `${url}?lang=en` : 'https://barismercan.com?lang=en',
      },
    },

    // Verification
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

// Page-specific SEO configurations
export const seoConfigs = {
  home: {
    title: "Barış Mercan - Full-Stack Developer | Modern Web Çözümleri",
    description: "İstanbul merkezli full-stack developer. Next.js, React, TypeScript ile modern web uygulamaları geliştiriyorum. Ücretsiz danışmanlık ve hızlı teslimat.",
    keywords: ["ana sayfa", "portfolio", "İstanbul developer"],
    url: "https://barismercan.com"
  },

  portfolio: {
    title: "Projelerim - Başarılı Web Uygulamaları",
    description: "ERP sistemlerinden e-ticaret platformlarına kadar geliştirdiğim projelerimde modern teknolojiler ve best practice'ler kullanıyorum.",
    keywords: ["projeler", "ERP sistemi", "e-ticaret", "web uygulaması"],
    url: "https://barismercan.com/portfolio"
  },

  contact: {
    title: "İletişim - Projenizi Konuşalım",
    description: "Web geliştirme projeniz için benimle iletişime geçin. İlk 30 dakika ücretsiz danışmanlık ve 24 saat içinde yanıt garantisi.",
    keywords: ["iletişim", "proje başlatma", "web geliştirme teklifi"],
    url: "https://barismercan.com/contact"
  },

  blog: {
    title: "Blog - Web Teknolojileri ve Best Practices",
    description: "Next.js, React, TypeScript ve modern web teknolojileri hakkında teknik yazılar ve pratik öneriler.",
    keywords: ["blog", "Next.js", "React", "TypeScript", "web teknolojileri"],
    url: "https://barismercan.com/blog"
  }
};

// JSON-LD Structured Data
export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Barış Mercan',
    jobTitle: 'Full-Stack Developer',
    description: 'Modern web teknolojileri uzmanı, özel yazılım geliştirici',
    url: 'https://barismercan.com',
    email: 'barismercan53@gmail.com',
    telephone: '+90 543 553 5310',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'İstanbul',
      addressCountry: 'TR'
    },
    sameAs: [
      'https://github.com/barismercann',
      'https://linkedin.com/in/barış-mercan-28786b27a',
      'https://x.com/Barismercan_'
    ],
    knowsAbout: [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'PostgreSQL',
      'Full-Stack Development',
      'Web Application Development'
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'Turkey'
    }
  };
}

// Sitemap generation helper
export const sitemapUrls = [
  {
    url: 'https://barismercan.com',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  },
  {
    url: 'https://barismercan.com/portfolio',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  },
  {
    url: 'https://barismercan.com/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  },
  {
    url: 'https://barismercan.com/blog',
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  },
];

// robots.txt content
export const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://barismercan.com/sitemap.xml

# Disallow admin areas (future)
# Disallow: /admin/
# Disallow: /api/

# Allow important pages
Allow: /portfolio
Allow: /contact
Allow: /blog

# Crawl delay
Crawl-delay: 1

# Host preference
Host: https://barismercan.com
`;