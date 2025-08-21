# Barış Mercan Portfolio Projesi

## Proje Genel Bilgileri

**Proje Adı:** Barış Mercan Portfolio Website  
**Teknoloji:** Next.js 14 + TypeScript + Tailwind CSS  
**Mimari:** DDD (Domain Driven Design)  
**Backend:** Node.js + Express + JWT  
**Mail Servisi:** Nodemailer  
**Veritabanı:** MongoDB/PostgreSQL  

## Özellikler

### Frontend Özellikleri
- ✅ Tam responsive tasarım
- ✅ Modern ve interaktif UI/UX
- ✅ Smooth animasyonlar
- ✅ Portfolio showcase
- ✅ Blog sistemi
- ✅ İletişim formu
- ✅ Çoklu dil desteği (TR/EN)
- ✅ SEO optimizasyonu
- ✅ Dark/Light theme

### Backend Özellikleri
- ✅ JWT Authentication
- ✅ Email doğrulama sistemi
- ✅ Admin panel
- ✅ Blog yönetimi
- ✅ İletişim formu yönetimi
- ✅ Mail bildirimleri
- ✅ Rate limiting
- ✅ Input validation

## Teknoloji Stack

### Frontend
```typescript
- Next.js 14 (App Router)
- TypeScript (Strict mode)
- Tailwind CSS
- Framer Motion (Animasyonlar)
- React Hook Form + Zod (Form validation)
- Lucide React (Icons)
- next-intl (Çoklu dil)
```

### Backend
```typescript
- Node.js + Express
- TypeScript
- JWT (Authentication)
- Nodemailer (Mail service)
- MongoDB/Prisma ORM
- Express Validator
- Rate Limiting
- Helmet (Security)
```

## DDD Klasör Yapısı

```
baris-mercan-portfolio/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   ├── blogs/
│   │   │   ├── messages/
│   │   │   └── settings/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   ├── portfolio/
│   │   ├── services/
│   │   ├── contact/
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/
│   │   │   ├── blogs/
│   │   │   ├── contact/
│   │   │   └── admin/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/                   # Shared Components
│   │   ├── ui/                      # Base UI Components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   └── index.ts
│   │   ├── layout/                  # Layout Components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── sections/                # Page Sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Blog.tsx
│   │   ├── forms/                   # Form Components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── BlogForm.tsx
│   │   │   └── SubscribeForm.tsx
│   │   └── common/                  # Common Components
│   │       ├── Loading.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── LanguageToggle.tsx
│   ├── lib/                         # Utilities & Config
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── mail.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── validations.ts
│   │   └── middleware.ts
│   ├── hooks/                       # Custom Hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useApi.ts
│   ├── store/                       # State Management
│   │   ├── authStore.ts
│   │   ├── themeStore.ts
│   │   └── globalStore.ts
│   ├── types/                       # TypeScript Types
│   │   ├── auth.types.ts
│   │   ├── blog.types.ts
│   │   ├── contact.types.ts
│   │   ├── admin.types.ts
│   │   └── global.types.ts
│   └── styles/                      # Styles
│       ├── globals.css
│       └── components.css
├── public/                          # Static Assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── docs/                           # Documentation
├── prisma/                         # Database Schema
│   ├── schema.prisma
│   └── migrations/
├── messages/                       # i18n Messages
│   ├── tr.json
│   └── en.json
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Sayfa Yapısı ve Özellikler

### 1. Ana Sayfa (/)
```typescript
// Bölümler:
- Hero Section (Barış Mercan tanıtımı)
- About Section (Elite Developer Certified badge)
- Skills Section (Frontend, Backend, Cloud technologies)
- Portfolio Section (Öne çıkan projeler)
- Services Section (Hizmet paketleri)
- Blog Section (Son blog yazıları)
- Contact Section (İletişim formu)
```

### 2. Admin Panel (/admin)
```typescript
// Özellikler:
- Dashboard (İstatistikler)
- Blog Management (CRUD)
- Message Management (İletişim formundan gelen mesajlar)
- Settings (Site ayarları)
- User Management
```

### 3. Blog Sistemi (/blog)
```typescript
// Özellikler:
- Blog listesi
- Blog detay sayfası
- Kategori filtreleme
- Arama fonksiyonu
- SEO optimizasyonu
```

## TypeScript Tipleri

### Core Types

```typescript
// src/types/global.types.ts
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### Auth Types
```typescript
// src/types/auth.types.ts
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: UserRole;
  isEmailVerified: boolean;
  avatar?: string;
}

export type UserRole = 'admin' | 'user';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
```

