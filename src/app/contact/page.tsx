import { ContactForm } from '@/components/forms/contact-form';
import { Badge } from '@/components/ui';
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="py-20 pt-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              İletişim
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Projenizi <span className="text-primary">Başlatalım</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proje bilgilerinizi paylaşın, size en uygun çözümü önerelim ve kısa sürede geri dönüş yapalım.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}