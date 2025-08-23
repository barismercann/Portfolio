import { contactFormSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Form data type
interface ProjectStartFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  budget?: string;
  projectType: string;
}

// Email template for project start request
const getProjectStartEmailTemplate = (data: ProjectStartFormData) => {
  return {
    subject: `🚀 Yeni Proje Başlatma Talebi - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Yeni Proje Talebi</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0;
            background-color: #f8fafc;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
            color: white; 
            padding: 20px; 
            text-align: center;
            border-radius: 10px 10px 0 0;
            margin: -20px -20px 20px -20px;
          }
          .field { 
            margin: 15px 0; 
            padding: 15px;
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            border-radius: 0 8px 8px 0;
          }
          .field strong { 
            color: #1f2937; 
            display: block; 
            margin-bottom: 5px;
          }
          .message-content {
            background: #eff6ff;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #dbeafe;
            margin: 15px 0;
          }
          .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .priority-high {
            background: #fef2f2;
            border-left-color: #ef4444;
          }
          .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #3b82f6;
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🚀 Yeni Proje Talebi</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio sitesinden gelen proje başlatma formu</p>
          </div>

          <div class="field">
            <strong>👤 İsim:</strong>
            <span style="font-size: 16px; font-weight: 600;">${data.name}</span>
          </div>

          <div class="field">
            <strong>📧 E-posta:</strong>
            <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a>
          </div>

          ${data.phone ? `
          <div class="field">
            <strong>📱 Telefon:</strong>
            <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a>
          </div>
          ` : ''}

          ${data.budget ? `
          <div class="field">
            <strong>💰 Bütçe Aralığı:</strong>
            <span class="badge">${data.budget}</span>
          </div>
          ` : ''}

          <div class="message-content">
            <strong style="color: #1f2937; margin-bottom: 10px; display: block;">📋 Proje Detayları:</strong>
            <div style="white-space: pre-wrap; line-height: 1.8;">${data.message}</div>
          </div>

          <div class="field">
            <strong>📅 Talep Tarihi:</strong>
            ${new Date().toLocaleString('tr-TR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>

          <div class="footer">
            <p><strong>⚡ Hızlı Aksiyon Gerekli!</strong></p>
            <p>Bu tür projelere genellikle 24 saat içinde yanıt veriyorsun.</p>
            <p style="margin-top: 20px;">
              <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                Hemen Yanıtla →
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Yeni Proje Başlatma Talebi
      
      İsim: ${data.name}
      E-posta: ${data.email}
      Telefon: ${data.phone || 'Belirtilmemiş'}
      Bütçe: ${data.budget || 'Belirtilmemiş'}
      
      Proje Detayları:
      ${data.message}
      
      Tarih: ${new Date().toLocaleString('tr-TR')}
    `
  };
};

// Auto-reply email template for user
const getAutoReplyTemplate = (name: string) => {
  return {
    subject: '✅ Proje Talebiniz Alındı - Barış Mercan',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #3b82f6); color: white; padding: 20px; text-align: center; border-radius: 10px; }
          .content { padding: 20px; background: #f8fafc; border-radius: 10px; margin: 20px 0; }
          .timeline { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .step { display: flex; align-items: center; margin: 10px 0; }
          .step-number { width: 30px; height: 30px; background: #3b82f6; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; font-weight: bold; }
          .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">✅ Talebiniz Başarıyla Alındı!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Merhaba ${name}, proje talebiniz için teşekkürler!</p>
          </div>

          <div class="content">
            <h2 style="color: #1f2937; margin-top: 0;">📋 Sonraki Adımlar</h2>
            
            <div class="timeline">
              <div class="step">
                <div class="step-number">1</div>
                <div>
                  <strong>İlk İnceleme</strong><br>
                  <small style="color: #6b7280;">Talebinizi detaylı olarak inceliyorum (24 saat içinde)</small>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">2</div>
                <div>
                  <strong>Teknik Analiz</strong><br>
                  <small style="color: #6b7280;">Proje gereksinimlerini analiz edip önerimi hazırlıyorum</small>
                </div>
              </div>
              
              <div class="step">
                <div class="step-number">3</div>
                <div>
                  <strong>Teklif & Görüşme</strong><br>
                  <small style="color: #6b7280;">Size özel teklif ve görüşme önerisi gönderiyorum</small>
                </div>
              </div>
            </div>

            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <strong style="color: #1e40af;">⚡ Hızlı Yanıt Garantisi</strong><br>
              Genellikle 24 saat içinde, en geç 48 saat içinde size geri dönüş yapıyorum.
            </div>
          </div>

          <div class="footer">
            <p><strong>Barış Mercan</strong><br>
            Full-Stack Developer<br>
            📧 barismercan53@gmail.com<br>
            📱 +90 543 553 5310</p>
            
            <p style="margin-top: 20px;">
              <a href="https://barismercan.com" style="color: #3b82f6; text-decoration: none;">
                barismercan.com
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate form data
    const validatedData = contactFormSchema.parse(body);

    // Create email transporter
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();

    // Prepare email templates
    const adminEmail = getProjectStartEmailTemplate(validatedData);
    const userAutoReply = getAutoReplyTemplate(validatedData.name);

    // Send email to admin (you)
    await transporter.sendMail({
      from: `"Portfolio Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'barismercan53@gmail.com',
      subject: adminEmail.subject,
      html: adminEmail.html,
      text: adminEmail.text,
      replyTo: validatedData.email,
    });

    // Send auto-reply to user
    await transporter.sendMail({
      from: `"Barış Mercan" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: validatedData.email,
      subject: userAutoReply.subject,
      html: userAutoReply.html,
    });

    // Log the successful submission (you can later save to database)
    console.log('✅ Project start request received:', {
      name: validatedData.name,
      email: validatedData.email,
      budget: validatedData.budget,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Proje talebiniz başarıyla gönderildi. Kısa sürede size geri döneceğim!',
    });

  } catch (error) {
    console.error('❌ Project start API error:', error);

    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Form verilerinde eksiklik var. Lütfen tüm gerekli alanları doldurun.',
        errors: error,
      }, { status: 400 });
    }

    // Handle email sending errors
    if (error instanceof Error && error.message.includes('SMTP')) {
      return NextResponse.json({
        success: false,
        message: 'E-posta gönderiminde sorun oluştu. Lütfen doğrudan e-posta ile iletişime geçin.',
      }, { status: 500 });
    }

    // Generic error handling
    return NextResponse.json({
      success: false,
      message: 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyin veya doğrudan iletişime geçin.',
    }, { status: 500 });
  }
}