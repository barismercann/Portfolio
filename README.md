# Barış Mercan Portfolio Website

> Modern, responsive ve performanslı portfolio web sitesi - **Production Ready** 🚀

## 🌟 Özellikler

- ✅ **Tam Responsive Tasarım** - Mobil, tablet ve desktop optimizasyonu
- ✅ **Modern UI/UX** - Framer Motion animasyonları ile 
- ✅ **Portfolio Showcase** - Detaylı proje case study'leri
- ✅ **Çalışan İletişim Sistemi** - Email entegrasyonu ile
- ✅ **SEO Optimize** - Google'da üst sıralarda görünüm için
- ✅ **Yüksek Performans** - Next.js 15 ve optimizasyonlar

## 🛠️ Teknoloji Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript (Strict Mode)
- Tailwind CSS v3
- Framer Motion
- React Hook Form + Zod
- Lucide React Icons

**Backend:**
- Node.js API Routes
- Nodemailer (Email Service)
- Zod Validation
- TypeScript

**Tools & Deploy:**
- ESLint + Prettier
- Vercel (Deployment)
- Git (Version Control)

## 🚀 Canlı Demo

🔗 **[barismercan.com](https://barismercan.com)** *(Coming Soon)*

## 📋 Öne Çıkan Sayfalar

1. **Ana Sayfa** (`/`) - Hero, About, Portfolio, Services, Contact
2. **Portfolio** (`/portfolio`) - Tüm projeler, filtreleme, case studies  
3. **Proje Detayları** (`/portfolio/[slug]`) - Detaylı proje analizleri
4. **İletişim** (`/contact`) - Kapsamlı iletişim seçenekleri + proje formu
5. **Blog** (`/blog`) - Coming soon, teknik yazılar

## 🔥 Öne Çıkan Özellikler

### 📱 Full Responsive
- Mobile-first tasarım yaklaşımı
- Tablet ve desktop optimizasyonları
- Cross-browser uyumluluk

### ⚡ Performans
- Next.js 15 App Router
- Image optimization
- Lazy loading
- Bundle optimization

### 📧 Email Sistemi
- Otomatik project start form emails
- Admin bildirimleri
- Auto-reply sistemi
- HTML email templates

### 🎨 Modern UI
- Gradient backgrounds
- Smooth animasyonlar (Framer Motion)
- Interactive hover effects
- Dark theme support (form areas)

## 🚀 Hızlı Başlangıç

```bash
# Repository klonla
git clone https://github.com/barismercann/portfolio-website.git
cd portfolio-website

# Dependencies kur
npm install

# Environment variables ayarla
cp .env.example .env.local
# .env.local dosyasını kendi SMTP ayarlarınla güncelle

# Development server başlat
npm run dev

# http://localhost:3000 adresini aç
```

## ⚙️ Environment Variables

```bash
# Email Service (Required)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com

# App Settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📂 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── contact/           # İletişim sayfası
│   ├── portfolio/         # Portfolio sayfaları
│   ├── blog/             # Blog sayfaları
│   └── api/              # API endpoints
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── sections/         # Page sections
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                   # Utilities & config
├── types/                 # TypeScript types
└── i18n/                 # Internationalization
```

## 🔧 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

## ✨ Öne Çıkan Componentler

### 1. Project Start Form
- Multi-step validation
- Email integration
- Real-time feedback
- Auto-reply system

### 2. Portfolio Cards
- Interactive previews
- Technology filtering
- Case study navigation
- Performance metrics

### 3. Contact System
- Multiple communication channels
- Availability status
- Social media integration
- FAQ section

## 📊 Proje Durumu

**Frontend:** ✅ %100 Complete  
**Backend:** 🔄 %30 Complete (Email service active)  
**Testing:** ⏳ %0 (Starting soon)  
**Deployment:** 🚀 Ready for Production  

## 🔮 Roadmap

### Kısa Vadeli (1-2 Hafta)
- [ ] Database entegrasyonu (Prisma + PostgreSQL)
- [ ] Admin authentication sistemi  
- [ ] Newsletter API endpoint
- [ ] Blog content management

### Orta Vadeli (1-2 Ay)
- [ ] Advanced analytics
- [ ] A/B testing
- [ ] Multi-language content management
- [ ] Client testimonials system

### Uzun Vadeli (2-6 Ay)
- [ ] Blog yazma ve yayınlama
- [ ] Case study'lerin detaylandırılması
- [ ] Performance monitoring
- [ ] SEO optimizasyonları

## 👨‍💻 Geliştirici

**Barış Mercan**  
📧 [barismercan53@gmail.com](mailto:barismercan53@gmail.com)  
🐱 [GitHub](https://github.com/barismercann)  
💼 [LinkedIn](https://linkedin.com/in/barış-mercan-28786b27a)  
🐦 [Twitter](https://x.com/Barismercan_)

## 📄 License

Bu proje kişisel portfolio amaçlı geliştirilmiştir. Ticari kullanım için izin gereklidir.

---

⭐ **Beğendiysen yıldız ver!**  
🐛 **Bug bulursan issue aç!**  
💬 **Önerin varsa iletişime geç!**

---

**Son Güncelleme:** 24 Ağustos 2025  
**Durum:** Production Ready 🚀  
**Version:** 1.0.0