### Blog Types
```typescript
// src/types/blog.types.ts
export interface BlogPost extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  category: BlogCategory;
  author: User;
  isPublished: boolean;
  publishedAt?: Date;
  viewCount: number;
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogCategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  color: string;
}

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  categoryId: string;
  isPublished: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
```

### Contact Types
```typescript
// src/types/contact.types.ts
export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  budget?: BudgetRange;
  projectType: ProjectType;
  isRead: boolean;
  isReplied: boolean;
  priority: MessagePriority;
}

export type BudgetRange = 
  | '500-1500'
  | '1500-5000'
  | '5000-15000'
  | '15000-50000'
  | '50000+';

export type ProjectType = 
  | 'web-development'
  | 'mobile-app'
  | 'consulting'
  | 'maintenance'
  | 'other';

export type MessagePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  budget?: BudgetRange;
  projectType: ProjectType;
}
```

## API Endpoints

### Authentication API
```typescript
// POST /api/auth/login
// POST /api/auth/register
// POST /api/auth/logout
// POST /api/auth/refresh
// POST /api/auth/verify-email
// POST /api/auth/forgot-password
// POST /api/auth/reset-password
```

### Blog API
```typescript
// GET /api/blogs
// GET /api/blogs/[slug]
// POST /api/blogs (Admin only)
// PUT /api/blogs/[id] (Admin only)
// DELETE /api/blogs/[id] (Admin only)
// GET /api/blogs/categories
```

### Contact API
```typescript
// POST /api/contact
// GET /api/admin/messages (Admin only)
// PUT /api/admin/messages/[id] (Admin only)
// DELETE /api/admin/messages/[id] (Admin only)
```

### Admin API
```typescript
// GET /api/admin/dashboard
// GET /api/admin/stats
// PUT /api/admin/settings
```

## Validasyon Şemaları (Zod)

```typescript
// src/lib/validations.ts
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Konu en az 5 karakter olmalı'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
  budget: z.enum(['500-1500', '1500-5000', '5000-15000', '15000-50000', '50000+']).optional(),
  projectType: z.enum(['web-development', 'mobile-app', 'consulting', 'maintenance', 'other'])
});

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı')
});

export const blogSchema = z.object({
  title: z.string().min(5, 'Başlık en az 5 karakter olmalı'),
  content: z.string().min(100, 'İçerik en az 100 karakter olmalı'),
  excerpt: z.string().min(10, 'Özet en az 10 karakter olmalı'),
  tags: z.array(z.string()).min(1, 'En az bir etiket eklemelisiniz'),
  categoryId: z.string().min(1, 'Kategori seçmelisiniz'),
  isPublished: z.boolean(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});
```

## Database Schema (Prisma)

