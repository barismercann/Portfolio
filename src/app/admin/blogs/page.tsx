"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Edit3,
  Eye,
  FileText,
  Plus,
  Save,
  Search,
  Tag,
  Trash2,
  TrendingUp,
  X
} from 'lucide-react';
import { useState } from 'react';

// Mock blog data - Bu gerçek projede API'den gelecek
const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'Next.js 15\'te Gelen Devrim Niteliğinde Yenilikler',
    slug: 'nextjs-15-yenilikleri',
    excerpt: 'React Server Components\'tan Turbopack\'e kadar Next.js 15\'in performans ve geliştirici deneyimini nasıl dönüştürdüğünü keşfedin.',
    content: `# Next.js 15'te Gelen Devrim Niteliğinde Yenilikler

Next.js 15 ile web geliştirme dünyasında yeni bir dönem başlıyor...`,
    status: 'PUBLISHED' as const,
    category: 'Frontend',
    tags: ['Next.js', 'React', 'Performance'],
    publishedAt: new Date('2024-12-15'),
    createdAt: new Date('2024-12-14'),
    updatedAt: new Date('2024-12-15'),
    readTime: 8,
    viewCount: 1250,
    featured: true
  },
  {
    id: '2',
    title: 'TypeScript\'te İleri Seviye Design Pattern\'lar',
    slug: 'typescript-advanced-patterns',
    excerpt: 'Enterprise uygulamalarda TypeScript ile güçlü, tip-güvenli mimari yapıları nasıl oluşturacağınızı öğrenin.',
    content: '# TypeScript Design Patterns\n\nBu yazıda...',
    status: 'DRAFT' as const,
    category: 'Backend',
    tags: ['TypeScript', 'Design Patterns'],
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-12'),
    readTime: 12,
    viewCount: 0,
    featured: false
  },
  {
    id: '3',
    title: 'Modern Web Uygulamalarında AI Entegrasyonu',
    slug: 'ai-integration-web-apps',
    excerpt: 'OpenAI, Claude ve diğer AI modellerini web uygulamalarınıza nasıl entegre edeceğinizi pratik örneklerle anlatıyorum.',
    content: '# AI Integration Guide\n\nYapay zeka...',
    status: 'PUBLISHED' as const,
    category: 'AI/ML',
    tags: ['AI', 'OpenAI', 'Integration'],
    publishedAt: new Date('2024-12-05'),
    createdAt: new Date('2024-12-03'),
    updatedAt: new Date('2024-12-05'),
    readTime: 15,
    viewCount: 1456,
    featured: false
  }
];

const CATEGORIES = ['Frontend', 'Backend', 'AI/ML', 'DevOps', 'Mobile'];
const AVAILABLE_TAGS = ['React', 'Next.js', 'TypeScript', 'Node.js', 'AI', 'DevOps', 'Performance', 'Design Patterns'];

type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

