// lib/email.ts
import nodemailer from 'nodemailer';

// This module should only be imported in server-side code
// Never import this directly in client components

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// Create transporter with your email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME || 'Your Name'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      replyTo: replyTo || process.env.EMAIL_FROM || process.env.EMAIL_USER,
    });

    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}

export function generateReplyEmailTemplate(
  recipientName: string,
  replyMessage: string,
  originalMessage: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Proje Talebiniz Hakkında</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .reply { background-color: #fff; padding: 20px; border-left: 4px solid #007bff; }
            .original { background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 14px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Proje Talebiniz Hakkında</h2>
                <p>Merhaba ${recipientName},</p>
            </div>
            
            <div class="reply">
                ${replyMessage.replace(/\n/g, '<br>')}
            </div>
            
            <div class="original">
                <h4>Orijinal Mesajınız:</h4>
                <p><em>${originalMessage.replace(/\n/g, '<br>')}</em></p>
            </div>
            
            <div class="footer">
                <p>Saygılarımla,<br>
                ${process.env.EMAIL_FROM_NAME || 'Your Name'}</p>
                
                <p><small>Bu e-posta proje talep yönetim sistemi aracılığıyla gönderilmiştir.</small></p>
            </div>
        </div>
    </body>
    </html>
  `;
}