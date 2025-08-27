import { Badge, Button } from '@/components/ui';
import ShareButton from '@/components/ui/ShareButton';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Loader2,
  Share2,
  Tag,
  User
} from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Types
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords: string[];
  publishedAt?: string;
  readTime?: number;
  viewCount: number;
  category?: string;
  tags: string[];
  authorName: string;
  createdAt: string;
}

interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  readTime?: number;
  category?: string;
}

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Safe HTML content renderer
function SafeHTMLContent({ content }: { content: string }) {
  // Ensure content is a string and not null/undefined
  const safeContent = typeof content === 'string' ? content : '';
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: safeContent }}
      className="
        prose prose-lg max-w-none
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
        prose-pre:bg-gray-900
        prose-pre:text-gray-100
        prose-code:text-pink-600
        prose-code:bg-gray-100
        prose-code:px-1
        prose-code:py-0.5
        prose-code:rounded
        prose-blockquote:border-l-primary
        prose-blockquote:bg-blue-50
        prose-blockquote:p-4
        prose-blockquote:rounded-r-lg
      "
    />
  );
}

// Fetch blog post by slug
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs?slug=${slug}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data.success && data.data.posts.length > 0) {
      return data.data.posts[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Fetch related posts
async function getRelatedPosts(category: string, currentSlug: string): Promise<RelatedPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs?category=${category}&limit=3`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    if (data.success) {
      return data.data.posts
        .filter((post: BlogPost) => post.slug !== currentSlug)
        .slice(0, 3)
        .map((post: BlogPost) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          readTime: post.readTime,
          category: post.category,
        }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  console.log("Post in metadata:", post);
  console.log("Slug in metadata:", slug);
  if (!post) {
    return {
      title: 'Blog Yazısı Bulunamadı - Barış Mercan',
      description: 'Aradığınız blog yazısı bulunamadı.'
    };
  }

  return {
    title: post.metaTitle || `${post.title} - Barış Mercan Blog`,
    description: post.metaDescription || post.excerpt || post.title,
    keywords: post.keywords,
    authors: [{ name: post.authorName }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.title,
      images: post.coverImage ? [post.coverImage] : [],
    }
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = post.category ? await getRelatedPosts(post.category, slug) : [];

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
                {post.category && (
                  <Badge variant="secondary">
                    {post.category}
                  </Badge>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.publishedAt && (
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
                  )}
                  {post.readTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} dk okuma</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.viewCount.toLocaleString()} görüntülenme</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {/* Author Info */}
              <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">{post.authorName}</div>
                  <div className="text-sm text-muted-foreground">Full-stack Developer</div>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.coverImage && (
              <div className="mb-8">
                <div className="aspect-video relative overflow-hidden rounded-2xl bg-gray-100">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="mb-12">
              <SafeHTMLContent content={post.content} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-primary" />
                  Etiketler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={`${tag}-${index}`} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2 text-primary" />
                Bu Yazıyı Paylaş
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://barismercan.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://barismercan.com/blog/${post.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>
                <ShareButton post={post} />
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">İlgili Yazılar</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-2 mb-3">
                        {relatedPost.category && (
                          <Badge variant="secondary" className="text-xs">
                            {relatedPost.category}
                          </Badge>
                        )}
                        {relatedPost.readTime && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{relatedPost.readTime} dk</span>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h4>
                      {relatedPost.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Table of Contents - Simple version */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 sticky top-8">
              <h3 className="font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-primary" />
                Bu Yazıda
              </h3>
              <div className="text-sm text-muted-foreground">
                <p>İçerik yapısı yazı yüklendikten sonra oluşturulacak</p>
              </div>
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
                  <div className="font-semibold">{post.authorName}</div>
                  <div className="text-sm text-muted-foreground">Full-stack Developer</div>
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

            {/* Popular Posts - This would need another API endpoint */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold mb-4">🔥 Popüler Yazılar</h3>
              <div className="text-sm text-muted-foreground">
                <p>Popüler yazılar yükleniyor...</p>
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

// Loading component for when the page is being generated
export function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Blog yazısı yükleniyor...</p>
          </div>
        </div>
      </div>
    </div>
  );
}