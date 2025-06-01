"use client"

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbStructuredData } from './StructuredData'

export interface BreadcrumbItem {
  name: string
  url: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    ...items
  ]

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <nav 
        className={`flex items-center space-x-2 text-sm text-slate-400 mb-6 ${className}`}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-slate-500" aria-hidden="true" />
              )}
              
              {index === 0 ? (
                <Link
                  href={item.url}
                  className="flex items-center hover:text-purple-400 transition-colors"
                  aria-label="Go to homepage"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ) : item.current || index === breadcrumbItems.length - 1 ? (
                <span 
                  className="text-white font-medium"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="hover:text-purple-400 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

// Pre-built breadcrumb configurations
export const getBlogBreadcrumbs = (postTitle?: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { name: 'Blog', url: '/blog' }
  ]
  
  if (postTitle) {
    items.push({ name: postTitle, url: '', current: true })
  }
  
  return items
}

export const getProjectBreadcrumbs = (projectTitle?: string): BreadcrumbItem[] => {
  const items: BreadcrumbItem[] = [
    { name: 'Projects', url: '/projects' }
  ]
  
  if (projectTitle) {
    items.push({ name: projectTitle, url: '', current: true })
  }
  
  return items
}

export const getAboutBreadcrumbs = (): BreadcrumbItem[] => [
  { name: 'About', url: '/about', current: true }
]

export const getContactBreadcrumbs = (): BreadcrumbItem[] => [
  { name: 'Contact', url: '/contact', current: true }
]