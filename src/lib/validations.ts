import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Konu en az 5 karakter olmalı').optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
  budget: z.enum(['1500-5000', '5000-15000', '15000-50000', '50000-100000', '100000+']).optional(),
  projectType: z.enum(['web-development', 'mobile-app', 'consulting', 'maintenance', 'other'])
});

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı')
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
  name: z.string().min(2, 'İsim en az 2 karakter olmalı').optional()
});

// Project update schema
export const projectUpdateSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalı'),
  description: z.string().min(20, 'Açıklama en az 20 karakter olmalı'),
  status: z.enum(['planning', 'in-progress', 'review', 'completed', 'on-hold']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  dueDate: z.string().optional()
});