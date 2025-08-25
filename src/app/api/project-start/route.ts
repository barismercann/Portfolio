import { saveContactMessage, trackEvent } from '@/lib/database';
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
            background: linear-gradient(135deg, #10b981, #3b82f6); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
            border-radius: 10px;
            margin-bottom: 30px;
          }
          .content { 
            padding: 0 10px;
          }
          .timeline-container {
            background: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            border: 1px solid #e2e8f0;
          }
          .timeline-step { 
            display: flex; 
            align-items: flex-start; 
            margin: 20px 0;
            position: relative;
          }
          .timeline-step:not(:last-child)::after {
            content: '';
            position: absolute;
            left: 14px;
            top: 40px;
            width: 2px;
            height: 40px;
            background: #e2e8f0;
          }
          .step-number { 
            width: 32px; 
            height: 32px; 
            background: #3b82f6; 
            color: white; 
            border-radius: 50%; 
            text-align: center; 
            font-weight: 600;
            font-size: 14px;
            line-height: 32px; 
            display: inline-block;
            padding-right: 2px;
            margin-right: 15px;
            flex-shrink: 0;
          }
          .step-content {
            flex: 1;
          }
          .step-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
            font-size: 15px;
          }
          .step-description {
            color: #6b7280;
            font-size: 13px;
            line-height: 1.4;
          }
          .step-number {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .guarantee-box {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #3b82f6;
            margin: 25px 0;
          }
          .footer { 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
          .footer a {
            color: #3b82f6;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 26px;">✅ Talebiniz Başarıyla Alındı!</h1>
            <p style="margin: 12px 0 0 0; opacity: 0.9; font-size: 16px;">Merhaba ${name}, proje talebiniz için teşekkürler!</p>
          </div>

          <div class="content">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">📋 Sonraki Adımlar</h2>
            
            <div class="timeline-container">
              <div class="timeline-step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <div class="step-title">İlk İnceleme</div>
                  <div class="step-description">Talebinizi detaylı olarak inceliyorum (24 saat içinde)</div>
                </div>
              </div>
              
              <div class="timeline-step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <div class="step-title">Teknik Analiz</div>
                  <div class="step-description">Proje gereksinimlerini belirleme ve çözüm önerisi</div>
                </div>
              </div>
              
              <div class="timeline-step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <div class="step-title">Teklif & Görüşme</div>
                  <div class="step-description">Size özel teklif hazırlama ve detayları görüşme</div>
                </div>
              </div>
            </div>

            <div class="guarantee-box">
              <div style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">⚡ Hızlı Yanıt Garantisi</div>
              <div style="color: #1e40af;">Genellikle 24 saat içinde, en geç 48 saat içinde size geri dönüş yapıyorum.</div>
            </div>
          </div>

          <div class="footer">
            <div style="margin-bottom: 15px;">
              <strong style="color: #1f2937;">Barış Mercan</strong><br>
              <span style="color: #6b7280;">Full-Stack Developer</span>
            </div>
            <div style="margin-bottom: 15px;">
              📧 <a href="mailto:barismercan53@gmail.com">barismercan53@gmail.com</a><br>
              📱 <a href="tel:+905435535310">+90 543 553 5310</a>
            </div>
            <div>
              <a href="https://barismercan.com" style="font-weight: 500;">barismercan.com</a>
            </div>
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

    // Get client information for database storage
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || undefined;

    // Save to database
    try {
      const savedMessage = await saveContactMessage({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        budget: validatedData.budget,
        projectType: validatedData.projectType,
        ipAddress,
        userAgent,
        referrer,
      });

      console.log('✅ Contact message saved to database with ID:', savedMessage.id);
      
      // Track analytics event
      await trackEvent('project_start_form_submission', '/', {
        messageId: savedMessage.id,
        projectType: validatedData.projectType,
        budget: validatedData.budget,
        hasPhone: !!validatedData.phone,
      });

    } catch (dbError) {
      console.error('❌ Database save error:', dbError);
      // Continue with email sending even if database save fails
    }

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

    // Log the successful submission
    console.log('✅ Project start request processed successfully:', {
      name: validatedData.name,
      email: validatedData.email,
      budget: validatedData.budget,
      projectType: validatedData.projectType,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Proje talebiniz başarıyla gönderildi ve veritabanına kaydedildi. Kısa sürede size geri döneceğim!',
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