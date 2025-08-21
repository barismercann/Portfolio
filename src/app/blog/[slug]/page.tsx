import { Badge } from '@/components/ui';
import { ArrowLeft, BookOpen, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  return (
    <section className="py-20 pt-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Blog&apos;a Geri Dön
          </Link>

          {/* Article Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Frontend
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {params.slug.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>15 Aralık 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>8 dk okuma</span>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="text-center p-12 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Makale Geliştiriliyor</h2>
            <p className="text-muted-foreground mb-6">
              Bu makale şu anda yazılıyor. Yakında burada detaylı teknik içerik bulabileceksiniz.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>📝 Makale Konusu:</strong> {params.slug.split('-').join(' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}