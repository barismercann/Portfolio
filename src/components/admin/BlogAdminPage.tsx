"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
    Archive,
    BookOpen,
    Edit,
    Eye,
    Filter,
    Plus,
    Search,
    Trash2,
    TrendingUp
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: string;
  readTime?: number;
  viewCount: number;
  category?: string;
  tags: string[];
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogResponse {
  success: boolean;
  data: {
    posts: BlogPost[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    'DRAFT': { text: '📝 Taslak', color: 'bg-yellow-100 text-yellow-800' },
    'PUBLISHED': { text: '🟢 Yayında', color: 'bg-green-100 text-green-800' },
    'ARCHIVED': { text: '📦 Arşivlendi', color: 'bg-gray-100 text-gray-800' },
  };
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      if (categoryFilter) params.append('category', categoryFilter);

      const response = await fetch(`/api/blogs?${params}`);
      const data: BlogResponse = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setTotalPages(data.data.pagination.totalPages);
        setTotalPosts(data.data.pagination.total);
      } else {
        setError('Blog yazıları yüklenemedi');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Blog yazıları yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (postId: string, postTitle: string) => {
    if (!confirm(`"${postTitle}" başlıklı blog yazısını silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${postId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        await fetchPosts(); // Refresh the list
      } else {
        alert('Blog yazısı silinemedi: ' + data.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Blog yazısı silinemedi');
    }
  };

  const handleStatusToggle = async (postId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    
    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      const response = await fetch(`/api/blogs/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...post,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (data.success) {
        await fetchPosts(); // Refresh the list
      } else {
        alert('Durum güncellenemedi: ' + data.message);
      }
    } catch (error) {
      console.error('Status update error:', error);
      alert('Durum güncellenemedi');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Blog yazıları yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Blog yazılarını yönetin ve yeni içerikler ekleyin
          </p>
        </div>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Link href="/admin/blogs/new">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Yazı
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Taslak</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {posts.filter(p => p.status === 'DRAFT').length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Edit className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Görüntülenme</p>
                <p className="text-3xl font-bold text-purple-600">
                  {posts.reduce((acc, post) => acc + post.viewCount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary w-full"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Tüm Durumlar</option>
                <option value="DRAFT">Taslak</option>
                <option value="PUBLISHED">Yayında</option>
                <option value="ARCHIVED">Arşivlendi</option>
              </select>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Blog Yazıları ({totalPosts})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Henüz blog yazısı yok</h3>
              <p className="text-gray-600 mb-6">
                İlk blog yazınızı oluşturarak başlayın
              </p>
              <Button asChild>
                <Link href="/admin/blogs/new">
                  <Plus className="w-4 h-4 mr-2" />
                  İlk Yazıyı Oluştur
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {posts.map((post) => {
                const statusBadge = getStatusBadge(post.status);
                
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Cover Image */}
                      <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={96}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className={`text-xs ${statusBadge.color}`}>
                              {statusBadge.text}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {post.excerpt || 'Özet bulunmuyor...'}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>
                            {post.publishedAt 
                              ? `Yayınlandı: ${formatDate(new Date(post.publishedAt))}`
                              : `Oluşturuldu: ${formatDate(new Date(post.createdAt))}`
                            }
                          </span>
                          {post.readTime && (
                            <span>{post.readTime} dk okuma</span>
                          )}
                          <span>{post.viewCount} görüntülenme</span>
                          {post.category && (
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          )}
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{post.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/blogs/edit/${post.id}`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusToggle(post.id, post.status)}
                          title={post.status === 'PUBLISHED' ? 'Taslağa Çevir' : 'Yayınla'}
                        >
                          {post.status === 'PUBLISHED' ? (
                            <Archive className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(post.id, post.title)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Önceki
          </Button>
          
          <span className="text-sm text-gray-600">
            Sayfa {currentPage} / {totalPages}
          </span>
          
          <Button 
            variant="outline" 
            size="sm" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Sonraki
          </Button>
        </div>
      )}
    </div>
  );
}