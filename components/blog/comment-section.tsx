"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Reply, Flag, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    isVerified?: boolean
  }
  content: string
  timestamp: Date
  likes: number
  dislikes: number
  replies?: Comment[]
  isLiked?: boolean
  isDisliked?: boolean
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")

  // Mock comments data
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: "1",
        author: {
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          isVerified: true
        },
        content: "Great article! This approach to data pipeline architecture is exactly what we needed for our current project. The examples are clear and practical.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        likes: 12,
        dislikes: 0,
        replies: [
          {
            id: "1-1",
            author: {
              name: "Prince Chisenga",
              avatar: "/placeholder-user.jpg",
              isVerified: true
            },
            content: "Thanks Sarah! I'm glad you found it useful. If you implement this in your project, I'd love to hear about your experience.",
            timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
            likes: 5,
            dislikes: 0
          }
        ]
      },
      {
        id: "2",
        author: {
          name: "Michael Rodriguez",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
        },
        content: "I've been struggling with scaling our data processing workflows. This article came at the perfect time. Question: how do you handle error recovery in your pipeline?",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        likes: 8,
        dislikes: 1
      },
      {
        id: "3",
        author: {
          name: "Emily Watson",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
        },
        content: "Excellent breakdown of the architecture patterns. The performance metrics section was particularly insightful. Have you considered adding monitoring and alerting strategies?",
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        likes: 15,
        dislikes: 2
      }
    ]
    setComments(mockComments)
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !authorName.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: authorName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=8b5cf6&color=fff`
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0
    }

    setComments(prev => [comment, ...prev])
    setNewComment("")
    setAuthorName("")
    setAuthorEmail("")
    setIsSubmitting(false)
  }

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: {
        name: "You",
        avatar: "https://ui-avatars.com/api/?name=You&background=8b5cf6&color=fff"
      },
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      dislikes: 0
    }

    setComments(prev => prev.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        }
      }
      return comment
    }))

    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes,
          isLiked: !comment.isLiked,
          isDisliked: false
        }
      }
      return comment
    }))
  }

  const handleDislike = (commentId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes,
          isDisliked: !comment.isDisliked,
          isLiked: false
        }
      }
      return comment
    }))
  }

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return a.timestamp.getTime() - b.timestamp.getTime()
      case "popular":
        return (b.likes - b.dislikes) - (a.likes - a.dislikes)
      default: // newest
        return b.timestamp.getTime() - a.timestamp.getTime()
    }
  })

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : ''}`}>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-white">{comment.author.name}</span>
              {comment.author.isVerified && (
                <Badge variant="secondary" className="text-xs bg-blue-600/20 text-blue-300 border-blue-500/30">
                  Verified
                </Badge>
              )}
              <span className="text-xs text-slate-500">
                {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
              </span>
            </div>
            
            <p className="text-slate-300 leading-relaxed mb-3">{comment.content}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1 transition-colors ${
                  comment.isLiked ? 'text-blue-400' : 'text-slate-400 hover:text-blue-400'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                {comment.likes}
              </button>
              
              <button
                onClick={() => handleDislike(comment.id)}
                className={`flex items-center gap-1 transition-colors ${
                  comment.isDisliked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                {comment.dislikes}
              </button>
              
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <Reply className="h-4 w-4" />
                  Reply
                </button>
              )}
              
              <button className="flex items-center gap-1 text-slate-400 hover:text-red-400 transition-colors">
                <Flag className="h-4 w-4" />
                Report
              </button>
            </div>
          </div>
          
          {replyingTo === comment.id && (
            <div className="mt-4 ml-4">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="mb-3 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 min-h-[80px]"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Reply
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setReplyingTo(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Comments ({comments.length})
        </h3>
        
        <div className="flex gap-2">
          {(["newest", "oldest", "popular"] as const).map((option) => (
            <Button
              key={option}
              variant={sortBy === option ? "default" : "ghost"}
              size="sm"
              onClick={() => setSortBy(option)}
              className={sortBy === option ? 
                "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : 
                "text-slate-400 hover:text-white"
              }
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Comment Form */}
      <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">Join the Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              />
              <Input
                type="email"
                placeholder="Your email (optional)"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
              />
            </div>
            
            <Textarea
              placeholder="Share your thoughts about this article..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 min-h-[120px]"
            />
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-400">
                Your email will not be published. Be respectful and constructive.
              </p>
              
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {sortedComments.length > 0 ? (
          sortedComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">No comments yet</h4>
              <p className="text-slate-400">Be the first to share your thoughts about this article!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}