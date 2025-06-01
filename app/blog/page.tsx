import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight, BookOpen, Zap, Filter, TrendingUp, Users, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPosts, blogCategories, type BlogPost } from "@/lib/blog"
import { BlogClientWrapper } from "@/components/blog/blog-client-wrapper"
import { generateCanonicalUrl, generateOGImageUrl, defaultSEO } from "@/lib/seo/config"
import { WebsiteStructuredData, BreadcrumbStructuredData } from "@/components/seo/StructuredData"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical Blog | Prince Chisenga',
  description: 'Insights, tutorials, and thoughts on full-stack development, data analysis, and emerging technologies. Read articles about React, Next.js, Python, and more.',
  keywords: [
    'technical blog',
    'full-stack development',
    'data analysis',
    'react tutorials',
    'nextjs blog',
    'python programming',
    'web development',
    'javascript',
    'typescript',
    'programming tutorials',
    'software engineering',
    'data science',
    'machine learning',
    'frontend development',
    'backend development'
  ],
  alternates: {
    canonical: generateCanonicalUrl('/blog'),
  },
  openGraph: {
    title: 'Technical Blog | Prince Chisenga',
    description: 'Insights, tutorials, and thoughts on full-stack development, data analysis, and emerging technologies.',
    type: 'website',
    url: generateCanonicalUrl('/blog'),
    images: [
      {
        url: generateOGImageUrl('Technical Blog'),
        width: 1200,
        height: 630,
        alt: 'Prince Chisenga Technical Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog | Prince Chisenga',
    description: 'Insights, tutorials, and thoughts on full-stack development, data analysis, and emerging technologies.',
    images: [generateOGImageUrl('Technical Blog')],
    creator: '@PrinceChisenga',
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
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  
  // Add gradient colors for styling
  const postsWithGradients = blogPosts.map((post, index) => {
    const gradients = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500", 
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500"
    ]
    return {
      ...post,
      gradient: gradients[index % gradients.length]
    }
  })

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* SEO Structured Data */}
      <BreadcrumbStructuredData 
        items={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' }
        ]} 
      />
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-blue-950/20 animate-gradient"></div>
      
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-float" style={{animationDelay: '6s'}}></div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Technical Blog
              </h1>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and thoughts on 
              <span className="text-purple-400 font-semibold"> full-stack development</span>, 
              <span className="text-blue-400 font-semibold"> data analysis</span>, and 
              <span className="text-emerald-400 font-semibold"> emerging technologies</span>
            </p>

            {/* Category Tags for SEO */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {blogCategories.slice(1).map((category) => (
                <Badge 
                  key={category}
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-slate-900/30 border border-slate-700/50">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-purple-400 mr-2" />
                  <span className="text-2xl font-bold text-white">{blogPosts.length}</span>
                </div>
                <p className="text-sm text-slate-400">Articles Published</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-900/30 border border-slate-700/50">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-blue-400 mr-2" />
                  <span className="text-2xl font-bold text-white">{Math.floor(Math.random() * 5000) + 2000}</span>
                </div>
                <p className="text-sm text-slate-400">Monthly Readers</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-900/30 border border-slate-700/50">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
                  <span className="text-2xl font-bold text-white">{blogCategories.length - 1}</span>
                </div>
                <p className="text-sm text-slate-400">Categories</p>
              </div>
            </div>
          </div>
        </section>

        {/* Client-side wrapper for interactive components */}
        <BlogClientWrapper 
          initialPosts={postsWithGradients} 
          categories={blogCategories}
        />
        
        <Footer />
      </div>
    </div>
  )
}