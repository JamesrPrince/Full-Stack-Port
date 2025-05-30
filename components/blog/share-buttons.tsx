"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Twitter, Linkedin, Facebook, Copy, Check, Mail, MessageCircle } from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
  description: string
}

export function ShareButtons({ title, url, description }: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const encodedUrl = encodeURIComponent(fullUrl)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: fullUrl
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const shareButtons = [
    {
      name: "Twitter",
      icon: Twitter,
      href: shareLinks.twitter,
      className: "hover:bg-sky-600 hover:border-sky-500",
      color: "text-sky-400"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: shareLinks.linkedin,
      className: "hover:bg-blue-600 hover:border-blue-500",
      color: "text-blue-400"
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: shareLinks.facebook,
      className: "hover:bg-blue-700 hover:border-blue-600",
      color: "text-blue-500"
    },
    {
      name: "Email",
      icon: Mail,
      href: shareLinks.email,
      className: "hover:bg-emerald-600 hover:border-emerald-500",
      color: "text-emerald-400"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: shareLinks.whatsapp,
      className: "hover:bg-green-600 hover:border-green-500",
      color: "text-green-400"
    }
  ]

  return (
    <div className="relative">
      <Button
        size="sm"
        variant="secondary"
        onClick={handleNativeShare}
        className="bg-black/50 backdrop-blur-sm hover:bg-black/70 border-none text-white"
      >
        <Share2 className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-12 right-0 z-50 w-64 bg-slate-900/95 border-slate-700 backdrop-blur-sm shadow-xl">
            <CardContent className="p-4">
              <h4 className="font-medium text-white mb-3 text-sm">Share this article</h4>
              
              <div className="space-y-2">
                {shareButtons.map((button) => (
                  <a
                    key={button.name}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-2 rounded-lg border border-slate-600 text-slate-300 transition-all duration-200 ${button.className}`}
                  >
                    <button.icon className={`h-4 w-4 ${button.color}`} />
                    <span className="text-sm">{button.name}</span>
                  </a>
                ))}
                
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-3 p-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-purple-600 hover:border-purple-500 transition-all duration-200 w-full"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-purple-400" />
                  )}
                  <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-500 text-center">
                  Help others discover this content
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}