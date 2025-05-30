export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
  author: {
    name: string
    avatar: string
  }
}

export const blogCategories = [
  "All",
  "Data Engineering",
  "Frontend Development",
  "Machine Learning",
  "Database",
  "Data Analysis",
  "Backend Development",
]

// This would typically come from a CMS or database
export async function getBlogPosts(): Promise<BlogPost[]> {
  // Simulate API call
  return [
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
      author: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    // ... other posts
  ]
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.id === slug) || null
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
