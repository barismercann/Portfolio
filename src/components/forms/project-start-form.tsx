"use client";

import { Button } from '@/components/ui';
import { contactFormSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, Clock, Loader2, Rocket, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormData = z.infer<typeof contactFormSchema>;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ProjectStartFormProps {
  className?: string;
}

export function ProjectStartForm({ className = '' }: ProjectStartFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      projectType: 'web-development'
    }
  });

  const watchedFields = watch();

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/project-start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setMessage(result.message || 'Proje talebiniz başarıyla gönderildi!');
        reset();
      } else {
        setStatus('error');
        setMessage(result.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setMessage('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
    }
  };

  const getFieldError = (fieldName: keyof FormData) => {
    return errors[fieldName]?.message;
  };

  // Success state
  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${className}`}
      >
        <div className="text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold mb-4 text-green-800"
          >
            🎉 Talebiniz Alındı!
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-green-700 mb-6 leading-relaxed"
          >
            {message}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center justify-center text-green-700 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              24 saat içinde size geri döneceğim
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            onClick={() => {
              setStatus('idle');
              setMessage('');
            }}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Yeni Talep Gönder
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Ad Soyad <span className="text-red-400">*</span>
            </label>
            <input 
              {...register('name')}
              type="text"
              placeholder="Adınız ve soyadınız"
              className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                getFieldError('name') ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            <AnimatePresence>
              {getFieldError('name') && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {getFieldError('name')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              E-posta <span className="text-red-400">*</span>
            </label>
            <input 
              {...register('email')}
              type="email"
              placeholder="ornek@email.com"
              className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                getFieldError('email') ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            <AnimatePresence>
              {getFieldError('email') && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-xs mt-1"
                >
                  {getFieldError('email')}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Contact & Budget Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Telefon
            </label>
            <input 
              {...register('phone')}
              type="tel"
              placeholder="0555 123 4567"
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Bütçe Aralığı
            </label>
            <select 
              {...register('budget')}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              <option value="" className="bg-gray-800">Bütçe aralığınızı seçin</option>
              <option value="1500-5000" className="bg-gray-800">₺1,500 - ₺5,000</option>
              <option value="5000-15000" className="bg-gray-800">₺5,000 - ₺15,000</option>
              <option value="15000-50000" className="bg-gray-800">₺15,000 - ₺50,000</option>
              <option value="50000-100000" className="bg-gray-800">₺50,000 - ₺100,000</option>
              <option value="100000+" className="bg-gray-800">₺100,000+</option>
            </select>
          </div>
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Proje Tipi <span className="text-red-400">*</span>
          </label>
          <select 
            {...register('projectType')}
            className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
              getFieldError('projectType') ? 'border-red-500' : 'border-gray-700'
            }`}
          >
            <option value="web-development" className="bg-gray-800">Web Geliştirme</option>
            <option value="mobile-app" className="bg-gray-800">Mobil Uygulama</option>
            <option value="consulting" className="bg-gray-800">Teknik Danışmanlık</option>
            <option value="maintenance" className="bg-gray-800">Mevcut Proje Güncellemesi</option>
            <option value="other" className="bg-gray-800">Diğer</option>
          </select>
        </div>

        {/* Project Details */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Proje Detayları <span className="text-red-400">*</span>
          </label>
          <textarea 
            {...register('message')}
            rows={5}
            placeholder="Projenizle ilgili detayları paylaşın... (Hedef kitle, özellikler, zaman çerçevesi, referans siteler vs.)"
            className={`w-full px-4 py-3 rounded-xl bg-gray-800/50 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 ${
              getFieldError('message') ? 'border-red-500' : 'border-gray-700'
            }`}
          />
          <AnimatePresence>
            {getFieldError('message') && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 text-xs mt-1"
              >
                {getFieldError('message')}
              </motion.p>
            )}
          </AnimatePresence>
          
          {/* Character count */}
          <div className="text-right text-xs text-gray-400 mt-1">
            {watchedFields.message?.length || 0} karakter
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-400 mr-3" />
                <span className="text-red-200">{message}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                }}
                className="text-red-400 hover:text-red-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 inline-flex items-center transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Rocket className="w-5 h-5 mr-2" />
                Projeyi Gönder
              </>
            )}
          </Button>
          
          <p className="text-sm text-gray-400 mt-3 flex items-center justify-center">
            <Clock className="w-4 h-4 mr-1" />
            Formunuzu aldıktan sonra 24 saat içinde size geri döneceğim
          </p>
        </div>

        {/* Form Progress Indicator */}
        <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Form Tamamlanma Durumu</span>
            <span>{Math.round(getFormCompletionPercentage(watchedFields))}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getFormCompletionPercentage(watchedFields)}%` }}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

// Helper function to calculate form completion percentage
function getFormCompletionPercentage(data: Partial<FormData>): number {
  const requiredFields = ['name', 'email', 'message', 'projectType'];
  const optionalFields = ['phone', 'budget'];
  
  let completedFields = 0;
  
  // Check required fields (worth more weight)
  requiredFields.forEach(field => {
    if (data[field as keyof FormData] && String(data[field as keyof FormData]).trim()) {
      completedFields += 1.2; // Required fields have higher weight
    }
  });
  
  // Check optional fields
  optionalFields.forEach(field => {
    if (data[field as keyof FormData] && String(data[field as keyof FormData]).trim()) {
      completedFields += 0.8;
    }
  });
  
  return Math.min(100, Math.round((completedFields / (requiredFields.length * 1.2 + optionalFields.length * 0.8)) * 100));
}