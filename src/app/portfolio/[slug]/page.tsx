import { Badge, Button } from '@/components/ui';
import { ArrowLeft, BookOpen, Calendar, Clock, Code2, ExternalLink, Github, Globe, TrendingUp, Users, Zap } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

// Mock project data - bu gerçek projede API'den gelecek
const PORTFOLIO_PROJECTS = [
  {
    id: "kurumsal-erp-sistemi",
    title: "Kurumsal ERP Yönetim Sistemi",
    description: "Gelişmiş kimlik doğrulama ve gerçek zamanlı analitik özelliklerine sahip çok kiracılı ERP çözümü. Muhasebe, İK, satış ve envanter modülleri ile tam entegre sistem.",
    fullDescription: "Bu proje, modern işletmelerin tüm operasyonlarını tek bir platformda yönetebilmesi için geliştirilmiş kapsamlı bir ERP sistemidir. Mikroservis mimarisi kullanılarak ölçeklenebilir bir yapıda inşa edilmiştir.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Redux", "JWT", "Socket.io", "Redis", "AWS"],
    category: "ERP Sistemi",
    metrics: "40% verimlilik artışı, 3x hızlı raporlama",
    image: "/images/projects/erp-preview.webp",
    images: [
      "/images/projects/erp-preview.webp",
      "/images/projects/erp-dashboard.webp",
      "/images/projects/erp-analytics.webp"
    ],
    liveUrl: "https://fabrikam360.com/",
    githubUrl: "#",
    status: "live",
    completedAt: "2024-11-15",
    duration: "3 ay",
    teamSize: "1 kişi",
    views: 1250,
    featured: true,
    client: "Fabrikam Corp",
    challenges: [
      "Kompleks iş mantığının modülerize edilmesi",
      "Gerçek zamanlı veri senkronizasyonu",
      "Çoklu tenant yapısının güvenlik optimizasyonu"
    ],
    solutions: [
      "Domain Driven Design ile modüler mimari",
      "WebSocket ile gerçek zamanlı güncellemeler",
      "JWT ve row-level security ile güvenlik"
    ],
    features: [
      "Muhasebe ve finans yönetimi",
      "İnsan kaynakları modülü",
      "Satış ve CRM entegrasyonu",
      "Envanter takip sistemi",
      "Gerçek zamanlı raporlama",
      "Çoklu şirket desteği"
    ]
  },
  {
    id: "e-ticaret-platformu",
    title: "Ölçeklenebilir E-Ticaret Platformu",
    description: "Modern e-ticaret deneyimi sunan, gelişmiş ödeme entegrasyonları ve envanter yönetimi ile donatılmış tam özellikli platform.",
    fullDescription: "Bu e-ticaret platformu, yüksek trafikli online mağazalar için optimize edilmiş, ölçeklenebilir bir çözümdür. Serverless mimarisi ile maliyet etkin bir yapı sunmaktadır.",
    technologies: ["Next.js", "Prisma", "Iyzico", "Vercel", "MongoDB", "Redis", "Tailwind", "Stripe"],
    category: "E-Ticaret",
    metrics: "99.9% uptime, 1.84s sayfa yükleme süresi",
    image: "/images/projects/ecommerce-preview.webp",
    images: [
      "/images/projects/ecommerce-preview.webp",
      "/images/projects/ecommerce-admin.webp",
      "/images/projects/ecommerce-mobile.webp"
    ],
    liveUrl: "https://www.aycay.com/",
    githubUrl: "#",
    status: "live",
    completedAt: "2024-10-20",
    duration: "2.5 ay",
    teamSize: "1 kişi",
    views: 890,
    featured: true,
    client: "Aycay Store",
    challenges: [
      "Yüksek trafik yönetimi",
      "Ödeme güvenliği ve PCI uyumluluğu",
      "Mobil performans optimizasyonu"
    ],
    solutions: [
      "CDN ve edge caching ile performans",
      "Iyzico ve Stripe entegrasyonu",
      "Progressive Web App teknolojisi"
    ],
    features: [
      "Responsive tasarım",
      "Güvenli ödeme sistemi",
      "Admin panel ve dashboard",
      "Envanter yönetimi",
      "SEO optimizasyonu",
      "Analytics entegrasyonu"
    ]
  }
];

// Project slug'ını ID'ye çevirme fonksiyonu
function getProjectBySlug(slug: string) {
  return PORTFOLIO_PROJECTS.find(project => project.id === slug);
}

