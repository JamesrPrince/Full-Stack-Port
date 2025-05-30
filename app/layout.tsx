import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
  description: 'Portfolio of Prince Chisenga, a passionate full-stack developer and data analyst specializing in building scalable web applications and extracting meaningful insights from data.',
  keywords: ['Full-Stack Developer', 'Data Analyst', 'React', 'Next.js', 'Python', 'Portfolio'],
  authors: [{ name: 'Prince Chisenga' }],
  creator: 'Prince Chisenga',
  openGraph: {
    title: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
    description: 'Portfolio showcasing development and data science projects',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
