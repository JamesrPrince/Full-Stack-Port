import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: "building-scalable-data-pipelines",
    title: "Building Scalable Data Pipelines with Apache Kafka and Python",
    excerpt:
      "Learn how to design and implement robust data pipelines that can handle millions of events per day using Apache Kafka, Python, and modern cloud infrastructure.",
    content: "",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Data Engineering",
    tags: ["Apache Kafka", "Python", "Data Engineering", "Microservices"],
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "react-server-components-guide",
    title: "A Complete Guide to React Server Components in Next.js 14",
    excerpt:
      "Dive deep into React Server Components and learn how they revolutionize the way we build modern web applications with improved performance and developer experience.",
    content: "",
    date: "2024-01-10",
    readTime: "12 min read",
    category: "Frontend Development",
    tags: ["React", "Next.js", "Server Components", "Performance"],
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "machine-learning-production",
    title: "Deploying Machine Learning Models to Production: Best Practices",
    excerpt:
      "A comprehensive guide on taking your ML models from Jupyter notebooks to production-ready APIs with proper monitoring, versioning, and scalability considerations.",
    content: "",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Machine Learning",
    tags: ["Machine Learning", "MLOps", "Python", "Docker", "API"],
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "database-optimization-techniques",
    title: "Advanced PostgreSQL Optimization Techniques for High-Traffic Applications",
    excerpt:
      "Explore advanced database optimization strategies including indexing, query optimization, connection pooling, and partitioning for PostgreSQL databases.",
    content: "",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Database",
    tags: ["PostgreSQL", "Database", "Performance", "Optimization"],
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "data-visualization-best-practices",
    title: "Data Visualization Best Practices: From Raw Data to Actionable Insights",
    excerpt:
      "Learn how to create compelling and effective data visualizations that tell a story and drive business decisions using modern tools and design principles.",
    content: "",
    date: "2023-12-20",
    readTime: "7 min read",
    category: "Data Analysis",
    tags: ["Data Visualization", "Tableau", "D3.js", "Analytics"],
    image: "/placeholder.svg?height=300&width=600",
  },
  {
    id: "microservices-architecture-patterns",
    title: "Microservices Architecture Patterns: Lessons from Building at Scale",
    excerpt:
      "Real-world insights into microservices architecture patterns, including service discovery, API gateways, and distributed data management strategies.",
    content: "",
    date: "2023-12-15",
    readTime: "11 min read",
    category: "Backend Development",
    tags: ["Microservices", "Architecture", "Node.js", "Docker", "Kubernetes"],
    image: "/placeholder.svg?height=300&width=600",
  },
]

const categories = [
  "All",
  "Data Engineering",
  "Frontend Development",
  "Machine Learning",
  "Database",
  "Data Analysis",
  "Backend Development",
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header spacing */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Technical Blog</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Insights, tutorials, and thoughts on full-stack development, data analysis, and emerging technologies
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Post</h2>
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge>{blogPosts[0].category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {new Date(blogPosts[0].date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {blogPosts[0].readTime}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h3>
                  <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPosts[0].tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild>
                    <Link href={`/blog/${blogPosts[0].id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
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
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
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
          </div>
        </div>
      </section>
    </div>
  )
}
