"use client"

import { useEffect } from 'react'
import { structuredDataTypes, siteConfig } from '@/lib/seo/config'

interface StructuredDataProps {
  type: 'person' | 'website' | 'organization' | 'blogPosting' | 'breadcrumbList' | 'faqPage'
  data?: any
  children?: React.ReactNode
}

export function StructuredData({ type, data, children }: StructuredDataProps) {
  useEffect(() => {
    let structuredData: any

    switch (type) {
      case 'person':
        structuredData = structuredDataTypes.person
        break
      case 'website':
        structuredData = structuredDataTypes.website
        break
      case 'organization':
        structuredData = structuredDataTypes.organization
        break
      case 'blogPosting':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data?.title,
          description: data?.excerpt,
          image: data?.image || `${siteConfig.domain}/api/og?title=${encodeURIComponent(data?.title || '')}`,
          author: {
            '@type': 'Person',
            name: 'Prince Chisenga',
            url: siteConfig.domain
          },
          publisher: {
            '@type': 'Person',
            name: 'Prince Chisenga',
            logo: {
              '@type': 'ImageObject',
              url: `${siteConfig.domain}/images/logo.png`
            }
          },
          datePublished: data?.publishedDate,
          dateModified: data?.modifiedDate || data?.publishedDate,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.domain}${data?.url}`
          },
          keywords: data?.tags?.join(', '),
          articleSection: data?.category,
          timeRequired: data?.readingTime,
          url: `${siteConfig.domain}${data?.url}`,
          isPartOf: {
            '@type': 'Blog',
            name: 'Prince Chisenga Blog',
            url: `${siteConfig.domain}/blog`
          }
        }
        break
      case 'breadcrumbList':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data?.items?.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.domain}${item.url}`
          })) || []
        }
        break
      case 'faqPage':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data?.questions?.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          })) || []
        }
        break
      default:
        return
    }

    // Merge with custom data if provided
    if (data && type !== 'blogPosting' && type !== 'breadcrumbList' && type !== 'faqPage') {
      structuredData = { ...structuredData, ...data }
    }

    // Create and inject the script tag
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    script.id = `structured-data-${type}`
    
    // Remove existing script if present
    const existingScript = document.getElementById(`structured-data-${type}`)
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById(`structured-data-${type}`)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [type, data])

  return <>{children}</>
}

// Specific structured data components for common use cases
export function PersonStructuredData() {
  return <StructuredData type="person" />
}

export function WebsiteStructuredData() {
  return <StructuredData type="website" />
}

export function OrganizationStructuredData() {
  return <StructuredData type="organization" />
}

export function BlogPostStructuredData({
  title,
  excerpt,
  image,
  publishedDate,
  modifiedDate,
  tags,
  category,
  readingTime,
  url
}: {
  title: string
  excerpt: string
  image?: string
  publishedDate: string
  modifiedDate?: string
  tags?: string[]
  category: string
  readingTime?: string
  url: string
}) {
  const data = {
    title,
    excerpt,
    image,
    publishedDate,
    modifiedDate,
    tags,
    category,
    readingTime,
    url
  }

  return <StructuredData type="blogPosting" data={data} />
}

export function BreadcrumbStructuredData({
  items
}: {
  items: Array<{ name: string; url: string }>
}) {
  return <StructuredData type="breadcrumbList" data={{ items }} />
}

export function FAQStructuredData({
  questions
}: {
  questions: Array<{ question: string; answer: string }>
}) {
  return <StructuredData type="faqPage" data={{ questions }} />
}

// Project structured data
export function ProjectStructuredData({
  name,
  description,
  image,
  technologies,
  url,
  githubUrl,
  liveUrl
}: {
  name: string
  description: string
  image?: string
  technologies: string[]
  url: string
  githubUrl?: string
  liveUrl?: string
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    image: image || `${siteConfig.domain}/api/og?title=${encodeURIComponent(name)}&type=project`,
    author: {
      '@type': 'Person',
      name: 'Prince Chisenga',
      url: siteConfig.domain
    },
    programmingLanguage: technologies,
    url: `${siteConfig.domain}${url}`,
    codeRepository: githubUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    ...(liveUrl && { 
      installUrl: liveUrl,
      downloadUrl: liveUrl 
    })
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    script.id = `structured-data-project-${name.replace(/\s+/g, '-').toLowerCase()}`
    
    const existingScript = document.getElementById(script.id)
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById(script.id)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [data, name])

  return null
}