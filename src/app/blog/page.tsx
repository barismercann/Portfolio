"use client";

import { Badge, Button, Card, CardContent } from '@/components/ui';
import { BlogPost } from '@prisma/client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Filter,
  Loader2,
  Search,
  TrendingUp,
  Users
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';


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

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  totalViews: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<Array<{name: string; count: number}>>([]);
  const [popularTags, setPopularTags] = useState<Array<{name: string; count: number}>>([]);
  const [stats, setStats] = useState<BlogStats>({ totalPosts: 0, publishedPosts: 0, totalViews: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blog posts
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '6',
        status: 'PUBLISHED',
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`/api/blogs?${params}`);
      const data: BlogResponse = await response.json();

      if (data.success) {
        setPosts(data.data.posts);
        setTotalPages(data.data.pagination.totalPages);
        
        // Set featured post (first post with highest views)
        if (data.data.posts.length > 0) {
          const featured = data.data.posts.reduce((prev, current) => 
            (prev.viewCount > current.viewCount) ? prev : current
          );
          setFeaturedPost(featured);
        }
      } else {
        setError('Blog yazıları yüklenemedi');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Blog yazıları yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedCategory]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      // This would need a new API endpoint
      // For now, extract from posts
      const categoryMap = posts.reduce((acc, post) => {
        if (post.category) {
          acc[post.category] = (acc[post.category] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const categoryList = Object.entries(categoryMap).map(([name, count]) => ({ name, count }));
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [posts]);

  // Fetch popular tags
  const fetchPopularTags = useCallback(async () => {
    try {
      // Extract from posts
      const allTags = posts.flatMap(post => post.tags);
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const tagList = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 8)
        .map(([name, count]) => ({ name, count }));
      
      setPopularTags(tagList);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }, [posts]);

  // Calculate stats
  const calculateStats = useCallback(() => {
    const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);
    setStats({
      totalPosts: posts.length,
      publishedPosts: posts.length, 
      totalViews,
    });
  }, [posts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (posts.length > 0) {
      fetchCategories();
      fetchPopularTags();
      calculateStats();
    }
  }, [posts, fetchCategories, fetchPopularTags, calculateStats]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setCurrentPage(1);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-gray-600">Blog yazıları yükleniyor...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Blog yazıları yüklenemedi</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={fetchPosts}>
              Tekrar Dene
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Henüz blog yazısı yok</h3>
            <p className="text-gray-600 mb-8">
              {searchTerm || selectedCategory 
                ? 'Arama kriterlerinize uygun blog yazısı bulunamadı.' 
                : 'Yakında blog yazıları yayınlanacak.'
              }
            </p>
            {(searchTerm || selectedCategory) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setCurrentPage(1);
                }}
              >
                Filtreleri Temizle
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 lg:px-24 py-20 pt-32">

        {/* Featured Article */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-900 to-purple-900 text-white">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 min-h-[400px]">
                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="success">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Öne Çıkan
                      </Badge>
                      {featuredPost.category && (
                        <Badge variant="outline" className="text-gray-300 border-gray-500">
                          {featuredPost.category}
                        </Badge>
                      )}
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {featuredPost.excerpt || featuredPost.title}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-400">
                      {featuredPost.publishedAt && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredPost.publishedAt).toLocaleDateString('tr-TR', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      )}
                      {featuredPost.readTime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime} dk okuma</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{featuredPost.viewCount.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button variant="secondary" size="lg" asChild>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Makaleyi Oku
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>

                  {/* Image */}
                  <div className="relative bg-gray-200 lg:ml-8 mt-8 lg:mt-0 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20" />
                    {featuredPost.coverImage ? (
                      <Image 
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-24 h-24 text-white/20" />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Category Filters */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCategory === '' ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleCategoryChange('')}
                    >
                      Tümü
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {stats.publishedPosts}
                      </Badge>
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        {category.name}
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Search */}
                <div className="flex items-center gap-3">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Blog yazılarında ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-w-[250px]"
                    />
                  </form>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrele
                  </Button>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{posts.length}</span> yazı gösteriliyor
                  {selectedCategory && (
                    <span> - <span className="font-medium">{selectedCategory}</span> kategorisinde</span>
                  )}
                  {searchTerm && (
                    <span> - <span className="font-medium">{searchTerm}</span> aramasında</span>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {posts.filter(post => post.id !== featuredPost?.id).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-md hover:shadow-lg transition-shadow group h-full">
                    <CardContent className="p-6">
                      {/* Cover Image */}
                      <div className="h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                        {post.coverImage ? (
                          <Image 
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {post.publishedAt && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}</span>
                            </div>
                          )}
                          {post.readTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime} dk</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.viewCount}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt || 'Özet bulunmuyor...'}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                          <Link href={`/blog/${post.slug}`}>
                            Devamını Oku
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1 || loading}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  Önceki
                </Button>
                
                <span className="text-sm text-gray-600">
                  Sayfa {currentPage} / {totalPages}
                </span>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === totalPages || loading}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  Sonraki
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Newsletter */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Newsletter
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Yeni yazılardan ve teknoloji güncellemelerinden haberdar olun
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="E-posta adresiniz"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Button size="sm" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Abone Ol
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Haftalık en fazla 1 email gönderiyoruz
                </p>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            {popularTags.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Popüler Etiketler
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <Badge 
                        key={tag.name}
                        variant="outline" 
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        onClick={() => setSearchTerm(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">📊 Blog İstatistikleri</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Toplam Yazı</span>
                    <span className="font-semibold">{stats.totalPosts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Toplam Okunma</span>
                    <span className="font-semibold">{stats.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Yayında</span>
                    <span className="font-semibold text-green-600">{stats.publishedPosts}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}