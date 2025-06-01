import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Clock, ArrowLeft, Share2, Github, ExternalLink, BookOpen, MessageSquare, Heart, Eye, ArrowUp, Twitter, Linkedin, Copy, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPost, getBlogPosts, type BlogPost } from "@/lib/blog"
import { BlogCard } from "@/components/blog/blog-card"
import { CommentSection } from "@/components/blog/comment-section"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { ShareButtons } from "@/components/blog/share-buttons"
import { ScrollProgress } from "@/components/blog/scroll-progress"
import { generateBlogPostSEO, generateCanonicalUrl, generateOGImageUrl } from "@/lib/seo/config"
import { BlogPostStructuredData, BreadcrumbStructuredData } from "@/components/seo/StructuredData"
import { Breadcrumbs, getBlogBreadcrumbs } from "@/components/seo/Breadcrumbs"
import type { Metadata } from 'next'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const seoConfig = generateBlogPostSEO(
    post.title,
    post.excerpt,
    post.category,
    post.tags,
    post.date,
    post.readTime
  )

  const canonicalUrl = generateCanonicalUrl(`/blog/${params.slug}`)
  const ogImageUrl = generateOGImageUrl(post.title, 'blog')

  return {
    title: seoConfig.title,
    description: seoConfig.description,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author || 'Prince Chisenga' }],
    category: post.category,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: canonicalUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.date,
      section: post.category,
      tags: post.tags,
      authors: ['Prince Chisenga'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
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
}

export default async function BlogPostPage({ params }: PageProps) {
  const [post, allPosts] = await Promise.all([
    getBlogPost(params.slug),
    getBlogPosts()
  ])

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  // Generate breadcrumbs for SEO
  const breadcrumbItems = getBlogBreadcrumbs(post.title)

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* SEO Structured Data */}
      <BlogPostStructuredData
        title={post.title}
        excerpt={post.excerpt}
        image={post.image}
        publishedDate={post.date}
        tags={post.tags}
        category={post.category}
        readingTime={post.readTime}
        url={`/blog/${post.id}`}
      />
      
      <ScrollProgress />
      
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-blue-950/20 animate-gradient"></div>
    
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

      <div className="relative z-10">
        <Header />

        {/* SEO Breadcrumbs */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumbs items={breadcrumbItems} />

          <Button variant="ghost" asChild className="mb-8 text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-300">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>

        {/* Hero Section with Enhanced Design */}
        <div className="relative">
          <div className="relative h-64 sm:h-80 lg:h-96 mb-8 overflow-hidden">
            <Image 
              src={post.image || "/placeholder.svg"} 
              alt={post.title} 
              fill 
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />
            
            {/* Floating action buttons */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <ShareButtons 
                title={post.title}
                url={`/blog/${post.id}`}
                description={post.excerpt}
              />
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-6">
                <TableOfContents content={post.content} />
                
                {/* Article Stats */}
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Article Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Views
                      </span>
                      <span className="text-white font-medium">{Math.floor(Math.random() * 1000) + 500}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Likes
                      </span>
                      <span className="text-white font-medium">{Math.floor(Math.random() * 50) + 20}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Comments
                      </span>
                      <span className="text-white font-medium">{Math.floor(Math.random() * 15) + 5}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="pt-6 space-y-3">
                    <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                      <Heart className="mr-2 h-4 w-4" />
                      Like Article
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Add Comment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Article Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <article>
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex items-center gap-4 mb-4 flex-wrap">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-sm text-slate-400">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center text-sm text-slate-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                    {post.title}
                  </h1>
                  
                  <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags for SEO */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Enhanced Author Info */}
                  <div className="flex items-center gap-4 mb-8 p-6 rounded-xl bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700 backdrop-blur-sm">
                    <div className="relative">
                      <Image
                        src={post.author?.avatar || "/placeholder-user.jpg"}
                        alt={post.author?.name || "Author"}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-white">{post.author?.name || "Prince Chisenga"}</p>
                        <Badge variant="secondary" className="text-xs bg-purple-600/20 text-purple-300 border-purple-500/30">
                          Author
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Full-Stack Developer & Data Analyst</p>
                      <div className="flex items-center gap-3">
                        <Link href="https://github.com/JamesrPrince" className="text-slate-400 hover:text-white transition-colors">
                          <Github className="h-4 w-4" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/prince--chisenga/" className="text-slate-400 hover:text-white transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </Link>
                        <Link href="https://twitter.com" className="text-slate-400 hover:text-white transition-colors">
                          <Twitter className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">Published</p>
                      <p className="text-sm text-slate-300 font-medium">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags?.map((tag, index) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-none transition-all duration-300 cursor-pointer"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </header>

                {/* Article Body with Enhanced Typography */}
                <div className="prose prose-lg max-w-none mb-12 prose-slate prose-headings:text-white prose-headings:font-bold prose-p:text-slate-300 prose-p:leading-relaxed prose-strong:text-white prose-em:text-slate-300 prose-code:text-purple-300 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-pre:rounded-lg prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-purple-500 prose-blockquote:text-slate-400 prose-blockquote:bg-slate-900/30 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:text-slate-300">
                  <div 
                    className="leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                  />
                </div>

                {/* Related Resources */}
                <Card className="mb-12 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Related Resources & Links
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link
                        href="https://github.com/JamesrPrince"
                        className="flex items-center p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 group border border-slate-700 hover:border-slate-600"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-700 group-hover:bg-purple-600 transition-colors mr-4 flex items-center justify-center">
                          <Github className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-purple-300 transition-colors">Source Code</p>
                          <p className="text-sm text-slate-400">View on GitHub</p>
                        </div>
                      </Link>
                      
                      <Link
                        href="https://demo.com"
                        className="flex items-center p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 group border border-slate-700 hover:border-slate-600"
                      >
                        <div className="w-10 h-10 rounded-lg bg-slate-700 group-hover:bg-blue-600 transition-colors mr-4 flex items-center justify-center">
                          <ExternalLink className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-blue-300 transition-colors">Live Demo</p>
                          <p className="text-sm text-slate-400">Try it yourself</p>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                <Separator className="bg-slate-700 mb-12" />

                {/* Comment Section */}
                <CommentSection postId={post.id} />
              </article>
            </div>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-16 border-t border-slate-700">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  Related Articles
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Continue your learning journey with these related articles in {post.category}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => {
                  const gradients = [
                    "from-blue-500 to-cyan-500",
                    "from-purple-500 to-pink-500", 
                    "from-emerald-500 to-teal-500"
                  ]
                  return (
                    <BlogCard
                      key={relatedPost.id}
                      post={relatedPost}
                      gradient={gradients[index % gradients.length]}
                      variant="default"
                      showStats={true}
                    />
                  )
                })}
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <section className="mt-16 pt-16 border-t border-slate-700">
            <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-emerald-900/20 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 text-white">Stay Updated</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Get notified when I publish new articles about full-stack development, data analysis, and emerging technologies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 focus:outline-none"
                  />
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Navigation Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-slate-700 gap-4">
            <Button variant="outline" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Articles
              </Link>
            </Button>
            
            <div className="flex gap-4">
              <Button variant="outline" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300">
                <Link href="/#contact">
                  Get In Touch
                </Link>
              </Button>
              
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300"
              >
                <ArrowUp className="mr-2 h-4 w-4" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  )
}