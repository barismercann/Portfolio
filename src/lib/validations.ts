import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi girin'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Konu en az 5 karakter olmalı'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
  budget: z.enum(['500-1500', '1500-5000', '5000-15000', '15000-50000', '50000+']).optional(),
  projectType: z.enum(['web-development', 'mobile-app', 'consulting', 'maintenance', 'other'])
});

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı')
});