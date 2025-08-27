"use client";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';



interface ClientLayoutProps {
    children: ReactNode;
    messages: AbstractIntlMessages;
}

export function ClientLayout({ children, messages }: ClientLayoutProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    console.log('🔍 CLIENT LAYOUT: Pathname:', pathname);

    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ Extract locale from pathname (assuming format like /en/... or /tr/...)
    const getLocaleFromPathname = (pathname: string): string => {
        const segments = pathname.split('/').filter(Boolean);
        const firstSegment = segments[0];
        
        // Check if first segment is a valid locale
        const validLocales = ['en', 'tr', 'de', 'fr', 'es']; // Add your supported locales
        if (validLocales.includes(firstSegment)) {
            return firstSegment;
        }
        
        // Default fallback
        return 'en';
    };

    const locale = getLocaleFromPathname(pathname);

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
    console.log('   locale:', locale);

    return (
        <>
        {/* 🔍 Debug Info - Sadece development modunda göster */}
        {/* {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-0 right-0 z-[9999] bg-purple-500 text-white p-2 text-xs font-mono">
            <div>CLIENT Path: {pathname}</div>
            <div>Admin: {isAdminRoute ? 'YES' : 'NO'}</div>
            <div>Auth: {isAuthRoute ? 'YES' : 'NO'}</div>
            <div>H/F: {showHeaderFooter ? 'SHOW' : 'HIDE'}</div>
            <div>Locale: {locale}</div>
            </div>
        )} */}

        {/* ✅ Pass extracted locale */}
        <NextIntlClientProvider messages={messages} locale={locale}>
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