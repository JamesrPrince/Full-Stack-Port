"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X, CalendarDays, Clock, Tag } from "lucide-react"
import { BlogPost } from "@/lib/blog"

interface BlogSearchProps {
  posts: BlogPost[]
  categories: string[]
  postsChangeAction: (posts: BlogPost[]) => void
}

export function BlogSearch({ posts, categories, postsChangeAction }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"date" | "readTime" | "title">("date")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [posts])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      // Search query filter
      const searchMatch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))

      // Category filter
      const categoryMatch = selectedCategory === "All" || post.category === selectedCategory

      // Tags filter
      const tagsMatch = selectedTags.length === 0 || 
        (post.tags && selectedTags.every(tag => post.tags.includes(tag)))

      return searchMatch && categoryMatch && tagsMatch
    })

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "readTime":
          const aTime = parseInt(a.readTime.replace(/\D/g, ''))
          const bTime = parseInt(b.readTime.replace(/\D/g, ''))
          return aTime - bTime
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [posts, searchQuery, selectedCategory, selectedTags, sortBy])

  // Update parent component when filtered posts change
  useEffect(() => {
    postsChangeAction(filteredPosts)
  }, [filteredPosts, postsChangeAction])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedTags([])
    setSortBy("date")
  }

  const activeFiltersCount = 
    (selectedCategory !== "All" ? 1 : 0) + 
    selectedTags.length + 
    (searchQuery ? 1 : 0)

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Search articles by title, content, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 transition-colors"
        />
      </div>

      {/* Filter Toggle and Stats */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-purple-600 text-white">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-slate-400 hover:text-white"
            >
              <X className="mr-1 h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>

        <div className="text-sm text-slate-400">
          Showing {filteredPosts.length} of {posts.length} articles
        </div>
      </div>

      {/* Advanced Filters */}
      {isFilterOpen && (
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none'
                        : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-none'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-none'
                        : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 hover:text-white hover:border-none'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Sort By</h3>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "date" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("date")}
                  className={sortBy === "date" ? 
                    "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : 
                    "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                >
                  <CalendarDays className="mr-1 h-3 w-3" />
                  Date
                </Button>
                <Button
                  variant={sortBy === "readTime" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("readTime")}
                  className={sortBy === "readTime" ? 
                    "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : 
                    "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                >
                  <Clock className="mr-1 h-3 w-3" />
                  Read Time
                </Button>
                <Button
                  variant={sortBy === "title" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy("title")}
                  className={sortBy === "title" ? 
                    "bg-gradient-to-r from-blue-600 to-cyan-600 text-white" : 
                    "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                >
                  Title
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              Search: "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedCategory !== "All" && (
            <Badge variant="secondary" className="bg-slate-800 text-slate-300">
              Category: {selectedCategory}
              <button
                onClick={() => setSelectedCategory("All")}
                className="ml-1 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-300">
              Tag: {tag}
              <button
                onClick={() => handleTagToggle(tag)}
                className="ml-1 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}