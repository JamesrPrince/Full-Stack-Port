export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  noindex?: boolean
  nofollow?: boolean
  author?: string
  publishedDate?: string
  modifiedDate?: string
  category?: string
  tags?: string[]
  readingTime?: string
}

export const defaultSEO: SEOConfig = {
  title: 'Prince Chisenga - Full-Stack Developer & Data Analyst',
  description: 'Full-Stack Developer and Data Analyst specializing in React, Next.js, Python, and modern web technologies. View my portfolio, projects, and technical blog.',
  keywords: [
    'full-stack developer',
    'data analyst',
    'react developer',
    'nextjs developer',
    'python developer',
    'web development',
    'data science',
    'machine learning',
    'portfolio',
    'software engineer',
    'frontend developer',
    'backend developer',
    'javascript',
    'typescript',
    'node.js',
    'sql',
    'data visualization',
    'api development',
    'responsive design',
    'prince chisenga'
  ],
  ogType: 'website',
  twitterCard: 'summary_large_image',
  author: 'Prince Chisenga'
}

export const siteConfig = {
  name: 'Prince Chisenga',
  domain: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3001' 
    : 'https://prince-chisenga.com',
  email: 'jameslira36@yahoo.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/prince--chisenga/',
    github: 'https://github.com/JamesrPrince',
    twitter: '', // Add if available
    instagram: '', // Add if available
  },
  location: {
    city: 'Lusaka',
    country: 'Zambia'
  }
}

export const structuredDataTypes = {
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Prince Chisenga',
    jobTitle: 'Full-Stack Developer & Data Analyst',
    email: siteConfig.email,
    url: siteConfig.domain,
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github
    ].filter(Boolean),
    knowsAbout: [
      'Full-Stack Development',
      'Data Analysis',
      'React.js',
      'Next.js',
      'Python',
      'JavaScript',
      'TypeScript',
      'Data Science',
      'Machine Learning',
      'Web Development',
      'API Development',
      'Database Design',
      'Data Visualization'
    ],
    alumniOf: 'University of Zambia', // Update with actual education
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.city,
      addressCountry: siteConfig.location.country
    }
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.domain,
    description: defaultSEO.description,
    author: {
      '@type': 'Person',
      name: 'Prince Chisenga'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.domain}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prince Chisenga - Developer Portfolio',
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/images/logo.png`,
    description: defaultSEO.description,
    founder: {
      '@type': 'Person',
      name: 'Prince Chisenga'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.email,
      contactType: 'Professional Inquiries'
    }
  }
}

export const generateSEOTitle = (pageTitle?: string): string => {
  if (!pageTitle) return defaultSEO.title
  return `${pageTitle} | Prince Chisenga`
}

export const generateSEODescription = (description?: string): string => {
  return description || defaultSEO.description
}

export const generateCanonicalUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${siteConfig.domain}${cleanPath}`
}

export const generateOGImageUrl = (title?: string, type: 'default' | 'blog' | 'project' = 'default'): string => {
  const baseUrl = `${siteConfig.domain}/api/og`
  const params = new URLSearchParams()
  
  if (title) params.append('title', title)
  params.append('type', type)
  
  return `${baseUrl}?${params.toString()}`
}

export const blogPostKeywords = {
  javascript: ['javascript', 'js', 'ecmascript', 'frontend', 'programming'],
  typescript: ['typescript', 'ts', 'type safety', 'javascript', 'programming'],
  react: ['react', 'reactjs', 'jsx', 'frontend', 'component', 'hooks'],
  nextjs: ['nextjs', 'next.js', 'react framework', 'ssr', 'static generation'],
  python: ['python', 'data science', 'machine learning', 'backend', 'programming'],
  dataAnalysis: ['data analysis', 'analytics', 'data science', 'visualization', 'insights'],
  webDevelopment: ['web development', 'website', 'full-stack', 'frontend', 'backend'],
  tutorial: ['tutorial', 'guide', 'how-to', 'learning', 'development'],
  bestPractices: ['best practices', 'tips', 'optimization', 'performance', 'clean code']
}

export const generateBlogPostSEO = (
  title: string,
  excerpt: string,
  category: string,
  tags: string[] = [],
  publishedDate?: string,
  readingTime?: string
): SEOConfig => {
  const categoryKeywords = blogPostKeywords[category as keyof typeof blogPostKeywords] || []
  const allKeywords = [...defaultSEO.keywords, ...categoryKeywords, ...tags]
  
  return {
    title: generateSEOTitle(title),
    description: excerpt,
    keywords: [...new Set(allKeywords)], // Remove duplicates
    ogType: 'article',
    twitterCard: 'summary_large_image',
    author: defaultSEO.author,
    publishedDate,
    modifiedDate: publishedDate,
    category,
    tags,
    readingTime
  }
}

export const generateProjectSEO = (
  title: string,
  description: string,
  technologies: string[] = []
): SEOConfig => {
  const techKeywords = technologies.map(tech => tech.toLowerCase())
  const projectKeywords = ['project', 'portfolio', 'development', 'coding']
  const allKeywords = [...defaultSEO.keywords, ...techKeywords, ...projectKeywords]
  
  return {
    title: generateSEOTitle(title),
    description,
    keywords: [...new Set(allKeywords)],
    ogType: 'website',
    twitterCard: 'summary_large_image'
  }
}