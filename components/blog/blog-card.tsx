"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight, Eye, Heart, Share2, BookmarkPlus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BlogPost } from "@/lib/blog"
import { useState } from "react"

interface BlogCardProps {
  post: BlogPost
  gradient: string
  variant?: "default" | "featured" | "compact"
  showStats?: boolean
}

export function BlogCard({ post, gradient, variant = "default", showStats = false }: BlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10)
  const [viewCount] = useState(Math.floor(Math.random() * 500) + 100)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `/blog/${post.id}`
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`)
    }
  }

  if (variant === "featured") {
    return (
      <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
            
            {/* Floating Actions */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-none"
                onClick={handleBookmark}
              >
                <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-none"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge className={`bg-gradient-to-r ${gradient} text-white border-none`}>
                {post.category}
              </Badge>
              <div className="flex items-center text-sm text-slate-400">
                <CalendarDays className="mr-1 h-4 w-4" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-slate-400">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
              {post.title}
            </h3>
            
            <p className="text-slate-300 mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 4 && (
                <Badge variant="secondary" className="text-xs bg-slate-800/80 border-slate-600 text-slate-300">
                  +{post.tags.length - 4} more
                </Badge>
              )}
            </div>

            {showStats && (
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {viewCount}
                </div>
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 hover:text-red-400 transition-colors"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  {likeCount}
                </button>
              </div>
            )}
            
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Link href={`/blog/${post.id}`}>
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === "compact") {
    return (
      <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-[1.02] backdrop-blur-sm">
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-20`}></div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className={`bg-gradient-to-r ${gradient} text-white border-none text-xs`}>
                {post.category}
              </Badge>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="mr-1 h-3 w-3" />
                {post.readTime}
              </div>
            </div>
            
            <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h4>
            
            <p className="text-sm text-slate-400 line-clamp-2 mb-3">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-slate-500">
                <CalendarDays className="mr-1 h-3 w-3" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <Button variant="ghost" size="sm" asChild className="text-xs text-slate-400 hover:text-white">
                <Link href={`/blog/${post.id}`}>
                  Read
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Default variant
  return (
    <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className={`bg-gradient-to-r ${gradient} text-white border-none`}>
            {post.category}
          </Badge>
        </div>
        
        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-none"
            onClick={handleBookmark}
          >
            <BookmarkPlus className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-none"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        {/* Read Time */}
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-none">
            <Clock className="mr-1 h-3 w-3" />
            {post.readTime}
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs border-slate-600 text-slate-400 hover:border-purple-500 hover:text-purple-300 transition-colors">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-slate-400">
            <CalendarDays className="mr-1 h-3 w-3" />
            {new Date(post.date).toLocaleDateString()}
          </div>
          
          <div className="flex items-center gap-2">
            {showStats && (
              <div className="flex items-center gap-3 text-sm text-slate-400 mr-3">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {viewCount}
                </div>
                <button
                  onClick={handleLike}
                  className="flex items-center gap-1 hover:text-red-400 transition-colors"
                >
                  <Heart className={`h-3 w-3 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  {likeCount}
                </button>
              </div>
            )}
            
            <Button variant="ghost" size="sm" asChild className={`text-slate-300 hover:bg-gradient-to-r hover:${gradient} hover:text-white transition-all duration-300`}>
              <Link href={`/blog/${post.id}`}>
                Read More
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}