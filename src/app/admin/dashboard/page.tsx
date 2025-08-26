import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { getContactMessages } from '@/lib/database';
import { ContactMessage } from '@/types/messages.types';
import {
  BarChart3,
  Calendar,
  CheckCircle,
  ExternalLink,
  Mail,
  MailOpen,
  MessageCircle,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// Define the ContactMessage type based on Prisma schema


// Loading component
function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard content component
async function DashboardContent() {
  try {
    // Fetch recent messages for analytics
    const { messages } = await getContactMessages({
      page: 1,
      limit: 100, // Get more data for analytics
    });

    // Calculate statistics with proper typing
    const totalMessages = messages.length;
    const unreadMessages = messages.filter((m: ContactMessage) => !m.isRead).length;
    const repliedMessages = messages.filter((m: ContactMessage) => m.status === 'REPLIED').length;
    const todayMessages = messages.filter((m: ContactMessage) => {
      const today = new Date();
      const messageDate = new Date(m.createdAt);
      return messageDate.toDateString() === today.toDateString();
    }).length;

    // Recent messages (last 5)
    const recentMessages = messages.slice(0, 5);

    // Project type analytics
    const projectTypeStats = messages.reduce((acc: Record<string, number>, message: ContactMessage) => {
      acc[message.projectType] = (acc[message.projectType] || 0) + 1;
      return acc;
    }, {});

    // Budget range analytics
    const budgetStats = messages.reduce((acc: Record<string, number>, message: ContactMessage) => {
      if (message.budget) {
        acc[message.budget] = (acc[message.budget] || 0) + 1;
      }
      return acc;
    }, {});

    // Weekly analytics (last 7 days)
    const weeklyStats = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayMessages = messages.filter((m: ContactMessage) => {
        const messageDate = new Date(m.createdAt);
        return messageDate.toDateString() === date.toDateString();
      }).length;
      
      return {
        date: date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' }),
        messages: dayMessages
      };
    }).reverse();

    const getProjectTypeText = (type: string) => {
      const typeMap: Record<string, string> = {
        'WEB_DEVELOPMENT': 'Web Geliştirme',
        'MOBILE_APP': 'Mobil Uygulama',
        'CONSULTING': 'Danışmanlık',
        'MAINTENANCE': 'Bakım',
        'OTHER': 'Diğer',
      };
      return typeMap[type] || type;
    };

    const getBudgetText = (budget: string) => {
      const budgetMap: Record<string, string> = {
        'RANGE_1500_5000': '₺1.5K-5K',
        'RANGE_5000_15000': '₺5K-15K',
        'RANGE_15000_50000': '₺15K-50K',
        'RANGE_50000_100000': '₺50K-100K',
        'RANGE_100000_PLUS': '₺100K+',
      };
      return budgetMap[budget] || budget;
    };

    return (
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Hoş geldin! Portfolio performansının özeti burada.
            </p>
          </div>
          <div className="text-right">
            <Badge variant="success" className="px-3 py-1 mb-2">
              🟢 Sistem Aktif
            </Badge>
            <p className="text-sm text-gray-500">
              Son güncelleme: {new Date().toLocaleString('tr-TR')}
            </p>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Toplam Proje Talebi</p>
                  <p className="text-3xl font-bold text-primary">{totalMessages}</p>
                  <p className="text-xs text-green-600 mt-1">↗️ Aktif portföy</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Okunmamış</p>
                  <p className="text-3xl font-bold text-orange-600">{unreadMessages}</p>
                  <p className="text-xs text-orange-600 mt-1">⚡ Aksiyon gerekli</p>
                </div>
                <div className="p-3 rounded-full bg-orange-100">
                  <MailOpen className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Yanıtlandı</p>
                  <p className="text-3xl font-bold text-green-600">{repliedMessages}</p>
                  <p className="text-xs text-green-600 mt-1">
                    ✅ %{totalMessages > 0 ? Math.round((repliedMessages / totalMessages) * 100) : 0} tamamlandı
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Bugün</p>
                  <p className="text-3xl font-bold text-blue-600">{todayMessages}</p>
                  <p className="text-xs text-blue-600 mt-1">📅 Günlük aktivite</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Weekly Activity Chart */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                Son 7 Gün Aktivitesi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 w-16">{day.date}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all duration-300"
                          style={{ 
                            width: `${Math.max((day.messages / Math.max(...weeklyStats.map(d => d.messages))) * 100, 5)}%` 
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold w-8 text-right">{day.messages}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Type Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Proje Tipleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(projectTypeStats)
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{getProjectTypeText(type)}</span>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 rounded-full h-2 w-24">
                        <div 
                          className="bg-gradient-to-r from-primary to-blue-600 rounded-full h-2"
                          style={{ 
                            width: `${((count as number) / totalMessages) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right">{count as number}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Messages & Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Recent Messages */}
          <Card className="border-0 shadow-lg md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                Son Mesajlar
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/messages">
                  Tümünü Gör
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.length > 0 ? (
                  recentMessages.map((message: ContactMessage) => (
                    <div key={message.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${!message.isRead ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm font-medium ${!message.isRead ? 'font-semibold' : ''}`}>
                            {message.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2">{message.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getProjectTypeText(message.projectType)}
                          </Badge>
                          {message.budget && (
                            <Badge variant="outline" className="text-xs">
                              {getBudgetText(message.budget)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Henüz mesaj yok</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Hızlı İşlemler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <Link href="/admin/messages">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mesajları Yönet
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/blogs">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Blog Yazıları
                </Link>
              </Button>
              
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/admin/settings">
                  <Users className="w-4 h-4 mr-2" />
                  Ayarlar
                </Link>
              </Button>

              <div className="border-t pt-4 mt-4">
                <Button variant="ghost" className="w-full justify-start text-green-600 hover:text-green-700 hover:bg-green-50" asChild>
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Siteyi Görüntüle
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Analytics (if we have budget data) */}
        {Object.keys(budgetStats).length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Bütçe Dağılımı
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(budgetStats)
                  .sort(([,a], [,b]) => (b as number) - (a as number))
                  .map(([budget, count]) => (
                  <div key={budget} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-primary">{count as number}</div>
                    <div className="text-xs text-gray-600 mt-1">{getBudgetText(budget)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  } catch (error) {
    console.error('Dashboard data fetch error:', error);
    
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold mb-4">Dashboard yüklenemedi</h3>
        <p className="text-gray-600 mb-8">
          Veriler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.
        </p>
        <Button onClick={() => window.location.reload()}>
          Sayfayı Yenile
        </Button>
      </div>
    );
  }
}

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<DashboardLoading />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}