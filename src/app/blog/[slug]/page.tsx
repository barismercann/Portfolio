// src/app/blog/[slug]/page.tsx
import { Badge, Button } from '@/components/ui';
import { ArrowLeft, BookOpen, Calendar, Clock, Eye, Share2, Tag, User } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock blog data - gerçek API'den gelecek
const BLOG_POSTS = {
  "nextjs-15-yenilikleri": {
    id: "nextjs-15-yenilikleri",
    title: "Next.js 15'te Gelen Devrim Niteliğinde Yenilikler",
    excerpt: "React Server Components'tan Turbopack'e kadar Next.js 15'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.",
    content: `
      <h2>Giriş</h2>
      <p>Next.js 15, web geliştirme dünyasında yeni bir çağın başlangıcını işaret ediyor. Bu sürümle birlikte gelen yenilikler, hem performans hem de geliştirici deneyimi açısından önemli ilerlemeler sunuyor.</p>
      
      <h2>React Server Components</h2>
      <p>React Server Components ile birlikte, sunucu tarafında işlenen componentler sayesinde daha hızlı sayfa yükleme süreleri ve daha iyi SEO performansı elde ediyoruz.</p>
      
      <h2>Turbopack Entegrasyonu</h2>
      <p>Webpack'in yerini alan Turbopack, development sırasında 10x daha hızlı build süreleri sunuyor. Bu, geliştirme sürecini önemli ölçüde hızlandırıyor.</p>
      
      <h2>Yeni Caching Stratejileri</h2>
      <p>Next.js 15'te gelen yeni cache stratejileri ile uygulama performansını optimize etmek artık daha kolay.</p>
      
      <h2>Sonuç</h2>
      <p>Next.js 15, modern web geliştirme için güçlü araçlar sunarak geliştiricilerin daha verimli çalışmasını sağlıyor.</p>
    `,
    publishedAt: "2024-12-15",
    readTime: 8,
    viewCount: 1250,
    category: "Frontend",
    tags: ["Next.js", "React", "Performance", "Web Development"],
    coverImage: "/images/blog/nextjs-15.jpg",
    author: {
      name: "Barış Mercan",
      avatar: "/images/author.jpg",
      bio: "Full-stack developer ve teknoloji yazarı"
    },
    metaTitle: "Next.js 15 Yenilikleri - Performans ve Geliştirici Deneyimi",
    metaDescription: "Next.js 15'te gelen React Server Components, Turbopack ve yeni caching stratejileri hakkında detaylı rehber."
  },
  "typescript-advanced-patterns": {
    id: "typescript-advanced-patterns",
    title: "TypeScript'te İleri Seviye Design Pattern'lar",
    excerpt: "Enterprise uygulamalarda TypeScript ile güçlü, tip-güvenli mimari yapıları nasıl oluşturacağınızı öğrenin.",
    content: `
      <h2>TypeScript ve Design Patterns</h2>
      <p>Bu makalede TypeScript ile kullanabileceğiniz ileri seviye design pattern'ları inceleyeceğiz.</p>
      
      <h2>Factory Pattern</h2>
      <p>Factory pattern, nesne oluşturma sürecini soyutlayarak tip güvenliğini artırır.</p>
      
      <h2>Observer Pattern</h2>
      <p>Observer pattern ile reactive programlama yaklaşımlarını TypeScript'te nasıl uygulayacağımızı öğreneceğiz.</p>
      
      <h2>Decorator Pattern</h2>
      <p>Decorator pattern, mevcut sınıfları genişletmek için güçlü bir yöntem sunuyor.</p>
    `,
    publishedAt: "2024-12-10",
    readTime: 12,
    viewCount: 890,
    category: "Backend",
    tags: ["TypeScript", "Design Patterns", "Enterprise", "Architecture"],
    coverImage: "/images/blog/typescript.jpg",
    author: {
      name: "Barış Mercan",
      avatar: "/images/author.jpg",
      bio: "Full-stack developer ve teknoloji yazarı"
    },
    metaTitle: "TypeScript Design Patterns - İleri Seviye Rehber",
    metaDescription: "Enterprise uygulamalarda TypeScript design patterns kullanımı hakkında kapsamlı rehber."
  },
  // Diğer blog yazıları da buraya eklenebilir
};

