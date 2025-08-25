import { generateTokenForUser } from '@/lib/auth';
import { authenticateUser, trackEvent } from '@/lib/database';
import { loginSchema } from '@/lib/validations';
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

// Admin login notification email template
const getLoginNotificationTemplate = (userEmail: string, ipAddress: string, userAgent: string) => {
  return {
    subject: '🔐 Admin Panel Girişi - Barış Mercan Portfolio',
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
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
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
          .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
          .security-notice {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🔐 Admin Panel Girişi</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio yönetim paneline giriş yapıldı</p>
          </div>

          <div class="field">
            <strong>👤 Giriş Yapan:</strong>
            <span style="font-size: 16px; font-weight: 600;">${userEmail}</span>
          </div>

          <div class="field">
            <strong>📅 Giriş Zamanı:</strong>
            ${new Date().toLocaleString('tr-TR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>

          <div class="field">
            <strong>🌐 IP Adresi:</strong>
            ${ipAddress}
          </div>

          <div class="field">
            <strong>💻 Tarayıcı Bilgisi:</strong>
            <div style="font-size: 12px; color: #6b7280; margin-top: 5px;">
              ${userAgent}
            </div>
          </div>

          <div class="security-notice">
            <strong style="color: #92400e;">⚠️ Güvenlik Bildirimi</strong>
            <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">
              Bu giriş sizin değilse, hemen şifrenizi değiştirin ve güvenlik ayarlarınızı gözden geçirin.
            </p>
          </div>

          <div class="footer">
            <p><strong>Barış Mercan Portfolio</strong></p>
            <p>Admin Panel Güvenlik Sistemi</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Admin Panel Girişi
      
      Giriş Yapan: ${userEmail}
      Giriş Zamanı: ${new Date().toLocaleString('tr-TR')}
      IP Adresi: ${ipAddress}
      Tarayıcı: ${userAgent}
      
      Güvenlik uyarısı: Bu giriş sizin değilse, hemen şifrenizi değiştirin.
    `
  };
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Get user IP and user agent for security logging
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const user = await authenticateUser(validatedData.email, validatedData.password);
    
    if (!user) {
      await trackEvent('login_failed', '/admin/login', {
        email: validatedData.email,
        reason: 'invalid_credentials',
        ipAddress,
        userAgent,
      });

      return NextResponse.json({
        success: false,
        message: 'E-posta adresi veya şifre hatalı',
      }, { status: 401 });
    }

    // Generate JWT token
    const token = await generateTokenForUser(user);

    // Track successful login
    await trackEvent('login_success', '/admin/login', {
      userId: user.id,
      email: user.email,
      role: user.role,
      ipAddress,
      userAgent,
    });

    // Send admin login notification email
    try {
      const transporter = createTransporter();
      const adminEmail = process.env.ADMIN_EMAIL || 'barismercan53@gmail.com';
      const loginNotification = getLoginNotificationTemplate(user.email, ipAddress, userAgent);

      await transporter.sendMail({
        from: `"Portfolio Security" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: loginNotification.subject,
        html: loginNotification.html,
        text: loginNotification.text,
      });

      console.log('✅ Admin login notification sent to:', adminEmail);
    } catch (emailError) {
      console.error('❌ Failed to send login notification:', emailError);
      // Don't fail the login if email sending fails
    }

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('❌ Login API error:', error);
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'E-posta ve şifre gerekli',
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Giriş sırasında hata oluştu',
    }, { status: 500 });
  }
}