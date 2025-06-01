import { siteConfig } from './config'

interface SEOAnalyticsEvent {
  name: string
  url: string
  timestamp: number
  userAgent?: string
  referrer?: string
  searchQuery?: string
  clickPosition?: number
  metadata?: Record<string, any>
}

interface SearchConsoleData {
  clicks: number
  impressions: number
  ctr: number
  position: number
  page: string
  query: string
}

interface SEOMetrics {
  organicTraffic: number
  keywordRankings: Record<string, number>
  clickThroughRate: number
  avgPosition: number
  impressions: number
  clicks: number
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
  }
}

class SEOAnalytics {
  private events: SEOAnalyticsEvent[] = []
  private isInitialized = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  private init() {
    if (this.isInitialized) return
    
    // Track page views
    this.trackPageView()
    
    // Track search queries from referrers
    this.trackSearchQueries()
    
    // Track internal link clicks
    this.trackInternalLinks()
    
    // Track external link clicks
    this.trackExternalLinks()
    
    // Track scroll depth
    this.trackScrollDepth()
    
    // Track time on page
    this.trackTimeOnPage()
    
    this.isInitialized = true
  }

  // Track page view with SEO context
  trackPageView() {
    const event: SEOAnalyticsEvent = {
      name: 'page_view',
      url: window.location.pathname,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      metadata: {
        title: document.title,
        description: this.getMetaContent('description'),
        keywords: this.getMetaContent('keywords'),
        canonical: this.getCanonicalUrl(),
        ogImage: this.getMetaContent('og:image'),
        viewport: this.getMetaContent('viewport')
      }
    }

    this.recordEvent(event)
    this.sendToAnalytics('page_view', event.metadata)
  }

  // Track search queries from organic traffic
  trackSearchQueries() {
    const referrer = document.referrer
    const searchEngines = [
      { name: 'google', pattern: /google\./i },
      { name: 'bing', pattern: /bing\./i },
      { name: 'yahoo', pattern: /yahoo\./i },
      { name: 'duckduckgo', pattern: /duckduckgo\./i }
    ]

    const searchEngine = searchEngines.find(engine => 
      engine.pattern.test(referrer)
    )

    if (searchEngine) {
      const url = new URL(referrer)
      const query = url.searchParams.get('q') || 
                   url.searchParams.get('query') || 
                   url.searchParams.get('p')

      if (query) {
        const event: SEOAnalyticsEvent = {
          name: 'organic_search',
          url: window.location.pathname,
          timestamp: Date.now(),
          referrer,
          searchQuery: query,
          metadata: {
            searchEngine: searchEngine.name,
            landingPage: window.location.pathname,
            queryLength: query.length
          }
        }

        this.recordEvent(event)
        this.sendToAnalytics('organic_search', event.metadata)
      }
    }
  }

