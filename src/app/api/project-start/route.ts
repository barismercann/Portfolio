import { prisma, subscribeToNewsletter, trackEvent } from '@/lib/database';
import { newsletterSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email transporter (reuse from contact form)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Welcome email template
const getWelcomeEmailTemplate = (name?: string) => {
  const displayName = name || 'Değerli takipçi';
  
  return {
    subject: '🎉 Newsletter\'a Hoş Geldiniz! - Barış Mercan',
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
            background: linear-gradient(135deg, #3b82f6, #8b5cf6); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
            border-radius: 10px;
            margin-bottom: 30px;
          }
          .content { 
            padding: 0 10px;
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
            <h1 style="margin: 0; font-size: 28px;">🎉 Hoş Geldiniz!</h1>
            <p style="margin: 12px 0 0 0; opacity: 0.9; font-size: 16px;">Newsletter aboneliğiniz başarıyla tamamlandı</p>
          </div>

          <div class="content">
            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px;">Merhaba ${displayName}!</h2>
            
            <p style="margin-bottom: 20px; line-height: 1.8;">
              Barış Mercan newsletter'ına hoş geldiniz! Bundan böyle modern web teknolojileri, 
              best practice'ler ve pratik çözümler hakkında en güncel içerikleri sizinle paylaşacağım.
            </p>

            <h3 style="color: #1f2937; margin: 24px 0 16px 0;">📚 Neler Bulacaksınız?</h3>
            <ul style="line-height: 1.8; color: #4b5563;">
              <li>Next.js, React ve TypeScript ile ilgili güncel yazılar</li>
              <li>Performans optimizasyon teknikleri</li>
              <li>Full-stack geliştirme best practice'leri</li>
              <li>Yeni proje case study'leri</li>
              <li>Sektördeki önemli gelişmeler</li>
            </ul>

            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #1e40af;">
                <strong>💡 İlk İçeriğimiz Çok Yakında!</strong><br>
                Bu hafta Next.js 15'in yeni özellikleri hakkında detaylı bir yazı paylaşacağım.
              </p>
            </div>

            <p style="margin: 24px 0;">
              Herhangi bir sorunuz varsa doğrudan bu e-postayı yanıtlayabilir veya 
              <a href="https://barismercan.com/contact" style="color: #3b82f6;">iletişim sayfası</a>ndan bana ulaşabilirsiniz.
            </p>
          </div>

          <div class="footer">
            <p><strong>Barış Mercan</strong> - Full-Stack Developer</p>
            <p>
              📧 <a href="mailto:barismercan53@gmail.com">barismercan53@gmail.com</a> | 
              🌐 <a href="https://barismercan.com">barismercan.com</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">
              Bu e-postayı almak istemiyor musunuz? 
              <a href="https://barismercan.com/unsubscribe?email=${encodeURIComponent('{{email}}')}">Abonelikten çık</a>
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
    const validatedData = newsletterSchema.parse(body);

    // Get client information
    const clientInfo = {
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      referrer: request.headers.get('referer') || undefined,
    };

    // Determine source from referrer
    const source = clientInfo.referrer ? 
      new URL(clientInfo.referrer).pathname : 
      'direct';

    // Save to database
    const subscription = await subscribeToNewsletter(
      validatedData.email, 
      validatedData.name, 
      source
    );

    // Send welcome email (only for new subscriptions)
    if (subscription) {
      try {
        const transporter = createTransporter();
        const welcomeEmail = getWelcomeEmailTemplate(validatedData.name);
        
        await transporter.sendMail({
          from: `"Barış Mercan" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: validatedData.email,
          subject: welcomeEmail.subject,
          html: welcomeEmail.html,
        });
      } catch (emailError) {
        console.error('❌ Welcome email failed:', emailError);
        // Don't fail the API if email fails
      }
    }

    // Track analytics
    await trackEvent('newsletter_subscribe', source, {
      email: validatedData.email,
      hasName: !!validatedData.name,
      isNewSubscription: !!subscription,
    }, clientInfo);

    console.log('✅ Newsletter subscription processed:', {
      email: validatedData.email,
      source,
      isNew: !!subscription,
    });

    return NextResponse.json({
      success: true,
      message: 'Newsletter aboneliğiniz başarıyla tamamlandı! Hoş geldin e-postanızı kontrol edin.',
    });

  } catch (error) {
    console.error('❌ Newsletter API error:', error);

    // Track error
    await trackEvent('newsletter_error', 'api', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    // Handle validation errors
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({
        success: false,
        message: 'Geçerli bir e-posta adresi girin.',
        errors: error,
      }, { status: 400 });
    }

    // Handle duplicate email (Prisma unique constraint)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json({
        success: true,
        message: 'Bu e-posta adresi zaten newsletter listesinde kayıtlı.',
      });
    }

    // Generic error handling
    return NextResponse.json({
      success: false,
      message: 'Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.',
    }, { status: 500 });
  }
}

// GET endpoint for admin to retrieve newsletter subscribers
export async function GET(request: NextRequest) {
  try {
    // Basic authentication check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const isActive = searchParams.get('active') === 'true';

    const skip = (page - 1) * limit;
    
    const [subscribers, totalCount] = await Promise.all([
      prisma.newsletter.findMany({
        where: isActive ? { isActive: true } : {},
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          isActive: true,
          source: true,
          createdAt: true,
        },
      }),
      prisma.newsletter.count({
        where: isActive ? { isActive: true } : {},
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        subscribers,
        pagination: {
          page,
          limit,
          total: totalCount,
          totalPages: Math.ceil(totalCount / limit),
        },
      },
    });

  } catch (error) {
    console.error('❌ Get newsletter subscribers error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to retrieve subscribers',
    }, { status: 500 });
  }
}

// DELETE endpoint to unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({
        success: false,
        message: 'E-posta adresi gerekli',
      }, { status: 400 });
    }

    await prisma.newsletter.update({
      where: { email },
      data: { 
        isActive: false,
        updatedAt: new Date(),
      },
    });

    // Track unsubscribe event
    await trackEvent('newsletter_unsubscribe', 'api', { email });

    return NextResponse.json({
      success: true,
      message: 'Newsletter aboneliğiniz başarıyla iptal edildi.',
    });

  } catch (error) {
    console.error('❌ Newsletter unsubscribe error:', error);
    return NextResponse.json({
      success: false,
      message: 'Abonelik iptali sırasında hata oluştu.',
    }, { status: 500 });
  }
}