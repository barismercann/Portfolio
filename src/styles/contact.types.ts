import { BaseEntity } from './global.types';

export interface ContactMessage extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  budget?: BudgetRange;
  projectType: ProjectType;
  isRead: boolean;
  isReplied: boolean;
  priority: MessagePriority;
}

export type BudgetRange = 
  | '500-1500'
  | '1500-5000'
  | '5000-15000'
  | '15000-50000'
  | '50000+';

export type ProjectType = 
  | 'web-development'
  | 'mobile-app'
  | 'consulting'
  | 'maintenance'
  | 'other';

export type MessagePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  budget?: BudgetRange;
  projectType: ProjectType;
}