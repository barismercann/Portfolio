import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'skeleton' | 'pulse';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6', 
  lg: 'w-8 h-8',
  xl: 'w-12 h-12'
};

const textSizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg', 
  xl: 'text-xl'
};

export function Loading({ 
  size = 'md', 
  variant = 'spinner', 
  text, 
  className,
  fullScreen = false 
}: LoadingProps) {

  const renderSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={cn(sizeClasses[size], 'animate-spin text-primary')} />
      {text && (
        <p className={cn(textSizeClasses[size], 'text-muted-foreground animate-pulse')}>
          {text}
        </p>
      )}
    </div>
  );

  const renderDots = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full bg-primary animate-bounce',
              size === 'sm' && 'w-2 h-2',
              size === 'md' && 'w-3 h-3',
              size === 'lg' && 'w-4 h-4',
              size === 'xl' && 'w-5 h-5'
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      {text && (
        <p className={cn(textSizeClasses[size], 'text-muted-foreground')}>
          {text}
        </p>
      )}
    </div>
  );

  const renderSkeleton = () => (
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
    </div>
  );

  const renderPulse = () => (
    <div className={cn(
      'rounded-lg bg-gray-200 animate-pulse',
      size === 'sm' && 'h-20',
      size === 'md' && 'h-32',
      size === 'lg' && 'h-48',
      size === 'xl' && 'h-64'
    )} />
  );

  const getLoadingContent = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'skeleton':
        return renderSkeleton();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {getLoadingContent()}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      {getLoadingContent()}
    </div>
  );
}

// Specialized Loading Components
export function PageLoading() {
  return <Loading variant="spinner" size="lg" text="Sayfa yükleniyor..." fullScreen />;
}

export function FormLoading() {
  return <Loading variant="dots" size="md" text="Gönderiliyor..." />;
}

export function CardLoading() {
  return <Loading variant="skeleton" className="w-full" />;
}

export function ImageLoading() {
  return <Loading variant="pulse" size="xl" className="w-full" />;
}

export function ButtonLoading({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  return <Loader2 className={cn(sizeClasses[size], 'animate-spin')} />;
}

// Hook for loading states
export function useLoading(initialState = false) {
  const [isLoading, setIsLoading] = React.useState(initialState);
  
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  
  return { isLoading, startLoading, stopLoading, setIsLoading };
}

// Usage Examples:
/*
// Basic usage
<Loading />

// With text and different variant
<Loading variant="dots" size="lg" text="Projeler yükleniyor..." />

// Full screen loading
<Loading fullScreen variant="spinner" text="Lütfen bekleyin..." />

// Skeleton for cards
<CardLoading />

// Page loading
<PageLoading />

// In forms
{isSubmitting && <FormLoading />}

// With hook
const { isLoading, startLoading, stopLoading } = useLoading();
*/