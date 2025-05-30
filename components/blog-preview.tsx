import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ArrowRight, BookOpen, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function BlogPreview() {
  const featuredPosts = [
    {
      id: "building-scalable-data-pipelines",
      title: "Building Scalable Data Pipelines with Apache Kafka and Python",
      excerpt: "Learn how to design and implement robust data pipelines that can handle millions of events per day.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Data Engineering",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop&auto=format",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      id: "react-server-components-guide",
      title: "A Complete Guide to React Server Components in Next.js 14",
      excerpt: "Dive deep into React Server Components and learn how they revolutionize modern web applications.",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Frontend Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop&auto=format",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "machine-learning-production",
      title: "Deploying Machine Learning Models to Production",
      excerpt: "A comprehensive guide on taking your ML models from notebooks to production-ready APIs.",
      date: "2024-01-05",
      readTime: "15 min read",
      category: "Machine Learning",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop&auto=format",
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Latest Blog Posts
            </h2>
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Technical insights, tutorials, and thoughts on 
            <span className="text-purple-400 font-semibold"> development</span> and 
            <span className="text-blue-400 font-semibold"> data science</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <Card key={post.id} className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={post.image || "/placeholder.svg"} 
                  alt={post.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${post.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className={`bg-gradient-to-r ${post.gradient} text-white border-none`}>
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-slate-400">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-slate-400">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" asChild className={`text-slate-300 hover:bg-gradient-to-r hover:${post.gradient} hover:text-white transition-all duration-300`}>
                    <Link href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
