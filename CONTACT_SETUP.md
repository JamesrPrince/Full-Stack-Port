# Contact Form Setup Guide

## Overview
The contact form has been fully implemented with email functionality, validation, and user feedback. This guide will help you configure the email service to make it fully operational.

## Features Implemented
- ✅ Form validation with Zod schemas
- ✅ Real-time error handling and user feedback
- ✅ Rate limiting (5 requests per 15 minutes per IP)
- ✅ Email notifications to you
- ✅ Auto-reply emails to users
- ✅ Loading states and success/error messages
- ✅ Professional email templates
- ✅ Multiple email service support

## Email Service Configuration

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings → Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Update your `.env.local` file**:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
CONTACT_EMAIL_TO=jameslira36@yahoo.com
CONTACT_EMAIL_FROM=your-email@gmail.com
```

### Option 2: SMTP Service (Production Recommended)

For production, use a dedicated email service:

#### SendGrid
```env
# Remove Gmail config and add:
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
CONTACT_EMAIL_TO=jameslira36@yahoo.com
CONTACT_EMAIL_FROM=your-verified-sender@yourdomain.com
```

#### Resend
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASS=your-resend-api-key
CONTACT_EMAIL_TO=jameslira36@yahoo.com
CONTACT_EMAIL_FROM=your-verified-sender@yourdomain.com
```

#### Mailtrap (Development/Testing)
```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-mailtrap-username
SMTP_PASS=your-mailtrap-password
CONTACT_EMAIL_TO=any-email@example.com
CONTACT_EMAIL_FROM=test@example.com
```

## Quick Setup Steps

1. **Copy environment template**:
```bash
cp .env.example .env.local
```

2. **Configure your email service** (see options above)

3. **Test the setup**:
```bash
pnpm dev
# Visit http://localhost:3000/#contact
# Fill out the form and test
```

4. **Check email delivery**:
   - You should receive a notification email
   - The form submitter should receive an auto-reply

## Testing the Implementation

### Local Testing
1. Start the development server: `pnpm dev`
2. Navigate to the contact section: `http://localhost:3000/#contact`
3. Fill out and submit the form
4. Check for success/error messages
5. Verify emails are received

### Production Testing
1. Deploy to Vercel with environment variables
2. Test the live contact form
3. Monitor email delivery

## Troubleshooting

### Common Issues

**"Failed to send message"**
- Check environment variables are set correctly
- Verify email service credentials
- Check network connectivity

**"Validation error"**
- Ensure all form fields are filled correctly
- Check field length limits (name: 50 chars, subject: 100 chars, message: 1000 chars)

**"Too many requests"**
- Wait 15 minutes between requests (rate limiting active)
- Or restart the development server to reset

**Gmail "Authentication failed"**
- Ensure 2FA is enabled
- Use App Password, not regular password
- Check the 16-character app password is correct

### Debug Steps

1. **Check server logs**:
```bash
# In development
pnpm dev
# Check console for error messages
```

2. **Test email configuration**:
   - Try with Mailtrap first (easier setup)
   - Then move to production service

3. **Verify environment variables**:
```bash
# In your API route, temporarily add:
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set')
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `EMAIL_USER` | Yes* | Gmail email address |
| `EMAIL_PASS` | Yes* | Gmail app password |
| `SMTP_HOST` | Yes* | SMTP server hostname |
| `SMTP_PORT` | Yes* | SMTP server port |
| `SMTP_USER` | Yes* | SMTP username |
| `SMTP_PASS` | Yes* | SMTP password |
| `SMTP_SECURE` | No | Use SSL/TLS (true/false) |
| `CONTACT_EMAIL_TO` | Yes | Where to send notifications |
| `CONTACT_EMAIL_FROM` | Yes | From address for emails |

*Either Gmail OR SMTP configuration required

## Security Features

- ✅ Rate limiting per IP address
- ✅ Input validation and sanitization
- ✅ CSRF protection via Next.js
- ✅ Environment variable security
- ✅ HTML email sanitization

## Next Steps

1. **Configure email service** using this guide
2. **Test the contact form** thoroughly
3. **Deploy to production** with environment variables
4. **Monitor email delivery** and form submissions

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your email service documentation
3. Test with a simpler service like Mailtrap first
4. Check the browser console and server logs for errors

The contact form is now fully functional and ready for production use!