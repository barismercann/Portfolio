"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
  messages: any;
}

export function ClientLayout({ children, messages }: ClientLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  console.log('🔍 CLIENT LAYOUT: Pathname:', pathname);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ SSR hydration protection
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ✅ Check if current page is admin route
  const isAdminRoute = pathname.startsWith('/admin');
  
  // ✅ Check if current page is auth route  
  const isAuthRoute = pathname.startsWith('/admin/login') || pathname.startsWith('/login');

  const showHeaderFooter = !isAdminRoute && !isAuthRoute;

  console.log('🔍 CLIENT LAYOUT: Route analysis:');
  console.log('   pathname:', pathname);
  console.log('   isAdminRoute:', isAdminRoute);
  console.log('   isAuthRoute:', isAuthRoute); 
  console.log('   showHeaderFooter:', showHeaderFooter);

  return (
    <>
      {/* 🔍 Debug Info - Sadece development modunda göster */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 right-0 z-[9999] bg-purple-500 text-white p-2 text-xs font-mono">
          <div>CLIENT Path: {pathname}</div>
          <div>Admin: {isAdminRoute ? 'YES' : 'NO'}</div>
          <div>Auth: {isAuthRoute ? 'YES' : 'NO'}</div>
          <div>H/F: {showHeaderFooter ? 'SHOW' : 'HIDE'}</div>
        </div>
      )}

      <NextIntlClientProvider messages={messages} locale="tr">
        <div className="min-h-screen flex flex-col">
          {/* ✅ Only show Header for non-admin routes */}
          {showHeaderFooter && <Header />}
          
          <main className={isAdminRoute ? 'flex-1' : ''}>
            {children}
          </main>
          
          {/* ✅ Only show Footer for non-admin routes */}
          {showHeaderFooter && <Footer />}
        </div>
      </NextIntlClientProvider>
    </>
  );
}