// Metadata generation
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Proje Bulunamadı - Barış Mercan',
      description: 'Aradığınız proje bulunamadı.'
    };
  }

  return {
    title: `${project.title} - Barış Mercan Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

// Proje durum badge'leri
const getStatusBadge = (status: string) => {
  const statusConfig = {
    live: { text: "🟢 Canlı", color: "bg-green-100 text-green-800" },
    development: { text: "🟡 Geliştirme", color: "bg-yellow-100 text-yellow-800" },
    demo: { text: "🔵 Demo", color: "bg-blue-100 text-blue-800" },
    beta: { text: "🟠 Beta", color: "bg-orange-100 text-orange-800" }
  };
  
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.demo;
};

export default function PortfolioDetailPage({ params }: BlogDetailPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const statusBadge = getStatusBadge(project.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="outline" asChild className="group">
            <Link href="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Portfolio&apos;ya Geri Dön
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary">
              {project.category}
            </Badge>
            <Badge className={statusBadge.color}>
              {statusBadge.text}
            </Badge>
            {project.featured && (
              <Badge variant="success">
                ⭐ Öne Çıkan Proje
              </Badge>
            )}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-4xl">
            {project.description}
          </p>

          {/* Project Meta */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Tamamlanma</div>
                  <div className="font-semibold">{new Date(project.completedAt).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Süre</div>
                  <div className="font-semibold">{project.duration}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Ekip</div>
                  <div className="font-semibold">{project.teamSize}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm text-muted-foreground">Müşteri</div>
                  <div className="font-semibold">{project.client}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Globe className="w-5 h-5 mr-2" />
                Canlı Siteyi Görüntüle
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Kaynak Kodu
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/#contact">
                <Zap className="w-5 h-5 mr-2" />
                Benzer Proje İste
              </Link>
            </Button>
          </div>
        </div>

        {/* Project Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Image */}
            <div className="relative">
              <div className="aspect-video relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Proje Hakkında</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.fullDescription}
                </p>
              </div>
            </div>

            {/* Key Results */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold mb-4 text-green-900">🎯 Elde Edilen Sonuçlar</h3>
              <div className="text-lg font-semibold text-green-800">
                {project.metrics}
              </div>
            </div>

            {/* Challenges & Solutions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                <h3 className="text-xl font-bold mb-4 text-red-900 flex items-center">
                  🚧 Karşılaşılan Zorluklar
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-red-800 text-sm leading-relaxed">
                      • {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-xl font-bold mb-4 text-blue-900 flex items-center">
                  💡 Geliştirilen Çözümler
                </h3>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="text-blue-800 text-sm leading-relaxed">
                      • {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6">🚀 Özellikler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Notice for other projects */}
            {!project.fullDescription && (
              <div className="text-center p-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Detaylı Vaka Çalışması Hazırlanıyor</h2>
                <p className="text-muted-foreground mb-6">
                  Bu proje için detaylı teknik döküman ve vaka çalışması hazırlanmaktadır.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>📋 İçerik:</strong> Teknik mimari, geliştirme süreci, karşılaşılan zorluklar ve çözümler
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Code2 className="w-5 h-5 mr-2 text-primary" />
                Kullanılan Teknolojiler
              </h4>
              <div className="space-y-3">
                {project.technologies.map((tech) => (
                  <div key={tech} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
              <h4 className="text-lg font-semibold mb-4">📊 Proje İstatistikleri</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Görüntülenme</span>
                  <span className="font-semibold">{project.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Kategori</span>
                  <span className="font-semibold">{project.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Durum</span>
                  <Badge className={statusBadge.color} variant="outline">
                    {statusBadge.text}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h4 className="text-lg font-semibold mb-3">💬 Benzer Bir Projeye İhtiyacınız Var mı?</h4>
              <p className="text-blue-100 text-sm mb-4">
                Bu proje gibi özelleştirilmiş çözümler geliştirmek için benimle iletişime geçin.
              </p>
              <Button variant="secondary" className="w-full" asChild>
                <Link href="/#contact">
                  <Zap className="w-4 h-4 mr-2" />
                  Ücretsiz Danışmanlık Al
                </Link>
              </Button>
            </div>

            {/* Related Projects */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-lg font-semibold mb-4">🔗 İlgili Projeler</h4>
              <div className="space-y-3">
                {PORTFOLIO_PROJECTS
                  .filter(p => p.id !== project.id && p.category === project.category)
                  .slice(0, 2)
                  .map((relatedProject) => (
                    <Link 
                      key={relatedProject.id} 
                      href={`/portfolio/${relatedProject.id}`}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-sm font-medium line-clamp-2">{relatedProject.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{relatedProject.category}</div>
                    </Link>
                  ))}
                {PORTFOLIO_PROJECTS.filter(p => p.id !== project.id && p.category === project.category).length === 0 && (
                  <p className="text-sm text-muted-foreground">Bu kategoride başka proje bulunmuyor.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Projenizi Hayata Geçirmeye Hazır mısınız?</h2>
          <p className="text-xl mb-8 opacity-90">
            Bu projede kullandığım teknolojiler ve yaklaşımlarla sizin de projenizi geliştirebilirim
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#contact">
                <Zap className="w-5 h-5 mr-2" />
                Benimle Çalış
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link href="/portfolio">
                Diğer Projeleri Gör
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}