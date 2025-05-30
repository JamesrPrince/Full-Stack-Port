"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { List, ChevronRight, Hash } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Extract headings from HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const items: TocItem[] = Array.from(headings).map((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      const text = heading.textContent || ''
      const id = `heading-${index}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      
      // Add id to heading if it doesn't exist
      heading.id = id
      
      return { id, text, level }
    })
    
    setTocItems(items)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      
      let currentActiveId = ""
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.getBoundingClientRect().top <= 100) {
          currentActiveId = heading.id
          break
        }
      }
      
      setActiveId(currentActiveId)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white flex items-center gap-2">
            <List className="h-5 w-5" />
            Table of Contents
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-90'}`} />
          </Button>
        </div>
      </CardHeader>
      
      {!isCollapsed && (
        <CardContent className="pt-0">
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-slate-800 group ${
                  activeId === item.id 
                    ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border-l-2 border-purple-500' 
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{ 
                  paddingLeft: `${(item.level - 1) * 12 + 12}px`,
                  marginLeft: item.level > 2 ? `${(item.level - 2) * 8}px` : '0'
                }}
              >
                <div className="flex items-center gap-2">
                  <Hash className={`h-3 w-3 flex-shrink-0 ${
                    activeId === item.id ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-400'
                  }`} />
                  <span className="line-clamp-2 leading-tight">{item.text}</span>
                </div>
              </button>
            ))}
          </nav>
          
          {tocItems.length > 5 && (
            <div className="mt-4 pt-3 border-t border-slate-700">
              <p className="text-xs text-slate-500 text-center">
                {tocItems.length} sections
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}