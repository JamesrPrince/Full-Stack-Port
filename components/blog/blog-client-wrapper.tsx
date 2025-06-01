"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Eye } from "lucide-react"
import { BlogSearch } from "./blog-search"
import { BlogCard } from "./blog-card"
import { BlogPost } from "@/lib/blog"

interface BlogClientWrapperProps {
  initialPosts: (BlogPost & { gradient: string })[]
  categories: string[]
}

export function BlogClientWrapper({ initialPosts, categories }: BlogClientWrapperProps) {
  const [filteredPosts, setFilteredPosts] = useState(initialPosts)

  const handleFilteredPosts = (posts: BlogPost[]) => {
    // Map filtered posts back to include gradients
    const gradients = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500", 
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500"
    ]
    
    const postsWithGradients = posts.map((post, index) => ({
      ...post,
      gradient: gradients[index % gradients.length]
    }))
    
    setFilteredPosts(postsWithGradients)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Enhanced Search and Filter */}
        <div className="mb-12">
          <BlogSearch 
            posts={initialPosts}
            categories={categories}
            postsChangeAction={handleFilteredPosts}
          />
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white text-center">Featured Article</h2>
            <BlogCard 
              post={filteredPosts[0]}
              gradient={filteredPosts[0].gradient}
              variant="featured"
              showStats={true}
            />
          </div>
        )}

        {/* Recent Posts */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              {filteredPosts.length === initialPosts.length ? 'All Articles' : 'Filtered Results'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Eye className="h-4 w-4" />
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
                <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  gradient={post.gradient}
                  variant="default"
                  showStats={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}