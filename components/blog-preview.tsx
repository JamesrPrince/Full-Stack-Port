import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
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
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "react-server-components-guide",
      title: "A Complete Guide to React Server Components in Next.js 14",
      excerpt: "Dive deep into React Server Components and learn how they revolutionize modern web applications.",
      date: "2024-01-10",
      readTime: "12 min read",
      category: "Frontend Development",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "machine-learning-production",
      title: "Deploying Machine Learning Models to Production",
      excerpt: "A comprehensive guide on taking your ML models from notebooks to production-ready APIs.",
      date: "2024-01-05",
      readTime: "15 min read",
      category: "Machine Learning",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Technical insights, tutorials, and thoughts on development and data science
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
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
          <Button asChild size="lg">
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
