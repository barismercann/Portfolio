import { Badge, Button, Card, CardContent, CardHeader } from '@/components/ui';
import { getContactMessages, markMessageAsRead } from '@/lib/database';
import {
  Archive,
  CheckCircle,
  Clock,
  ExternalLink,
  Filter,
  Mail,
  MailOpen,
  MessageCircle,
  Search,
  Trash2,
  TrendingUp,
  User,
  X
} from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';

// Mapping functions for enum values
const getBudgetText = (budget: string | null) => {
  const budgetMap: Record<string, string> = {
    'RANGE_1500_5000': '₺1,500 - ₺5,000',
    'RANGE_5000_15000': '₺5,000 - ₺15,000',
    'RANGE_15000_50000': '₺15,000 - ₺50,000',
    'RANGE_50000_100000': '₺50,000 - ₺100,000',
    'RANGE_100000_PLUS': '₺100,000+',
  };
  return budget ? budgetMap[budget] || 'Belirtilmemiş' : 'Belirtilmemiş';
};

const getProjectTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    'WEB_DEVELOPMENT': 'Web Geliştirme',
    'MOBILE_APP': 'Mobil Uygulama',
    'CONSULTING': 'Danışmanlık',
    'MAINTENANCE': 'Bakım',
    'OTHER': 'Diğer',
  };
  return typeMap[type] || 'Diğer';
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'NEW': { text: 'Yeni', color: 'bg-blue-100 text-blue-800' },
    'IN_PROGRESS': { text: 'İşlemde', color: 'bg-yellow-100 text-yellow-800' },
    'REPLIED': { text: 'Yanıtlandı', color: 'bg-green-100 text-green-800' },
    'CLOSED': { text: 'Kapalı', color: 'bg-gray-100 text-gray-800' },
  };
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.NEW;
};

const getPriorityBadge = (priority: string) => {
  const priorityConfig = {
    'LOW': { text: 'Düşük', color: 'bg-gray-100 text-gray-600' },
    'MEDIUM': { text: 'Orta', color: 'bg-blue-100 text-blue-600' },
    'HIGH': { text: 'Yüksek', color: 'bg-orange-100 text-orange-600' },
    'URGENT': { text: 'Acil', color: 'bg-red-100 text-red-600' },
  };
  return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.MEDIUM;
};

// Server Actions
async function markAsRead(messageId: string) {
  'use server';
  
  try {
    await markMessageAsRead(messageId);
    revalidatePath('/admin/messages');
  } catch (error) {
    console.error('Failed to mark message as read:', error);
  }
}

// Loading component
function MessagesLoading() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Messages component
async function MessagesContent() {
  try {
    const { messages, pagination } = await getContactMessages({
      page: 1,
      limit: 50,
    });

    // Calculate statistics
    const totalMessages = messages.length;
    const unreadCount = messages.filter(m => !m.isRead).length;
    const repliedCount = messages.filter(m => m.status === 'REPLIED').length;
    const inProgressCount = messages.filter(m => m.status === 'IN_PROGRESS').length;

    if (messages.length === 0) {
      return (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Mail className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Henüz mesaj yok</h3>
          <p className="text-gray-600 mb-8">
            Portfolio sitesinden gelen proje başlatma talepleri burada görünecek.
          </p>
          <Button asChild>
            <a href="/#contact" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              İletişim Formunu Gör
            </a>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Proje Talepleri</h1>
            <p className="text-gray-600 mt-1">
              Portfolio sitesinden gelen proje başlatma talepleri
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              {totalMessages} toplam
            </Badge>
            <Badge variant="success" className="px-3 py-1">
              <Mail className="w-4 h-4 mr-1" />
              {unreadCount} okunmamış
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Mesaj</p>
                <p className="text-3xl font-bold text-blue-600">{totalMessages}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Okunmamış</p>
                <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <MailOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Yanıtlandı</p>
                <p className="text-3xl font-bold text-green-600">{repliedCount}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">İşlemde</p>
                <p className="text-3xl font-bold text-yellow-600">{inProgressCount}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Messages List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gelen Mesajlar</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Mesajlarda ara..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrele
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="space-y-1">
              {messages.map((message) => {
                const statusBadge = getStatusBadge(message.status);
                const priorityBadge = getPriorityBadge(message.priority);
                
                return (
                  <div
                    key={message.id}
                    className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !message.isRead ? 'bg-blue-25 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-semibold ${!message.isRead ? 'font-bold' : ''}`}>
                              {message.name}
                            </h3>
                            {!message.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          {message.phone && (
                            <p className="text-sm text-gray-500">{message.phone}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${statusBadge.color}`}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={`text-xs ${priorityBadge.color}`}>
                            {priorityBadge.text}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">
                          {message.createdAt.toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed line-clamp-3">
                        {message.message}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-500">Proje Tipi: </span>
                        <span className="font-medium">{getProjectTypeText(message.projectType)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Bütçe: </span>
                        <span className="font-medium">{getBudgetText(message.budget)}</span>
                      </div>
                      {message.ipAddress && (
                        <div>
                          <span className="text-gray-500">IP: </span>
                          <span className="font-mono text-xs">{message.ipAddress}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!message.isRead && (
                          <form action={markAsRead.bind(null, message.id)}>
                            <Button type="submit" variant="outline" size="sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Okundu İşaretle
                            </Button>
                          </form>
                        )}
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${message.email}?subject=Re: Proje Talebiniz Hakkında`}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            E-posta Gönder
                          </a>
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Archive className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Pagination - if needed in future */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" disabled={pagination.page === 1}>
              Önceki
            </Button>
            <span className="text-sm text-gray-600">
              Sayfa {pagination.page} / {pagination.totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={pagination.page === pagination.totalPages}>
              Sonraki
            </Button>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <X className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold mb-4">Mesajlar yüklenemedi</h3>
        <p className="text-gray-600 mb-8">
          Veritabanı bağlantısında sorun oluştu. Lütfen daha sonra tekrar deneyin.
        </p>
        <Button onClick={() => window.location.reload()}>
          Sayfayı Yenile
        </Button>
      </div>
    );
  }
}

export default async function MessagesPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<MessagesLoading />}>
        <MessagesContent />
      </Suspense>
    </div>
  );
}