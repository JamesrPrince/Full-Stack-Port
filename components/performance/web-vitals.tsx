"use client"

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'

interface Metric {
  name: string
  value: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

// Extend Window interface to include analytics properties
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    va?: (...args: any[]) => void
  }
}

function sendToAnalytics(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
      id: metric.id
    })
  }

  // Send to analytics service (Google Analytics, Vercel Analytics, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      custom_parameter_1: metric.value,
      custom_parameter_2: metric.rating,
      custom_parameter_3: metric.id
    })
  }

  // Send to Vercel Analytics if available
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', 'Web Vitals', {
      metric: metric.name,
      value: metric.value,
      rating: metric.rating
    })
  }
}

export function WebVitals() {
  useEffect(() => {
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
    onINP(sendToAnalytics)
  }, [])

  return null
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  useEffect(() => {
    const startTime = performance.now()

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('[Performance] Navigation timing:', {
            'DNS Lookup': navEntry.domainLookupEnd - navEntry.domainLookupStart,
            'TCP Connection': navEntry.connectEnd - navEntry.connectStart,
            'Request': navEntry.responseStart - navEntry.requestStart,
            'Response': navEntry.responseEnd - navEntry.responseStart,
            'DOM Processing': navEntry.domComplete - navEntry.responseEnd,
            'Total Load Time': navEntry.loadEventEnd - navEntry.fetchStart
          })
        }
      })
    })

    observer.observe({ entryTypes: ['navigation'] })

    return () => {
      observer.disconnect()
      const endTime = performance.now()
      console.log(`[Performance] Component mount time: ${endTime - startTime}ms`)
    }
  }, [])
}

// Performance utilities
export const performanceUtils = {
  measureComponentRender: (componentName: string) => {
    return {
      start: () => performance.mark(`${componentName}-start`),
      end: () => {
        performance.mark(`${componentName}-end`)
        performance.measure(componentName, `${componentName}-start`, `${componentName}-end`)
        const measure = performance.getEntriesByName(componentName)[0]
        console.log(`[Performance] ${componentName} render time:`, measure.duration.toFixed(2) + 'ms')
      }
    }
  },

  preloadImage: (src: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  },

  preloadFont: (href: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = href
    document.head.appendChild(link)
  }
}