```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id               String    @id @default(cuid())
  email            String    @unique
  name             String
  password         String
  role             UserRole  @default(USER)
  isEmailVerified  Boolean   @default(false)
  avatar           String?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  
  // Relations
  blogPosts        BlogPost[]
  sessions         Session[]
  
  @@map("users")
}

model BlogPost {
  id              String      @id @default(cuid())
  title           String
  slug            String      @unique
  content         String
  excerpt         String
  coverImage      String?
  tags            String[]
  isPublished     Boolean     @default(false)
  publishedAt     DateTime?
  viewCount       Int         @default(0)
  readingTime     Int
  seoTitle        String?
  seoDescription  String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  
  // Relations
  author          User        @relation(fields: [authorId], references: [id])
  authorId        String
  category        BlogCategory @relation(fields: [categoryId], references: [id])
  categoryId      String
  
  @@map("blog_posts")
}

model BlogCategory {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  color       String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  // Relations
  posts       BlogPost[]
  
  @@map("blog_categories")
}

model ContactMessage {
  id          String          @id @default(cuid())
  name        String
  email       String
  phone       String?
  subject     String
  message     String
  budget      BudgetRange?
  projectType ProjectType
  isRead      Boolean         @default(false)
  isReplied   Boolean         @default(false)
  priority    MessagePriority @default(MEDIUM)
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  
  @@map("contact_messages")
}

model Session {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("sessions")
}

enum UserRole {
  ADMIN
  USER
}

enum BudgetRange {
  RANGE_500_1500
  RANGE_1500_5000
  RANGE_5000_15000
  RANGE_15000_50000
  RANGE_50000_PLUS
}

enum ProjectType {
  WEB_DEVELOPMENT
  MOBILE_APP
  CONSULTING
  MAINTENANCE
  OTHER
}

enum MessagePriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
```

## Environment Variables

```bash
# .env.example
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/baris_mercan_portfolio"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="30d"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@barismercan.com"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Site
SITE_URL="http://localhost:3000"
ADMIN_EMAIL="admin@barismercan.com"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880 # 5MB
UPLOAD_DIR="public/uploads"
```

## Güvenlik Önlemleri

### 1. Authentication & Authorization
```typescript
// JWT token doğrulama
// Role-based access control
// Email doğrulama
// Rate limiting
// CSRF protection
```

### 2. Input Validation
```typescript
// Zod schema validation
// SQL injection prevention
// XSS protection
// File upload validation
```

### 3. Security Headers
```typescript
// Helmet.js kullanımı
// Content Security Policy
// HTTPS enforcement
// CORS configuration
```

## Performans Optimizasyonları

### 1. Frontend
```typescript
// Next.js Image optimization
// Code splitting
// Lazy loading
// Caching strategies
// Bundle optimization
```

### 2. Backend
```typescript
// Database indexing
// Query optimization
// Caching (Redis)
// Compression
// CDN integration
```

## Testing Strategy

### 1. Unit Tests
```typescript
// Components testing (Jest + RTL)
// Utility functions testing
// API endpoints testing
// Database operations testing
```

### 2. Integration Tests
```typescript
// API flow testing
// Authentication testing
// Email functionality testing
// Form submission testing
```

### 3. E2E Tests
```typescript
// User journey testing (Playwright)
// Admin panel testing
// Contact form testing
// Blog functionality testing
```

## Deployment

### 1. Vercel Deployment
```typescript
// Next.js optimized deployment
// Environment variables setup
// Database connection
// Email service configuration
```

### 2. Database
```typescript
// PostgreSQL on Railway/Supabase
// Prisma migrations
// Data seeding
// Backup strategy
```

### 3. Monitoring
```typescript
// Error tracking (Sentry)
// Performance monitoring
// Uptime monitoring
// Analytics (Google Analytics)
```

## Development Workflow

### 1. Git Strategy
```bash
main -> develop -> feature/feature-name
# Feature branch workflow
# Conventional commits
# Pull request reviews
```

### 2. Code Quality
```typescript
// ESLint + Prettier
// Husky pre-commit hooks
// TypeScript strict mode
// Code review checklist
```

### 3. CI/CD Pipeline
```yaml
# GitHub Actions
# Automated testing
# Build verification
# Deployment automation
```

## İletişim Form Özellikleri

### 1. Form Alanları
- Ad Soyad (zorunlu)
- E-posta (zorunlu)
- Telefon (opsiyonel)
- Proje tipi (seçmeli)
- Bütçe aralığı (seçmeli)
- Mesaj (zorunlu)

