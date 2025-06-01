import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { defaultSEO, siteConfig, generateOGImageUrl } from '@/lib/seo/config'
import { PersonStructuredData, WebsiteStructuredData, OrganizationStructuredData } from '@/components/seo/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ]
}

export const metadata: Metadata = {
  title: {
    default: defaultSEO.title,
    template: '%s | Prince Chisenga'
  },
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
  authors: [{ name: 'Prince Chisenga', url: siteConfig.social.github }],
  creator: 'Prince Chisenga',
  publisher: 'Prince Chisenga',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://prince-chisenga.com',
    title: defaultSEO.title,
    description: defaultSEO.description,
    siteName: siteConfig.name,
    images: [
      {
        url: generateOGImageUrl(),
        width: 1200,
        height: 630,
        alt: defaultSEO.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultSEO.title,
    description: defaultSEO.description,
    images: [generateOGImageUrl()],
    creator: '@PrinceChisenga',
  },
  verification: {
    google: 'your-google-verification-code', // Update with actual verification code
  },
  alternates: {
    canonical: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://prince-chisenga.com',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#8b5cf6',
      },
    ],
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://vercel-insights.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preload" href="/placeholder-user.jpg" as="image" />
        <link rel="preload" href="/images/hero-bg.jpg" as="image" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-white font-sans antialiased`}>
        <PersonStructuredData />
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
