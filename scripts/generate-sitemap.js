#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const DOMAIN = 'https://prince-chisenga.com' // Update with actual domain
const OUTPUT_DIR = path.join(__dirname, '../public')

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/projects', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.9, changefreq: 'daily' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
]

function formatDate(date) {
  return new Date(date).toISOString()
}

function generateSitemapXml(urls) {
  const urlEntries = urls
    .map(url => `
  <url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

function generateSitemapIndex(sitemaps) {
  const sitemapEntries = sitemaps
    .map(sitemap => `
  <sitemap>
    <loc>${DOMAIN}/${sitemap}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
  </sitemap>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`
}

function getBlogPosts() {
  const blogDir = path.join(__dirname, '../content/blog')
  
  if (!fs.existsSync(blogDir)) {
    console.log('Blog directory not found, skipping blog sitemap')
    return []
  }

  const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'))
  
  return files.map(file => {
    const filePath = path.join(blogDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(fileContent)
    const slug = file.replace(/\.md$/, '')
    
    return {
      url: `${DOMAIN}/blog/${slug}`,
      lastmod: formatDate(data.date || new Date()),
      changefreq: 'monthly',
      priority: 0.7
    }
  })
}

function getProjects() {
  // Static projects for now - can be expanded to read from files
  const projects = [
    { slug: 'e-commerce-platform', date: '2024-01-01' },
    { slug: 'data-visualization-dashboard', date: '2024-01-15' },
    { slug: 'ml-prediction-model', date: '2024-02-01' },
  ]

  return projects.map(project => ({
    url: `${DOMAIN}/projects/${project.slug}`,
    lastmod: formatDate(project.date),
    changefreq: 'monthly',
    priority: 0.8
  }))
}

function generateMainSitemap() {
  const now = formatDate(new Date())
  
  return staticRoutes.map(route => ({
    url: `${DOMAIN}${route.path}`,
    lastmod: now,
    changefreq: route.changefreq,
    priority: route.priority
  }))
}

function generateImageSitemap() {
  const images = [
    '/images/hero-bg.jpg',
    '/images/profile.jpg',
    '/images/logo.png',
    '/favicon.ico'
  ]

  const imageEntries = images
    .map(image => `
  <url>
    <loc>${DOMAIN}${image}</loc>
    <image:image>
      <image:loc>${DOMAIN}${image}</image:loc>
      <image:title>Prince Chisenga Portfolio</image:title>
    </image:image>
  </url>`)
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries}
</urlset>`
}

function main() {
  try {
    console.log('🚀 Generating sitemaps...')

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    }

    // Generate main sitemap
    const mainUrls = generateMainSitemap()
    const mainSitemapXml = generateSitemapXml(mainUrls)
    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-main.xml'), mainSitemapXml)
    console.log('✅ Main sitemap generated')

    // Generate blog sitemap
    const blogUrls = getBlogPosts()
    if (blogUrls.length > 0) {
      const blogSitemapXml = generateSitemapXml(blogUrls)
      fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-blog.xml'), blogSitemapXml)
      console.log(`✅ Blog sitemap generated (${blogUrls.length} posts)`)
    }

    // Generate projects sitemap
    const projectUrls = getProjects()
    const projectSitemapXml = generateSitemapXml(projectUrls)
    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-projects.xml'), projectSitemapXml)
    console.log(`✅ Projects sitemap generated (${projectUrls.length} projects)`)

    // Generate image sitemap
    const imageSitemapXml = generateImageSitemap()
    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-images.xml'), imageSitemapXml)
    console.log('✅ Image sitemap generated')

    // Generate sitemap index
    const sitemaps = ['sitemap-main.xml', 'sitemap-projects.xml', 'sitemap-images.xml']
    if (blogUrls.length > 0) {
      sitemaps.splice(1, 0, 'sitemap-blog.xml')
    }
    
    const sitemapIndexXml = generateSitemapIndex(sitemaps)
    fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), sitemapIndexXml)
    console.log('✅ Sitemap index generated')

    console.log(`🎉 All sitemaps generated successfully in ${OUTPUT_DIR}`)
  } catch (error) {
    console.error('❌ Error generating sitemaps:', error)
    process.exit(1)
  }
}

main()