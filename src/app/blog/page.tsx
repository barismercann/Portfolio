import { Badge } from '@/components/ui';
import { BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <section className="py-20 pt-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Teknik <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En son teknolojiler, best practice&apos;ler ve pratik çözümler hakkında derinlemesine yazılar
            </p>
          </div>

          {/* Coming Soon */}
          <div className="text-center p-12 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Blog Sayfası Geliştiriliyor</h2>
            <p className="text-muted-foreground mb-6">
              Yakında burada teknik yazılarımı, tutorials ve en son teknoloji trendlerini bulabileceksiniz.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>🚀 Çok Yakında:</strong><br />
                Next.js 15, TypeScript, AI Integration ve daha fazlası hakkında yazılar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}