  // Track internal link clicks for SEO analysis
  trackInternalLinks() {
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      const event: SEOAnalyticsEvent = {
        name: 'internal_link_click',
        url: window.location.pathname,
        timestamp: Date.now(),
        metadata: {
          targetUrl: href,
          linkText: link.textContent?.trim(),
          linkPosition: this.getLinkPosition(link),
          isNavigation: link.closest('nav') !== null,
          isBreadcrumb: link.closest('[aria-label="Breadcrumb"]') !== null
        }
      }

      this.recordEvent(event)
      this.sendToAnalytics('internal_link_click', event.metadata)
    })
  }

  // Track external link clicks
  trackExternalLinks() {
    document.addEventListener('click', (e) => {
      const link = (e.target as HTMLElement).closest('a')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href || !href.startsWith('http') || href.includes(window.location.hostname)) {
        return
      }

      const event: SEOAnalyticsEvent = {
        name: 'external_link_click',
        url: window.location.pathname,
        timestamp: Date.now(),
        metadata: {
          targetUrl: href,
          linkText: link.textContent?.trim(),
          domain: new URL(href).hostname,
          isNoFollow: link.getAttribute('rel')?.includes('nofollow') || false
        }
      }

      this.recordEvent(event)
      this.sendToAnalytics('external_link_click', event.metadata)
    })
  }

  // Track scroll depth for engagement metrics
  trackScrollDepth() {
    let maxScroll = 0
    const thresholds = [25, 50, 75, 100]
    const tracked = new Set()

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent

        thresholds.forEach(threshold => {
          if (scrollPercent >= threshold && !tracked.has(threshold)) {
            tracked.add(threshold)

            const event: SEOAnalyticsEvent = {
              name: 'scroll_depth',
              url: window.location.pathname,
              timestamp: Date.now(),
              metadata: {
                depth: threshold,
                maxDepth: maxScroll,
                documentHeight: document.documentElement.scrollHeight,
                viewportHeight: window.innerHeight
              }
            }

            this.recordEvent(event)
            this.sendToAnalytics('scroll_depth', event.metadata)
          }
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
  }

  // Track time on page
  trackTimeOnPage() {
    const startTime = Date.now()
    let isActive = true
    let totalTime = 0

    const updateTime = () => {
      if (isActive) {
        totalTime = Date.now() - startTime
      }
    }

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      isActive = !document.hidden
      updateTime()
    })

    // Send data before page unload
    window.addEventListener('beforeunload', () => {
      updateTime()

      const event: SEOAnalyticsEvent = {
        name: 'time_on_page',
        url: window.location.pathname,
        timestamp: Date.now(),
        metadata: {
          timeOnPage: totalTime,
          timeOnPageSeconds: Math.round(totalTime / 1000),
          isActiveTime: isActive,
          pageTitle: document.title
        }
      }

      this.recordEvent(event)
      
      // Use sendBeacon for reliable delivery
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/seo', JSON.stringify(event))
      }
    })
  }

  // Track custom SEO events
  trackSEOEvent(name: string, metadata: Record<string, any>) {
    const event: SEOAnalyticsEvent = {
      name,
      url: window.location.pathname,
      timestamp: Date.now(),
      metadata
    }

    this.recordEvent(event)
    this.sendToAnalytics(name, metadata)
  }

  // Track schema.org structured data presence
  trackStructuredData() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    const structuredData = Array.from(scripts).map(script => {
      try {
        return JSON.parse(script.textContent || '')
      } catch {
        return null
      }
    }).filter(Boolean)

    const event: SEOAnalyticsEvent = {
      name: 'structured_data',
      url: window.location.pathname,
      timestamp: Date.now(),
      metadata: {
        count: structuredData.length,
        types: structuredData.map(data => data['@type']).filter(Boolean),
        hasPersonSchema: structuredData.some(data => data['@type'] === 'Person'),
        hasWebsiteSchema: structuredData.some(data => data['@type'] === 'WebSite'),
        hasBlogPostSchema: structuredData.some(data => data['@type'] === 'BlogPosting'),
        hasOrganizationSchema: structuredData.some(data => data['@type'] === 'Organization')
      }
    }

    this.recordEvent(event)
    this.sendToAnalytics('structured_data', event.metadata)
  }

  // Get performance metrics for SEO
  getPerformanceMetrics(): Promise<SEOMetrics> {
    return new Promise((resolve) => {
      // Simulate getting metrics from various sources
      const metrics: SEOMetrics = {
        organicTraffic: this.events.filter(e => e.name === 'organic_search').length,
        keywordRankings: this.getKeywordRankings(),
        clickThroughRate: this.calculateCTR(),
        avgPosition: 15.2, // Would come from Search Console API
        impressions: 1250, // Would come from Search Console API
        clicks: 89, // Would come from Search Console API
        coreWebVitals: {
          lcp: 2.1, // Would come from real measurement
          fid: 95, // Would come from real measurement
          cls: 0.08 // Would come from real measurement
        }
      }

      resolve(metrics)
    })
  }

  // Generate SEO report
  generateSEOReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.pathname,
      seoHealth: this.calculateSEOHealth(),
      events: this.events,
      recommendations: this.generateRecommendations()
    }

    return report
  }

  // Private helper methods
  private recordEvent(event: SEOAnalyticsEvent) {
    this.events.push(event)
    
    // Keep only last 100 events to prevent memory issues
    if (this.events.length > 100) {
      this.events.shift()
    }
  }

  private sendToAnalytics(eventName: string, metadata: any) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, metadata)
    }

    // Vercel Analytics
    if (typeof window !== 'undefined' && window.va) {
      window.va('track', eventName, metadata)
    }

    // Custom analytics endpoint
    fetch('/api/analytics/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, metadata, timestamp: Date.now() })
    }).catch(() => {
      // Silently fail if endpoint doesn't exist
    })
  }

  private getMetaContent(name: string): string | null {
    const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
    return meta?.getAttribute('content') || null
  }

  private getCanonicalUrl(): string | null {
    const canonical = document.querySelector('link[rel="canonical"]')
    return canonical?.getAttribute('href') || null
  }

  private getLinkPosition(link: HTMLAnchorElement): number {
    const allLinks = Array.from(document.querySelectorAll('a'))
    return allLinks.indexOf(link) + 1
  }

  private getKeywordRankings(): Record<string, number> {
    // This would typically come from Search Console API
    return {
      'full-stack developer': 12,
      'data analyst portfolio': 8,
      'react developer': 18,
      'python programmer': 25,
      'web development': 35
    }
  }

  private calculateCTR(): number {
    const searchEvents = this.events.filter(e => e.name === 'organic_search')
    const pageViews = this.events.filter(e => e.name === 'page_view')
    
    if (pageViews.length === 0) return 0
    return (searchEvents.length / pageViews.length) * 100
  }

  private calculateSEOHealth(): number {
    let score = 100
    
    // Check for basic SEO elements
    if (!document.title || document.title.length < 30) score -= 10
    if (!this.getMetaContent('description')) score -= 15
    if (!this.getCanonicalUrl()) score -= 10
    if (!this.getMetaContent('og:title')) score -= 5
    if (!this.getMetaContent('og:description')) score -= 5
    
    // Check for structured data
    const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]')
    if (structuredDataScripts.length === 0) score -= 15
    
    return Math.max(0, score)
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = []
    
    if (!document.title || document.title.length < 30) {
      recommendations.push('Add a descriptive page title (30-60 characters)')
    }
    
    if (!this.getMetaContent('description')) {
      recommendations.push('Add a meta description (150-160 characters)')
    }
    
    if (!this.getCanonicalUrl()) {
      recommendations.push('Add a canonical URL to prevent duplicate content issues')
    }
    
    if (document.querySelectorAll('h1').length !== 1) {
      recommendations.push('Use exactly one H1 tag per page')
    }
    
    if (document.querySelectorAll('img:not([alt])').length > 0) {
      recommendations.push('Add alt text to all images')
    }
    
    return recommendations
  }
}

