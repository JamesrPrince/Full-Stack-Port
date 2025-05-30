import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import readingTime from 'reading-time'

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

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Get file names under /content/blog
    const fileNames = fs.readdirSync(postsDirectory)
    
    const allPostsData = await Promise.all(
      fileNames
        .filter((name) => name.endsWith('.md'))
        .map(async (fileName) => {
          // Remove ".md" from file name to get id
          const id = fileName.replace(/\.md$/, '')
          
          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          
          // Use gray-matter to parse the post metadata section
          const matterResult = matter(fileContents)
          
          // Use remark to convert markdown into HTML string
          const processedContent = await remark()
            .use(remarkGfm)
            .use(remarkHtml)
            .process(matterResult.content)
          const contentHtml = processedContent.toString()
          
          // Calculate reading time
          const readingTimeResult = readingTime(matterResult.content)
          
          return {
            id,
            content: contentHtml,
            readTime: readingTimeResult.text,
            ...matterResult.data,
          } as BlogPost
        })
    )
    
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
    
    // Calculate reading time
    const readingTimeResult = readingTime(matterResult.content)
    
    return {
      id: slug,
      content: contentHtml,
      readTime: readingTimeResult.text,
      ...matterResult.data,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function getSortedPostsData(): BlogPost[] {
  // This is a synchronous version for static generation
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        
        const readingTimeResult = readingTime(matterResult.content)
        
        return {
          id,
          content: '', // Don't include full content for list
          readTime: readingTimeResult.text,
          ...matterResult.data,
        } as BlogPost
      })
    
    return allPostsData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}
