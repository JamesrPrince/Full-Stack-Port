import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long')
})

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5

  const record = rateLimitMap.get(ip)
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now })
    return true
  }

  if (now - record.lastRequest > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  record.lastRequest = now
  return true
}

function createTransporter() {
  // Check if we have Gmail configuration
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  // Check if we have SMTP configuration
  if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  // Fallback to ethereal for development/testing
  console.log('Using Ethereal Email for testing - emails will be captured but not delivered')
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'ethereal.user@ethereal.email',
      pass: 'verysecret'
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Create email transporter
    const transporter = createTransporter()

    const fromEmail = process.env.CONTACT_EMAIL_FROM || process.env.EMAIL_USER || 'noreply@example.com'
    const toEmail = process.env.CONTACT_EMAIL_TO || process.env.EMAIL_USER || 'admin@example.com'

    // Email to yourself (notification)
    const mailToSelf = {
      from: fromEmail,
      to: toEmail,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #8b5cf6; margin: 0 0 20px 0; font-size: 24px;">New Contact Form Submission</h2>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #334155;">Contact Information</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #8b5cf6;">${validatedData.email}</a></p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
            </div>
            
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
              <h3 style="margin: 0 0 15px 0; color: #334155;">Message:</h3>
              <p style="line-height: 1.6; margin: 0; color: #475569;">${validatedData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                Sent from your portfolio website contact form on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Auto-reply to sender
    const autoReply = {
      from: fromEmail,
      to: validatedData.email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #8b5cf6; margin: 0 0 20px 0; font-size: 24px;">Thank you for your message!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi ${validatedData.firstName},</p>
            
            <p style="line-height: 1.6; margin: 0 0 20px 0;">
              Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible, typically within 24-48 hours.
            </p>
            
            <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #334155;">Your message summary:</h3>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
              <div style="margin-top: 15px; padding: 15px; background: white; border-radius: 6px; border-left: 3px solid #8b5cf6;">
                <p style="line-height: 1.6; margin: 0; color: #475569; font-style: italic;">"${validatedData.message.substring(0, 150)}${validatedData.message.length > 150 ? '...' : ''}"</p>
              </div>
            </div>
            
            <p style="line-height: 1.6; margin: 20px 0;">
              In the meantime, feel free to explore my portfolio or connect with me on social media.
            </p>
            
            <p style="margin: 30px 0 0 0;">
              Best regards,<br>
              <strong style="color: #8b5cf6;">Prince Chisenga</strong><br>
              <span style="color: #64748b;">Full-Stack Developer & Data Analyst</span>
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <h4 style="margin: 0 0 15px 0; color: #334155; font-size: 16px;">Connect with me:</h4>
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">
                📧 <a href="mailto:jameslira36@yahoo.com" style="color: #8b5cf6; text-decoration: none;">jameslira36@yahoo.com</a><br>
                💼 <a href="https://www.linkedin.com/in/prince--chisenga/" style="color: #8b5cf6; text-decoration: none;">LinkedIn Profile</a><br>
                🐙 <a href="https://github.com/JamesrPrince" style="color: #8b5cf6; text-decoration: none;">GitHub Profile</a>
              </p>
            </div>
          </div>
        </div>
      `
    }

    // Send both emails
    const [selfEmail, replyEmail] = await Promise.all([
      transporter.sendMail(mailToSelf),
      transporter.sendMail(autoReply)
    ])

    // Log test email URLs if using Ethereal
    if (process.env.SMTP_HOST === 'smtp.ethereal.email') {
      console.log('Test email sent! View at:')
      console.log('Notification email:', nodemailer.getTestMessageUrl(selfEmail))
      console.log('Auto-reply email:', nodemailer.getTestMessageUrl(replyEmail))
    }

    return NextResponse.json(
      { 
        message: 'Message sent successfully!',
        isTest: process.env.SMTP_HOST === 'smtp.ethereal.email'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: error.errors.map(err => ({ field: err.path.join('.'), message: err.message }))
        },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('auth')) {
      return NextResponse.json(
        { error: 'Email service configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}