// Export singleton instance
export const seoAnalytics = new SEOAnalytics()

// Export utility functions
export const trackSEOEvent = (name: string, metadata: Record<string, any>) => {
  seoAnalytics.trackSEOEvent(name, metadata)
}

export const getSEOReport = () => {
  return seoAnalytics.generateSEOReport()
}

export const getSEOMetrics = () => {
  return seoAnalytics.getPerformanceMetrics()
}

// Enhanced search console integration
export class SearchConsoleAPI {
  private apiKey: string
  private siteUrl: string

  constructor(apiKey: string, siteUrl: string) {
    this.apiKey = apiKey
    this.siteUrl = siteUrl
  }

  async getSearchAnalytics(startDate: string, endDate: string): Promise<SearchConsoleData[]> {
    const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(this.siteUrl)}/searchAnalytics/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['page', 'query'],
        rowLimit: 100
      })
    })

    const data = await response.json()
    return data.rows?.map((row: any) => ({
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
      page: row.keys[0],
      query: row.keys[1]
    })) || []
  }

  async getTopQueries(limit: number = 50): Promise<Array<{query: string, clicks: number, impressions: number}>> {
    const endDate = new Date().toISOString().split('T')[0]
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    
    const data = await this.getSearchAnalytics(startDate, endDate)
    
    const queryMap = new Map()
    data.forEach(item => {
      if (queryMap.has(item.query)) {
        const existing = queryMap.get(item.query)
        existing.clicks += item.clicks
        existing.impressions += item.impressions
      } else {
        queryMap.set(item.query, {
          query: item.query,
          clicks: item.clicks,
          impressions: item.impressions
        })
      }
    })

    return Array.from(queryMap.values())
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, limit)
  }
}