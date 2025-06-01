import Head from 'next/head'
import { SEOConfig, siteConfig, generateCanonicalUrl, generateOGImageUrl } from '@/lib/seo/config'

interface SEOHeadProps extends Partial<SEOConfig> {
  path?: string
}

export function SEOHead({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  nofollow = false,
  author,
  publishedDate,
  modifiedDate,
  category,
  tags = [],
  readingTime,
  path = '/'
}: SEOHeadProps) {
  const finalCanonicalUrl = canonicalUrl || generateCanonicalUrl(path)
  const finalOGImage = ogImage || generateOGImageUrl(title)
  const keywordsString = keywords.length > 0 ? keywords.join(', ') : undefined
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywordsString && <meta name="keywords" content={keywordsString} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content="en_US" />
      {finalOGImage && <meta property="og:image" content={finalOGImage} />}
      {finalOGImage && <meta property="og:image:alt" content={title || 'Prince Chisenga Portfolio'} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Article specific Open Graph */}
      {ogType === 'article' && (
        <>
          {publishedDate && <meta property="article:published_time" content={publishedDate} />}
          {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
          {author && <meta property="article:author" content={author} />}
          {category && <meta property="article:section" content={category} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
          {readingTime && <meta property="article:reading_time" content={readingTime} />}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@PrinceChisenga" />
      <meta name="twitter:creator" content="@PrinceChisenga" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {finalOGImage && <meta name="twitter:image" content={finalOGImage} />}
      {finalOGImage && <meta name="twitter:image:alt" content={title || 'Prince Chisenga Portfolio'} />}
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#8b5cf6" />
      <meta name="msapplication-TileColor" content="#8b5cf6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//vercel-insights.com" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="320" />
      
      {/* Structured Data JSON-LD will be added separately */}
    </Head>
  )
}