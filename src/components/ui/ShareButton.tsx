'use client';

import { Button } from '@/components/ui';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
}

function ShareButton({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    const currentUrl = window.location.href; // Mevcut sayfanın URL'sini al
    
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      
      // 2 saniye sonra ikonu eski haline getir
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Link kopyalanamadı:', error);
      // Fallback: Manuel olarak link'i seçilebilir hale getir
      alert('Link kopyalanamadı. URL: ' + currentUrl);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleCopyLink}
      className="flex items-center gap-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          Kopyalandı!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Link Kopyala
        </>
      )}
    </Button>
  );
}

export default ShareButton;