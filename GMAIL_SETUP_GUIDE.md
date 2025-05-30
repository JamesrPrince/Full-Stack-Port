# Gmail Setup Guide for Portfolio Contact Form

## Overview
This guide will walk you through setting up Gmail to work with your portfolio contact form. The process takes about 5-10 minutes.

## Step 1: Choose Your Gmail Account

**Option A: Use Existing Gmail**
- Use your personal Gmail account
- Keep in mind this will send emails from your personal address

**Option B: Create New Gmail (Recommended)**
- Create a dedicated account like: `princechisenga.portfolio@gmail.com`
- Keeps business and personal emails separate
- More professional appearance

## Step 2: Enable 2-Factor Authentication

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Sign in with your Gmail account

2. **Navigate to Security**
   - Click "Security" in the left sidebar
   - Look for "Signing in to Google" section

3. **Enable 2-Step Verification**
   - Click "2-Step Verification"
   - Click "Get started"
   - Follow the prompts to set up (usually phone verification)
   - Complete the setup process

## Step 3: Generate App Password

**Important**: You MUST complete Step 2 first - App passwords only appear after 2FA is enabled.

1. **Go back to Security page**
   - https://myaccount.google.com/security

2. **Find App passwords**
   - Look for "App passwords" in the "Signing in to Google" section
   - Click on "App passwords"

3. **Generate password**
   - In the "Select app" dropdown, choose "Mail"
   - In the "Select device" dropdown, choose "Other (custom name)"
   - Type: "Portfolio Contact Form"
   - Click "Generate"

4. **Copy the password**
   - You'll see a 16-character password like: `abcd efgh ijkl mnop`
   - **IMPORTANT**: Copy this immediately - you won't see it again!
   - It will have spaces, keep them or remove them (both work)

## Step 4: Update Your Environment File

1. **Open your `.env.local` file**

2. **Replace the placeholder values**:
   ```env
   # Replace these with your actual values:
   EMAIL_USER=your-actual-gmail@gmail.com
   EMAIL_PASS=your-16-character-password
   CONTACT_EMAIL_FROM=your-actual-gmail@gmail.com
   ```

3. **Example of completed configuration**:
   ```env
   EMAIL_USER=princechisenga.portfolio@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   CONTACT_EMAIL_TO=jameslira36@yahoo.com
   CONTACT_EMAIL_FROM=princechisenga.portfolio@gmail.com
   ```

## Step 5: Test the Setup

1. **Restart your development server**:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   pnpm dev
   ```

2. **Visit your contact form**:
   - Go to: http://localhost:3000/#contact

3. **Submit a test message**:
   - Fill out all fields
   - Use a real email address for testing
   - Click "Send Message"

4. **Check for success**:
   - You should see a green success message
   - Check your `CONTACT_EMAIL_TO` address for the notification
   - Check the test email address for the auto-reply

## Troubleshooting

### "Authentication failed" Error
- ✅ Make sure 2FA is enabled
- ✅ Use the App Password, not your regular Gmail password
- ✅ Copy the 16-character password exactly (spaces are OK)
- ✅ Check for typos in your Gmail address

### "App passwords" not showing
- ✅ 2-Step Verification must be enabled first
- ✅ Wait a few minutes after enabling 2FA
- ✅ Try refreshing the Google Account page

### Emails not being received
- ✅ Check spam/junk folders
- ✅ Verify the `CONTACT_EMAIL_TO` address is correct
- ✅ Make sure Gmail account has sufficient storage

### "Invalid login" Error
- ✅ Double-check the EMAIL_USER (your Gmail address)
- ✅ Regenerate the App Password if needed
- ✅ Ensure no extra characters in the password

## Security Notes

- ✅ App passwords are safer than using your main password
- ✅ You can revoke app passwords anytime from Google Account settings
- ✅ Each app password is unique and can be individually managed
- ✅ Never share your app password or commit it to public repositories

## Production Deployment

When deploying to Vercel:

1. **Add environment variables in Vercel dashboard**:
   - Go to your project settings
   - Add the same environment variables
   - Deploy your changes

2. **Alternative for production**: Consider using professional email services:
   - SendGrid
   - Resend
   - Amazon SES

## Support

If you're still having issues:
1. Try creating a fresh Gmail account
2. Ensure you're following each step exactly
3. Check the browser console for specific error messages
4. Test with a simple email first

The setup should work immediately once configured correctly!