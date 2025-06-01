import { siteConfig } from './config'
import { getBlogPosts } from '../blog'
import fs from 'fs'
import path from 'path'

export interface SitemapUrl {
  url: string
  lastModified: string
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export interface SitemapConfig {
  baseUrl: string
  routes: Array<{
    path: string
    priority: number
    changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    lastMod?: string
  }>
}

const defaultRoutes = [
  { path: '/', priority: 1.0, changeFreq: 'weekly' as const },
  { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
  { path: '/projects', priority: 0.9, changeFreq: 'weekly' as const },
  { path: '/blog', priority: 0.9, changeFreq: 'daily' as const },
  { path: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
]

export function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlEntries = urls
    .map(
      (url) => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export function generateSitemapIndexXml(sitemaps: string[]): string {
  const sitemapEntries = sitemaps
    .map(
      (sitemap) => `
  <sitemap>
    <loc>${siteConfig.domain}/${sitemap}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`
}

export async function generateMainSitemap(): Promise<SitemapUrl[]> {
  const now = new Date().toISOString()
  
  return defaultRoutes.map(route => ({
    url: `${siteConfig.domain}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFreq,
    priority: route.priority
  }))
}

export async function generateBlogSitemap(): Promise<SitemapUrl[]> {
  try {
    const posts = await getBlogPosts()
    
    return posts.map(post => ({
      url: `${siteConfig.domain}/blog/${post.id}`,
      lastModified: new Date(post.date).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  } catch (error) {
    console.error('Error generating blog sitemap:', error)
    return []
  }
}

export async function generateProjectSitemap(): Promise<SitemapUrl[]> {
  // This will be expanded when project data is available
  const staticProjects = [
    { id: 'project-1', lastMod: '2024-01-01' },
    { id: 'project-2', lastMod: '2024-01-15' },
    { id: 'project-3', lastMod: '2024-02-01' },
  ]

  return staticProjects.map(project => ({
    url: `${siteConfig.domain}/projects/${project.id}`,
    lastModified: new Date(project.lastMod).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))
}

export async function generateImageSitemap(): Promise<string> {
  const images = [
    '/images/hero-bg.jpg',
    '/images/profile.jpg',
    '/images/logo.png',
    '/favicon.ico'
  ]

  const imageEntries = images
    .map(
      (image) => `
  <url>
    <loc>${siteConfig.domain}${image}</loc>
    <image:image>
      <image:loc>${siteConfig.domain}${image}</image:loc>
      <image:title>Prince Chisenga Portfolio</image:title>
    </image:image>
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries}
</urlset>`
}

export async function saveSitemaps(): Promise<void> {
  const publicDir = path.join(process.cwd(), 'public')

  try {
    // Generate main sitemap
    const mainUrls = await generateMainSitemap()
    const mainSitemapXml = generateSitemapXml(mainUrls)
    fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), mainSitemapXml)

    // Generate blog sitemap
    const blogUrls = await generateBlogSitemap()
    const blogSitemapXml = generateSitemapXml(blogUrls)
    fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), blogSitemapXml)

    // Generate projects sitemap
    const projectUrls = await generateProjectSitemap()
    const projectSitemapXml = generateSitemapXml(projectUrls)
    fs.writeFileSync(path.join(publicDir, 'sitemap-projects.xml'), projectSitemapXml)

    // Generate image sitemap
    const imageSitemapXml = await generateImageSitemap()
    fs.writeFileSync(path.join(publicDir, 'sitemap-images.xml'), imageSitemapXml)

    // Generate sitemap index
    const sitemaps = [
      'sitemap-main.xml',
      'sitemap-blog.xml', 
      'sitemap-projects.xml',
      'sitemap-images.xml'
    ]
    const sitemapIndexXml = generateSitemapIndexXml(sitemaps)
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml)

    console.log('✅ Sitemaps generated successfully')
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error)
  }
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Disallow private or sensitive areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$

# Allow important static assets
Allow: /api/og
Allow: /images/
Allow: /icons/
Allow: /favicon.ico

# Crawl delay
Crawl-delay: 1

# Sitemap location
Sitemap: ${siteConfig.domain}/sitemap.xml

# Additional directives for specific bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1`
}