// Related posts
const RELATED_POSTS = [
  {
    id: "react-server-components",
    title: "React Server Components Derinlemesine İnceleme",
    excerpt: "React Server Components'ın nasıl çalıştığını ve performans avantajlarını keşfedin.",
    readTime: 10,
    category: "Frontend"
  },
  {
    id: "performance-optimization-nextjs",
    title: "Next.js Performans Optimizasyonu Rehberi",
    excerpt: "Next.js uygulamalarınızda performansı maksimuma çıkarmak için pratik teknikler.",
    readTime: 15,
    category: "Frontend"
  },
  {
    id: "modern-react-patterns",
    title: "Modern React Pattern'ları ve Hook'lar",
    excerpt: "2024'te React development için en güncel pattern'lar ve best practice'ler.",
    readTime: 12,
    category: "Frontend"
  }
];

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Metadata generation
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı - Barış Mercan',
      description: 'Aradığınız blog yazısı bulunamadı.'
    };
  }

  return {
    title: post.metaTitle || `${post.title} - Barış Mercan Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
        
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline" asChild className="group">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Blog&apos;a Geri Dön
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content */}
          <article className="lg:col-span-8">
            
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} dk okuma</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.viewCount.toLocaleString()} görüntülenme</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.bio}</div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.coverImage && (
              <div className="mb-8">
                <div className="aspect-video relative overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="
                  prose-headings:font-bold 
                  prose-headings:text-gray-900 
                  prose-p:text-gray-700 
                  prose-p:leading-relaxed
                  prose-h2:text-2xl
                  prose-h2:mt-8
                  prose-h2:mb-4
                  prose-h3:text-xl
                  prose-h3:mt-6
                  prose-h3:mb-3
                "
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-primary" />
                Etiketler
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Share Buttons */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2 text-primary" />
                Bu Yazıyı Paylaş
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://barismercan.com/blog/${post.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://barismercan.com/blog/${post.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: `https://barismercan.com/blog/${post.id}`
                      });
                    } else {
                      navigator.clipboard.writeText(`https://barismercan.com/blog/${post.id}`);
                      alert('Link kopyalandı!');
                    }
                  }}
                >
                  Link Kopyala
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            <div>
              <h3 className="text-2xl font-bold mb-6">İlgili Yazılar</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {RELATED_POSTS.map((relatedPost) => (
                  <div key={relatedPost.id} className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {relatedPost.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readTime} dk</span>
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-primary transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
              <h3 className="font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Bu Yazıda
              </h3>
              <nav className="space-y-2">
                <a href="#giris" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  • Giriş
                </a>
                <a href="#react-server-components" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  • React Server Components
                </a>
                <a href="#turbopack" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  • Turbopack Entegrasyonu
                </a>
                <a href="#caching" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  • Yeni Caching Stratejileri
                </a>
                <a href="#sonuc" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  • Sonuç
                </a>
              </nav>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold mb-3">📬 Newsletter&apos;a Katılın</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Yeni blog yazılarından ve teknoloji güncellemelerinden haberdar olun
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button size="sm" className="w-full">
                  Abone Ol
                </Button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold mb-4">👨‍💻 Yazar Hakkında</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">{post.author.bio}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                5+ yıllık deneyime sahip full-stack developer. Modern web teknolojileri ve best practice&apos;ler konularında içerik üretiyor.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://github.com/barismercann" target="_blank">
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="https://linkedin.com/in/barış-mercan-28786b27a" target="_blank">
                    LinkedIn
                  </Link>
                </Button>
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold mb-4">🔥 Popüler Yazılar</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-3">
                  <Link href="/blog/react-server-components" className="text-sm font-medium hover:text-primary transition-colors line-clamp-2">
                    React Server Components Derinlemesine İnceleme
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>10 dk</span>
                    <Eye className="w-3 h-3" />
                    <span>2.1K</span>
                  </div>
                </div>
                <div className="border-b border-gray-100 pb-3">
                  <Link href="/blog/typescript-best-practices" className="text-sm font-medium hover:text-primary transition-colors line-clamp-2">
                    TypeScript Best Practices 2024
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>8 dk</span>
                    <Eye className="w-3 h-3" />
                    <span>1.8K</span>
                  </div>
                </div>
                <div>
                  <Link href="/blog/nodejs-microservices" className="text-sm font-medium hover:text-primary transition-colors line-clamp-2">
                    Node.js ile Microservices Mimarisi
                  </Link>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>18 dk</span>
                    <Eye className="w-3 h-3" />
                    <span>1.5K</span>
                  </div>
                </div>
              </div>
            </div>

          </aside>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Benzer İçerikler İçin Takipte Kalın</h2>
          <p className="text-xl mb-8 opacity-90">
            Modern web teknolojileri hakkında daha fazla yazı için blog sayfamını ziyaret edin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/blog">
                <BookOpen className="w-5 h-5 mr-2" />
                Tüm Blog Yazıları
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/#contact">
                İletişime Geç
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}