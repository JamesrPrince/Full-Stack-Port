"use client"

import { useEffect, useState } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

interface PerformanceMetrics {
  cls: number | null
  fcp: number | null
  lcp: number | null
  ttfb: number | null
  inp: number | null
}

interface PerformanceOptimizerProps {
  enableReporting?: boolean
  enablePreloading?: boolean
  enableResourceHints?: boolean
  children?: React.ReactNode
}

export function PerformanceOptimizer({
  enableReporting = true,
  enablePreloading = true,
  enableResourceHints = true,
  children
}: PerformanceOptimizerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cls: null,
    fcp: null,
    lcp: null,
    ttfb: null,
    inp: null
  })

  useEffect(() => {
    if (!enableReporting) return

    const updateMetric = (metric: Metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric.value
      }))

      // Send to analytics if available
      if (typeof window !== 'undefined') {
        // Google Analytics 4
        if (window.gtag) {
          window.gtag('event', metric.name, {
            custom_parameter_1: metric.value,
            custom_parameter_2: metric.rating,
            custom_parameter_3: metric.id
          })
        }

        // Vercel Analytics
        if (window.va) {
          window.va('track', 'Web Vitals', {
            metric: metric.name,
            value: metric.value,
            rating: metric.rating
          })
        }

        // Custom analytics endpoint
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            id: metric.id,
            url: window.location.pathname,
            timestamp: Date.now()
          })
        }).catch(() => {
          // Silently fail if endpoint doesn't exist
        })
      }

      // Console logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Performance] ${metric.name}:`, {
          value: Math.round(metric.value),
          rating: metric.rating,
          id: metric.id
        })
      }
    }

    // Collect Core Web Vitals
    onCLS(updateMetric)
    onFCP(updateMetric)
    onLCP(updateMetric)
    onTTFB(updateMetric)
    onINP(updateMetric)
  }, [enableReporting])

  useEffect(() => {
    if (!enablePreloading) return

    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLinks = [
        { href: '/fonts/inter-var.woff2', type: 'font/woff2' },
        { href: '/fonts/inter-latin.woff2', type: 'font/woff2' }
      ]

      fontLinks.forEach(font => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.type = font.type
        link.crossOrigin = 'anonymous'
        link.href = font.href
        document.head.appendChild(link)
      })

      // Preload critical images
      const criticalImages = [
        '/images/hero-bg.jpg',
        '/images/profile.jpg',
        '/placeholder-user.jpg'
      ]

      criticalImages.forEach(src => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        document.head.appendChild(link)
      })
    }

    preloadCriticalResources()
  }, [enablePreloading])

  useEffect(() => {
    if (!enableResourceHints) return

    // Add resource hints for better performance
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: '//images.unsplash.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        { rel: 'dns-prefetch', href: '//vercel-insights.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
      ]

      hints.forEach(hint => {
        const existing = document.querySelector(`link[href="${hint.href}"]`)
        if (!existing) {
          const link = document.createElement('link')
          link.rel = hint.rel
          link.href = hint.href
          if (hint.crossOrigin) {
            link.crossOrigin = hint.crossOrigin
          }
          document.head.appendChild(link)
        }
      })
    }

    addResourceHints()
  }, [enableResourceHints])

  // Lazy load images when they enter viewport
  useEffect(() => {
    const lazyImages = document.querySelectorAll('img[data-lazy]')
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.lazy) {
              img.src = img.dataset.lazy
              img.removeAttribute('data-lazy')
              imageObserver.unobserve(img)
            }
          }
        })
      })

      lazyImages.forEach((img) => imageObserver.observe(img))

      return () => {
        lazyImages.forEach((img) => imageObserver.unobserve(img))
      }
    }
  }, [])

  // Critical CSS injection for above-the-fold content
  useEffect(() => {
    const injectCriticalCSS = () => {
      const criticalCSS = `
        .hero-section { 
          background-attachment: fixed;
          will-change: transform;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 400% 400%;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `

      const style = document.createElement('style')
      style.textContent = criticalCSS
      document.head.insertBefore(style, document.head.firstChild)
    }

    injectCriticalCSS()
  }, [])

  // Optimize third-party scripts loading
  useEffect(() => {
    const optimizeThirdPartyScripts = () => {
      // Delay non-critical scripts
      const delayedScripts = [
        'https://www.google-analytics.com/analytics.js',
        'https://connect.facebook.net/en_US/sdk.js'
      ]

      delayedScripts.forEach(src => {
        setTimeout(() => {
          const script = document.createElement('script')
          script.src = src
          script.async = true
          script.defer = true
          document.body.appendChild(script)
        }, 3000) // Delay by 3 seconds
      })
    }

    if (document.readyState === 'complete') {
      optimizeThirdPartyScripts()
    } else {
      window.addEventListener('load', optimizeThirdPartyScripts)
    }
  }, [])

  return (
    <>
      {children}
      
      {/* Performance monitoring in development */}
      {process.env.NODE_ENV === 'development' && (
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontSize: '12px',
            zIndex: 9999,
            fontFamily: 'monospace'
          }}
        >
          <div>Performance Metrics:</div>
          <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : 'N/A'}</div>
          <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : 'N/A'}</div>
          <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}</div>
          <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : 'N/A'}</div>
          <div>INP: {metrics.inp ? `${Math.round(metrics.inp)}ms` : 'N/A'}</div>
        </div>
      )}
    </>
  )
}

// Performance utilities
export const performanceUtils = {
  // Measure component render time
  measureRender: (componentName: string) => {
    return {
      start: () => performance.mark(`${componentName}-start`),
      end: () => {
        performance.mark(`${componentName}-end`)
        performance.measure(componentName, `${componentName}-start`, `${componentName}-end`)
        const measure = performance.getEntriesByName(componentName)[0]
        if (process.env.NODE_ENV === 'development') {
          console.log(`[Performance] ${componentName}:`, `${measure.duration.toFixed(2)}ms`)
        }
      }
    }
  },

  // Preload route
  preloadRoute: (route: string) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = route
    document.head.appendChild(link)
  },

  // Optimize image loading
  optimizeImage: (img: HTMLImageElement) => {
    // Add loading="lazy" if not already present
    if (!img.loading) {
      img.loading = 'lazy'
    }

    // Add decoding="async" for better performance
    if (!img.decoding) {
      img.decoding = 'async'
    }

    // Add proper sizing attributes if missing
    if (!img.width && !img.height) {
      img.style.width = '100%'
      img.style.height = 'auto'
    }
  },

  // Critical resource preloader
  preloadCritical: (resources: Array<{ href: string; as: string; type?: string }>) => {
    resources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = resource.as
      link.href = resource.href
      if (resource.type) {
        link.type = resource.type
      }
      if (resource.as === 'font') {
        link.crossOrigin = 'anonymous'
      }
      document.head.appendChild(link)
    })
  },

  // Defer non-critical CSS
  deferCSS: (href: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    link.onload = () => {
      link.rel = 'stylesheet'
    }
    document.head.appendChild(link)
  }
}