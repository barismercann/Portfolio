'use client';

import { Button } from '@/components/ui';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
}

function ShareButton({ post }: { post: BlogPost }) {
  const shareUrl = `https://barismercan.com/blog/${post.slug}`;
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.title,
          url: shareUrl
        });
      } catch (error) {
        console.log('Sharing cancelled or failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link kopyalandı!');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleShare}
    >
      Link Kopyala
    </Button>
  );
}

export default ShareButton;