"use client";

import { Button, Card, CardContent, CardHeader, CardTitle, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from '@/components/ui';
import { contactFormSchema } from '@/lib/validations';
import { ContactFormRequest } from '@/types/contact.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormRequest>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormRequest) => {
    setIsSubmitting(true);
    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simülasyon
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { value: 'web-development', label: 'Web Uygulaması' },
    { value: 'mobile-app', label: 'Mobil Uygulama' },
    { value: 'consulting', label: 'Teknik Danışmanlık' },
    { value: 'maintenance', label: 'Bakım & Destek' },
    { value: 'other', label: 'Diğer' },
  ];

  const budgetRanges = [
    { value: '500-1500', label: '₺500 - ₺1,500' },
    { value: '1500-5000', label: '₺1,500 - ₺5,000' },
    { value: '5000-15000', label: '₺5,000 - ₺15,000' },
    { value: '15000-50000', label: '₺15,000 - ₺50,000' },
    { value: '50000+', label: '₺50,000+' },
  ];

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Mesajınız Gönderildi!</h3>
        <p className="text-muted-foreground mb-6">
          Teşekkürler! Mesajınızı aldım ve 24 saat içinde size geri döneceğim.
        </p>
        <Button onClick={() => setSubmitStatus('idle')}>
          Yeni Mesaj Gönder
        </Button>
      </motion.div>
    );
  }

  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Projenizi Başlatmaya Hazır mısınız?</CardTitle>
        <p className="text-muted-foreground">
          Proje bilgilerinizi paylaşın, size en uygun çözümü önerelim ve kısa sürede geri dönüş yapalım.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Ad Soyad <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('name')}
                placeholder="Adınız ve soyadınız"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                E-posta <span className="text-red-500">*</span>
              </label>
              <Input
                {...register('email')}
                type="email"
                placeholder="ornek@email.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium mb-2 block">Telefon</label>
            <Input
              {...register('phone')}
              placeholder="0555 123 4567"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Project Type & Budget */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Proje Tipi <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={(value) => setValue('projectType', value as any)}>
                <SelectTrigger className={errors.projectType ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Proje tipini seçin" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && (
                <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bütçe Aralığı</label>
              <Select onValueChange={(value) => setValue('budget', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Bütçe aralığınızı seçin" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Konu <span className="text-red-500">*</span>
            </label>
            <Input
              {...register('subject')}
              placeholder="Projenizin başlığı"
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Proje Detayları <span className="text-red-500">*</span>
            </label>
            <Textarea
              {...register('message')}
              placeholder="Projenizle ilgili detayları paylaşın... (Ne tür bir proje, hangi özellikler, hedef kitle, zaman çerçevesi vs.)"
              rows={6}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Projeyi Gönder
              </>
            )}
          </Button>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">
                Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
              </span>
            </div>
          )}

          {/* Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>📞 24 saat içinde yanıt garantisi</strong><br />
              Formunuzu aldıktan sonra size geri döneceğim
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}