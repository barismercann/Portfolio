interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  budget?: string | null;
  projectType: string;
  isRead: boolean;
  isReplied: boolean;
  priority: string;
  status: string;
  replySubject?: string | null;
  replyMessage?: string | null;
  repliedAt?: Date | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  referrer?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type { ContactMessage };
