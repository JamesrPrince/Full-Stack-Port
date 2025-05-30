"use server"

import { getBlogPosts, getBlogPost, blogCategories, type BlogPost } from './blog'

export async function getBlogPostsAction(): Promise<BlogPost[]> {
  return await getBlogPosts()
}

export async function getBlogPostAction(slug: string): Promise<BlogPost | null> {
  return await getBlogPost(slug)
}

export async function getBlogCategoriesAction(): Promise<string[]> {
  return blogCategories
}

export async function searchBlogPostsAction(query: string, category?: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts()
  
  return posts.filter(post => {
    const matchesQuery = !query || 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
    
    const matchesCategory = !category || category === "All" || post.category === category
    
    return matchesQuery && matchesCategory
  })
}