### 2. Form Validasyonu
- Real-time validation
- Error handling
- Success feedback
- Loading states

### 3. Email Notifications
- Admin'e yeni mesaj bildirimi
- Kullanıcıya otomatik yanıt
- Email templates
- HTML/Text formatları

## Blog Sistemi Özellikleri

### 1. Yazı Yönetimi
- Rich text editor (WYSIWYG)
- Draft/Published states
- SEO meta fields
- Image upload
- Tag system
- Category management

### 2. Blog Features
- Responsive design
- Reading time calculation
- View counter
- Social sharing
- Related posts
- Comments system (opsiyonel)

## Admin Panel Özellikleri

### 1. Dashboard
- Site istatistikleri
- Son mesajlar
- Blog yazı sayıları
- Ziyaretçi analitikleri

### 2. Mesaj Yönetimi
- Mesaj listesi
- Mesaj detayları
- Okundu/Okunmadı durumu
- Yanıtlandı işaretleme
- Silme işlemi
- Filtreleme ve arama

### 3. Blog Yönetimi
- Yazı listesi
- Yeni yazı ekleme
- Yazı düzenleme
- Yazı silme
- Kategori yönetimi
- Tag yönetimi

## Çoklu Dil Desteği

### 1. Desteklenen Diller
- Türkçe (TR)
- İngilizce (EN)

### 2. Translation Files
```typescript
// messages/tr.json
{
  "nav": {
    "home": "Ana Sayfa",
    "about": "Hakkımda",
    "portfolio": "Portfolio",
    "services": "Hizmetler",
    "blog": "Blog",
    "contact": "İletişim"
  },
  "hero": {
    "title": "Barış Mercan",
    "subtitle": "The Code Architect",
    "description": "Yarının dijital gerçekliğini bugünden inşa eden elit full-stack geliştirici."
  }
}
```

## SEO Optimizasyonları

### 1. Technical SEO
- Meta tags optimization
- Structured data
- XML sitemap
- Robots.txt
- Open Graph tags
- Twitter Cards

### 2. Performance SEO
- Core Web Vitals optimization
- Image optimization
- Lazy loading
- Minification
- Compression

### 3. Content SEO
- Blog post optimization
- Internal linking
- URL structure
- Breadcrumbs
- Schema markup

## Geliştirme Adımları

### Faz 1: Temel Yapı (1-2 hafta)
1. Next.js projesi kurulumu
2. Klasör yapısı oluşturma
3. TypeScript konfigürasyonu
4. Tailwind CSS kurulumu
5. Temel layout componentleri

### Faz 2: Frontend Development (2-3 hafta)
1. Ana sayfa componentleri
2. Responsive tasarım
3. Animasyonlar
4. Form componentleri
5. Blog sayfa tasarımları

### Faz 3: Backend Development (2 hafta)
1. Database schema
2. Authentication system
3. API endpoints
4. Email service
5. Admin panel backend

### Faz 4: Admin Panel (1-2 hafta)
1. Admin dashboard
2. Blog yönetimi
3. Mesaj yönetimi
4. Kullanıcı yönetimi

### Faz 5: Testing & Deployment (1 hafta)
1. Unit tests
2. Integration tests
3. Performance optimization
4. Production deployment
5. Monitoring setup

## Sonuç

Bu proje, modern web geliştirme standartlarına uygun, ölçeklenebilir ve maintainable bir portfolio website olacak. DDD prensiplerine uygun klasör yapısı, TypeScript'in strict kullanımı ve kapsamlı güvenlik önlemleri ile profesyonel bir sonuç elde edilecek.

Projenin başarılı bir şekilde tamamlanması için yukarıda belirtilen tüm adımların titizlikle takip edilmesi ve kod kalitesinin sürekli kontrol edilmesi gerekiyor.