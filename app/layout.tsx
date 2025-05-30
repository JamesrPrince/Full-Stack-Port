import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

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
    default: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
    template: '%s | Prince Chisenga'
  },
  description: 'Portfolio of Prince Chisenga, a passionate full-stack developer and data analyst specializing in building scalable web applications and extracting meaningful insights from data.',
  keywords: [
    'Full-Stack Developer', 
    'Data Analyst', 
    'React', 
    'Next.js', 
    'Python', 
    'Portfolio',
    'Web Development',
    'Data Science',
    'Machine Learning',
    'TypeScript'
  ],
  authors: [{ name: 'Prince Chisenga', url: 'https://github.com/JamesrPrince' }],
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
    url: 'https://your-domain.vercel.app',
    title: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
    description: 'Portfolio showcasing development and data science projects',
    siteName: 'Prince Chisenga Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
    description: 'Portfolio showcasing development and data science projects',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://your-domain.vercel.app',
  },
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
        <link rel="preload" href="/placeholder-user.jpg" as="image" />
        <meta name="google-site-verification" content="your-google-verification-code" />
      </head>
      <body className={`${inter.className} bg-slate-950 text-white font-sans antialiased`}>
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
