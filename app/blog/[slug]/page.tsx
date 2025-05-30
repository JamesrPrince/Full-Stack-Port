import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, ArrowLeft, Share2, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPost, type BlogPost } from "@/lib/blog"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-blue-950/20 animate-gradient"></div>
    
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>

      <div className="relative z-10">
        <Header />

        {/* Back to blog */}
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="ghost" asChild className="mb-8 text-slate-300 hover:text-white hover:bg-slate-800">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 mb-8">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none">{post.category}</Badge>
              <div className="flex items-center text-sm text-slate-400">
                <CalendarDays className="mr-1 h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">{post.title}</h1>
            <p className="text-xl text-slate-300 mb-6 leading-relaxed">{post.excerpt}</p>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-white">{post.author.name}</p>
                <p className="text-sm text-slate-400">Full-Stack Developer & Data Analyst</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={tag} variant="secondary" className="bg-slate-800/80 border-slate-600 text-slate-300">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share Button */}
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-purple-500">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </header>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-12 text-slate-300 prose-headings:text-white prose-strong:text-white prose-code:text-purple-300 prose-code:bg-slate-800 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-purple-500 prose-blockquote:text-slate-400">
            <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Related Links */}
          <Card className="mt-12 bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Related Resources</h3>
              <div className="space-y-3">
                <Link
                  href="https://github.com/JamesrPrince"
                  className="flex items-center text-sm text-slate-400 hover:text-purple-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-purple-600 transition-colors mr-3 flex items-center justify-center">
                    <Github className="h-4 w-4" />
                  </div>
                  View source code on GitHub
                </Link>
                <Link
                  href="https://demo.com"
                  className="flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 group-hover:bg-blue-600 transition-colors mr-3 flex items-center justify-center">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  Live Demo
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-slate-700">
            <Button variant="outline" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Posts
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Link href="/#contact">Get In Touch</Link>
            </Button>
          </div>
        </article>
        <Footer />
      </div>
    </div>
  )
}