// Blog Editor Modal Component
function BlogEditorModal({ 
  post, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  post?: typeof MOCK_BLOG_POSTS[0] | null, 
  isOpen: boolean, 
  onClose: () => void,
  onSave: (postData: any) => void 
}) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || 'Frontend',
    tags: post?.tags || [],
    status: post?.status || 'DRAFT' as PostStatus,
    featured: post?.featured || false,
  });

  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    onSave({
      ...post,
      ...formData,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      updatedAt: new Date(),
      readTime: Math.ceil(formData.content.split(' ').length / 200), // Estimate reading time
    });
    onClose();
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">
            {post ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-140px)]">
          {/* Form Sidebar */}
          <div className="w-80 border-r p-6 overflow-y-auto bg-gray-50">
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold mb-2">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Blog yazısının başlığı..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">URL Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="url-slug-ornek"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Özet</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Blog yazısının kısa özeti..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Kategori</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold mb-2">Etiketler</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Etiket ekle..."
                  />
                  <Button onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <button 
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">Popüler etiketler:</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {AVAILABLE_TAGS.filter(tag => !formData.tags.includes(tag)).map(tag => (
                    <button
                      key={tag}
                      onClick={() => setFormData({ ...formData, tags: [...formData.tags, tag] })}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold mb-2">Durum</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PostStatus })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="DRAFT">Taslak</option>
                  <option value="PUBLISHED">Yayınlı</option>
                  <option value="ARCHIVED">Arşiv</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="featured" className="text-sm font-semibold">Öne çıkan yazı</label>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div>
              <label className="block text-sm font-semibold mb-2">İçerik (Markdown)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full h-full min-h-[500px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-none"
                placeholder="# Blog Yazısının Başlığı

                İçeriğinizi Markdown formatında yazın...

                ## Alt Başlık

                Paragraf metni burada...

                ```javascript
                // Kod örnekleri
                console.log('Hello, World!');
                ```"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-500">
            Son kaydedilme: {post?.updatedAt ? new Date(post.updatedAt).toLocaleString('tr-TR') : 'Henüz kaydedilmedi'}
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>İptal</Button>
            <Button 
              onClick={() => setFormData({ ...formData, status: 'DRAFT' })}
              variant="secondary"
            >
              <Save className="w-4 h-4 mr-2" />
              Taslak Kaydet
            </Button>
            <Button onClick={handleSave}>
              <FileText className="w-4 h-4 mr-2" />
              {formData.status === 'PUBLISHED' ? 'Yayınla' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState(MOCK_BLOG_POSTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PostStatus | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof MOCK_BLOG_POSTS[0] | null>(null);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'ALL' || post.status === selectedStatus;
    const matchesCategory = selectedCategory === 'ALL' || post.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Statistics
  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'PUBLISHED').length,
    drafts: posts.filter(p => p.status === 'DRAFT').length,
    totalViews: posts.reduce((sum, p) => sum + p.viewCount, 0),
  };

  const handleEditPost = (post: typeof MOCK_BLOG_POSTS[0]) => {
    setEditingPost(post);
    setIsEditorOpen(true);
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsEditorOpen(true);
  };

  const handleSavePost = (postData: any) => {
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(p => p.id === editingPost.id ? { ...postData, id: editingPost.id } : p));
    } else {
      // Create new post
      setPosts([...posts, { ...postData, id: Date.now().toString(), createdAt: new Date() }]);
    }
  };

  const getStatusBadge = (status: PostStatus) => {
    const config = {
      'DRAFT': { text: 'Taslak', color: 'bg-gray-100 text-gray-800' },
      'PUBLISHED': { text: 'Yayınlı', color: 'bg-green-100 text-green-800' },
      'ARCHIVED': { text: 'Arşiv', color: 'bg-orange-100 text-orange-800' },
    };
    return config[status];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Yönetimi</h1>
          <p className="text-gray-600 mt-1">
            Blog yazılarınızı oluşturun, düzenleyin ve yayınlayın
          </p>
        </div>
        <Button onClick={handleCreatePost} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-5 h-5 mr-2" />
          Yeni Yazı
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Yazı</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Yayınlı</p>
                <p className="text-3xl font-bold text-green-600">{stats.published}</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Taslaklar</p>
                <p className="text-3xl font-bold text-orange-600">{stats.drafts}</p>
              </div>
              <Edit3 className="w-8 h-8 text-orange-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Görüntülenme</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Yazı başlığı veya içeriğinde ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as PostStatus | 'ALL')}
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">Tüm Durumlar</option>
                <option value="DRAFT">Taslaklar</option>
                <option value="PUBLISHED">Yayınlı</option>
                <option value="ARCHIVED">Arşiv</option>
              </select>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ALL">Tüm Kategoriler</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Blog Yazıları ({filteredPosts.length})</span>
            <div className="text-sm text-gray-500">
              {filteredPosts.length} yazı görüntüleniyor
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Blog yazısı bulunamadı</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'Arama kriterlerinize uygun yazı bulunamadı.' : 'Henüz blog yazınız yok.'}
              </p>
              <Button onClick={handleCreatePost}>
                <Plus className="w-4 h-4 mr-2" />
                İlk Yazınızı Oluşturun
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <Badge className={`text-xs ${getStatusBadge(post.status).color}`}>
                          {getStatusBadge(post.status).text}
                        </Badge>
                        {post.featured && (
                          <Badge className="text-xs bg-yellow-100 text-yellow-800">
                            ⭐ Öne Çıkan
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          <span>{post.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {post.publishedAt 
                              ? new Date(post.publishedAt).toLocaleDateString('tr-TR')
                              : 'Yayınlanmamış'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.viewCount.toLocaleString()} görüntülenme</span>
                        </div>
                        <div>
                          {post.readTime} dk okuma
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Düzenle
                      </Button>
                      
                      {post.status === 'PUBLISHED' && (
                        <Button variant="ghost" size="sm" asChild>
                          <a 
                            href={`/blog/${post.slug}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                    <div className="text-xs text-gray-500">
                      Son güncelleme: {new Date(post.updatedAt).toLocaleString('tr-TR')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                        Kopyala
                      </Button>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                        Arşivle
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blog Editor Modal */}
      <BlogEditorModal
        post={editingPost}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingPost(null);
        }}
        onSave={handleSavePost}
      />
    </div>
  );
}