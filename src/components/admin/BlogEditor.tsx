// src/components/admin/BlogEditor.tsx
"use client";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { calculateReadingTime, generateSlug } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Eye,
  Globe,
  Loader2,
  Save,
  Send,
  Tag,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Blog form schema with comprehensive validation
const blogFormSchema = z.object({
  title: z.string().min(1, 'Başlık gerekli').max(200, 'Başlık 200 karakteri geçemez'),
  slug: z.string()
    .min(1, 'Slug gerekli')
    .max(100, 'Slug 100 karakteri geçemez')
    .regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
  excerpt: z.string()
    .max(300, 'Özet 300 karakteri geçemez')
    .optional(),
  content: z.string()
    .min(50, 'İçerik en az 50 karakter olmalı')
    .max(50000, 'İçerik 50.000 karakteri geçemez'),
  coverImage: z.string()
    .url('Geçerli bir URL giriniz')
    .optional()
    .or(z.literal('')),
  metaTitle: z.string()
    .max(70, 'Meta başlık 70 karakteri geçmemeli')
    .optional(),
  metaDescription: z.string()
    .max(160, 'Meta açıklama 160 karakteri geçmemeli')
    .optional(),
  keywords: z.array(z.string()).default([]),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  category: z.string()
    .max(50, 'Kategori 50 karakteri geçemez')
    .optional(),
  tags: z.array(z.string()).default([]),
  readTime: z.number().optional(),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

interface BlogEditorProps {
  postId?: string;
  isEdit?: boolean;
}

export default function BlogEditor({ postId, isEdit = false }: BlogEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [currentTag, setCurrentTag] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
    trigger,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      status: 'DRAFT',
      keywords: [],
      tags: [],
    },
    mode: 'onBlur',
  });

  const watchedValues = watch();
  const watchedTitle = watch('title');
  const watchedContent = watch('content');
  const watchedTags = watch('tags') || [];
  const watchedKeywords = watch('keywords') || [];
  const watchedSlug = watch('slug');

  // Auto-generate slug from title
  useEffect(() => {
    if (watchedTitle && !isEdit) {
      const slug = generateSlug(watchedTitle);
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [watchedTitle, setValue, isEdit]);

  // Calculate reading time
  useEffect(() => {
    if (watchedContent) {
      const readTime = calculateReadingTime(watchedContent);
      setValue('readTime', readTime);
    }
  }, [watchedContent, setValue]);

  // Load existing post data for editing
  useEffect(() => {
    if (isEdit && postId) {
      const loadPost = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/blogs/${postId}`);
          const data = await response.json();

          if (data.success) {
            reset({
              ...data.data,
              keywords: data.data.keywords || [],
              tags: data.data.tags || [],
              coverImage: data.data.coverImage || '',
            });
            setIsSaved(true);
            setLastSaved(new Date(data.data.updatedAt));
          } else {
            setMessage('Blog yazısı yüklenemedi: ' + data.message);
            setMessageType('error');
          }
        } catch (error) {
          console.error('Error loading post:', error);
          setMessage('Blog yazısı yüklenemedi');
          setMessageType('error');
        } finally {
          setIsLoading(false);
        }
      };

      loadPost();
    }
  }, [isEdit, postId, reset]);

  // Auto-save functionality
  useEffect(() => {
    const handleAutoSave = async () => {
      if (!isEdit || !postId) return;

      try {
        const formData = watchedValues;
        const response = await fetch(`/api/blogs/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setLastSaved(new Date());
          setIsSaved(true);
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    if (isDirty && !isSubmitting && isSaved && isEdit) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto save after 30 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [isDirty, isSubmitting, isSaved, isEdit, postId, watchedValues]);

  const handleAutoSave = async () => {
    if (!isEdit || !postId) return;

    try {
      const formData = watchedValues;
      const response = await fetch(`/api/blogs/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setLastSaved(new Date());
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    setMessage('');

    try {
      const url = isEdit ? `/api/blogs/${postId}` : '/api/blogs';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          isEdit 
            ? 'Blog yazısı başarıyla güncellendi!' 
            : 'Blog yazısı başarıyla oluşturuldu!'
        );
        setMessageType('success');
        setIsSaved(true);
        setLastSaved(new Date());
        
        setTimeout(() => {
          router.push('/admin/blogs');
        }, 2000);
      } else {
        setMessage(result.message || 'İşlem başarısız');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('Beklenmeyen bir hata oluştu');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setValue('status', 'DRAFT');
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handlePublish = async () => {
    setValue('status', 'PUBLISHED');
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleAddTag = () => {
    const trimmedTag = currentTag.trim();
    if (trimmedTag && !watchedTags.includes(trimmedTag) && watchedTags.length < 10) {
      setValue('tags', [...watchedTags, trimmedTag], { shouldValidate: true });
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove), { shouldValidate: true });
  };

  const handleAddKeyword = () => {
    const trimmedKeyword = currentKeyword.trim();
    if (trimmedKeyword && !watchedKeywords.includes(trimmedKeyword) && watchedKeywords.length < 10) {
      setValue('keywords', [...watchedKeywords, trimmedKeyword], { shouldValidate: true });
      setCurrentKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setValue('keywords', watchedKeywords.filter(keyword => keyword !== keywordToRemove), { shouldValidate: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent, type: 'tag' | 'keyword') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'tag') {
        handleAddTag();
      } else {
        handleAddKeyword();
      }
    }
  };

  const getCharacterCount = (text: string, limit: number) => {
    const count = text?.length || 0;
    const isOverLimit = count > limit;
    return {
      count,
      limit,
      isOverLimit,
      percentage: (count / limit) * 100,
    };
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Blog yazısı yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/blogs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEdit ? 'Blog Yazısını Düzenle' : 'Yeni Blog Yazısı'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEdit ? 'Mevcut blog yazınızı güncelleyin' : 'Yeni bir blog yazısı oluşturun'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {watchedValues.readTime && (
            <Badge variant="secondary">
              <BookOpen className="w-3 h-3 mr-1" />
              {watchedValues.readTime} dk okuma
            </Badge>
          )}
          <Badge variant={watchedValues.status === 'PUBLISHED' ? 'success' : 'secondary'}>
            {watchedValues.status === 'PUBLISHED' ? 'Yayında' : 
             watchedValues.status === 'ARCHIVED' ? 'Arşivlendi' : 'Taslak'}
          </Badge>
          {lastSaved && (
            <Badge variant="outline" className="text-xs">
              Son kayıt: {lastSaved.toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Badge>
          )}
        </div>
      </div>

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-lg p-4 flex items-center justify-between ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center">
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-3" />
              ) : (
                <X className="w-5 h-5 mr-3" />
              )}
              <span>{message}</span>
            </div>
            <button
              onClick={() => setMessage('')}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('title')}
                    type="text"
                    placeholder="Blog yazısının başlığı"
                    className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg ${
                      errors.title ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{getCharacterCount(watchedTitle, 200).count} / 200 karakter</span>
                    {getCharacterCount(watchedTitle, 200).isOverLimit && (
                      <span className="text-red-500">Karakter sınırı aşıldı!</span>
                    )}
                  </div>
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('slug')}
                    type="text"
                    placeholder="blog-yazisi-url-slug"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm ${
                      errors.slug ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                  )}
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-500 text-sm flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      /blog/{watchedSlug || 'slug'}
                    </p>
                    <span className="text-sm text-gray-500">
                      {getCharacterCount(watchedSlug, 100).count} / 100
                    </span>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Özet
                  </label>
                  <textarea
                    {...register('excerpt')}
                    rows={3}
                    placeholder="Blog yazısının kısa özeti (SEO ve sosyal medya paylaşımları için önemli)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>SEO ve sosyal medya için önerilir</span>
                    <span>{getCharacterCount(watchedValues.excerpt || '', 300).count} / 300</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İçerik <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('content')}
                    rows={20}
                    placeholder="Blog yazısının içeriğini buraya yazın... Markdown formatında yazabilirsiniz."
                    className={`w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm leading-relaxed ${
                      errors.content ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{getCharacterCount(watchedContent, 50000).count} karakter</span>
                    <span>~{watchedValues.readTime || 0} dakika okuma süresi</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Başlık
                  </label>
                  <input
                    {...register('metaTitle')}
                    type="text"
                    placeholder="SEO için özel başlık (boş bırakılırsa ana başlık kullanılır)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Google arama sonuçlarında gösterilir</span>
                    <span className={getCharacterCount(watchedValues.metaTitle || '', 70).isOverLimit ? 'text-red-500' : ''}>
                      {getCharacterCount(watchedValues.metaTitle || '', 70).count} / 70
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Açıklama
                  </label>
                  <textarea
                    {...register('metaDescription')}
                    rows={3}
                    placeholder="SEO için özel açıklama (160 karakter önerilir)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Google arama sonuçlarında açıklama olarak gösterilir</span>
                    <span className={getCharacterCount(watchedValues.metaDescription || '', 160).isOverLimit ? 'text-red-500' : ''}>
                      {getCharacterCount(watchedValues.metaDescription || '', 160).count} / 160
                    </span>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SEO Anahtar Kelimeleri
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, 'keyword')}
                      placeholder="Anahtar kelime ekle"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      maxLength={50}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddKeyword} 
                      variant="outline"
                      disabled={!currentKeyword.trim() || watchedKeywords.length >= 10}
                    >
                      Ekle
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {watchedKeywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                        {keyword}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-500" 
                          onClick={() => handleRemoveKeyword(keyword)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    En fazla 10 anahtar kelime ekleyebilirsiniz ({watchedKeywords.length}/10)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Yayın Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durum
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="DRAFT">📝 Taslak</option>
                    <option value="PUBLISHED">🟢 Yayında</option>
                    <option value="ARCHIVED">📦 Arşivlendi</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    {watchedValues.status === 'PUBLISHED' 
                      ? 'Blog yazınız herkese açık olacak' 
                      : watchedValues.status === 'ARCHIVED'
                      ? 'Blog yazınız arşivlendi, görünmez'
                      : 'Blog yazınız sadece size görünür'
                    }
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <input
                    {...register('category')}
                    type="text"
                    placeholder="Frontend, Backend, DevOps..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    list="categories"
                  />
                  <datalist id="categories">
                    <option value="Frontend" />
                    <option value="Backend" />
                    <option value="DevOps" />
                    <option value="AI/ML" />
                    <option value="Database" />
                    <option value="Mobile" />
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kapak Resmi URL
                  </label>
                  <input
                    {...register('coverImage')}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                      errors.coverImage ? 'border-red-300' : ''
                    }`}
                  />
                  {errors.coverImage && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverImage.message}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Blog listesinde ve sosyal medya paylaşımlarında gösterilir
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Etiketler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'tag')}
                    placeholder="Etiket ekle"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    maxLength={30}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddTag} 
                    variant="outline"
                    disabled={!currentTag.trim() || watchedTags.length >= 10}
                  >
                    Ekle
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {watchedTags.map((tag) => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  En fazla 10 etiket ekleyebilirsiniz ({watchedTags.length}/10)
                </p>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Önizleme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Cover Image Preview */}
                  {watchedValues.coverImage && (
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={watchedValues.coverImage} 
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-primary line-clamp-2 text-lg">
                      {watchedValues.title || 'Blog Başlığı'}
                    </h3>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {watchedValues.excerpt || 
                       watchedValues.content?.substring(0, 150) + '...' || 
                       'Blog yazısının özeti burada görünecek...'}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{watchedValues.readTime || 0} dk okuma</span>
                    {watchedValues.category && (
                      <>
                        <span>•</span>
                        <span>{watchedValues.category}</span>
                      </>
                    )}
                  </div>
                  
                  {watchedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {watchedTags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {watchedTags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{watchedTags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Writing Stats */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Yazı İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Kelime Sayısı</span>
                    <span className="font-medium">
                      {watchedContent ? watchedContent.trim().split(/\s+/).length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Karakter Sayısı</span>
                    <span className="font-medium">
                      {watchedContent?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Paragraf Sayısı</span>
                    <span className="font-medium">
                      {watchedContent ? watchedContent.split('\n\n').filter(p => p.trim()).length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tahmini Okuma</span>
                    <span className="font-medium">
                      {watchedValues.readTime || 0} dakika
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SEO Skoru</span>
                    <span className="font-medium">
                      {(() => {
                        let score = 0;
                        if (watchedValues.title && watchedValues.title.length > 10) score += 20;
                        if (watchedValues.excerpt && watchedValues.excerpt.length > 50) score += 20;
                        if (watchedValues.metaDescription && watchedValues.metaDescription.length > 100) score += 15;
                        if (watchedKeywords.length > 0) score += 15;
                        if (watchedTags.length > 0) score += 10;
                        if (watchedValues.category) score += 10;
                        if (watchedValues.coverImage) score += 10;
                        return score;
                      })()}/100
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>💡 SEO Önerileri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {!watchedValues.metaDescription && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <span>⚠️</span>
                      <span>Meta açıklama eklemeyi unutmayın</span>
                    </div>
                  )}
                  {watchedKeywords.length === 0 && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <span>⚠️</span>
                      <span>Anahtar kelimeler SEO için önemli</span>
                    </div>
                  )}
                  {!watchedValues.coverImage && (
                    <div className="flex items-start gap-2 text-sm text-blue-600">
                      <span>💡</span>
                      <span>Kapak resmi sosyal medya paylaşımları için önerilir</span>
                    </div>
                  )}
                  {watchedValues.title && watchedValues.title.length > 60 && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <span>⚠️</span>
                      <span>Başlık SEO için biraz uzun olabilir</span>
                    </div>
                  )}
                  {watchedValues.content && watchedValues.content.length < 300 && (
                    <div className="flex items-start gap-2 text-sm text-orange-600">
                      <span>⚠️</span>
                      <span>İçerik SEO için daha uzun olabilir</span>
                    </div>
                  )}
                  {watchedValues.title && 
                   watchedValues.metaDescription && 
                   watchedKeywords.length > 0 && 
                   watchedValues.coverImage && 
                   watchedValues.content && 
                   watchedValues.content.length > 500 && (
                    <div className="flex items-start gap-2 text-sm text-green-600">
                      <span>✅</span>
                      <span>SEO optimizasyonu harika görünüyor!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 z-10">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {isDirty && !isSubmitting && (
                <span className="text-orange-600 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse" />
                  Kaydedilmemiş değişiklikler
                </span>
              )}
              {lastSaved && (
                <span>
                  Son kayıt: {lastSaved.toLocaleString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: '2-digit'
                  })}
                </span>
              )}
              {!lastSaved && !isEdit && (
                <span>Henüz kaydedilmedi</span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/blogs">
                  İptal
                </Link>
              </Button>
              
              <Button 
                type="button" 
                onClick={handleSaveDraft}
                disabled={isSubmitting}
                variant="outline"
                className="min-w-[120px]"
              >
                {isSubmitting && watchedValues.status === 'DRAFT' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Taslak Kaydet
                  </>
                )}
              </Button>
              
              <Button 
                type="button" 
                onClick={handlePublish}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 min-w-[120px]"
              >
                {isSubmitting && watchedValues.status === 'PUBLISHED' ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Yayınlanıyor...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {watchedValues.status === 'PUBLISHED' ? 'Güncelle ve Yayınla' : 'Yayınla'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}