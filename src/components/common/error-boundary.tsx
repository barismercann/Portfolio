"use client";

import { Button } from '@/components/ui';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);
        
        // Production'da hata raporlama servisi entegrasyonu
        if (process.env.NODE_ENV === 'production') {
        // TODO: Sentry veya benzer servise hata gönder
        // reportError(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
        if (this.props.fallback) {
            return this.props.fallback;
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
            <div className="text-center max-w-md">
                <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Bir şeyler ters gitti
                </h1>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                Üzgünüz, beklenmedik bir hata oluştu. Bu durumu teknik ekibe bildirdik 
                ve en kısa sürede çözüm üretilecek.
                </p>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
                    <h3 className="text-sm font-medium text-red-800 mb-2">Hata Detayları (Dev Mode):</h3>
                    <pre className="text-xs text-red-700 overflow-x-auto">
                    {this.state.error.message}
                    </pre>
                </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sayfayı Yenile
                </Button>
                
                <Button variant="outline" asChild>
                    <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Ana Sayfaya Dön
                    </Link>
                </Button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    Sorun devam ederse:{' '}
                    <a 
                    href="mailto:barismercan53@gmail.com"
                    className="text-primary hover:underline"
                    >
                    barismercan53@gmail.com
                    </a>
                </p>
                </div>
            </div>
            </div>
        );
        }

        return this.props.children;
    }
}

// HOC versiyonu - kolay kullanım için
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: ReactNode
) {
    const WrappedComponent = (props: P) => (
        <ErrorBoundary fallback={fallback}>
        <Component {...props} />
        </ErrorBoundary>
    );
    
    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
}

// Kullanım örnekleri:
// 1. Layout'ta: <ErrorBoundary><App /></ErrorBoundary>
// 2. HOC ile: export default withErrorBoundary(MyComponent)
// 3. Özel fallback ile: <ErrorBoundary fallback={<CustomError />}><Content /></ErrorBoundary>