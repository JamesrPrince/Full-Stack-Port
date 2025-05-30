"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Code2, Sparkles } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-purple-500/5" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Prince Chisenga
            </span>
            <Sparkles className="w-4 h-4 text-purple-400 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-all duration-300 relative group ${
                  index % 3 === 0 ? 'hover:bg-purple-500/10' :
                  index % 3 === 1 ? 'hover:bg-blue-500/10' :
                  'hover:bg-emerald-500/10'
                }`}
              >
                {item.label}
                <span className={`absolute inset-x-0 bottom-0 h-0.5 ${
                  index % 3 === 0 ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
                  index % 3 === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                  'bg-gradient-to-r from-emerald-400 to-teal-500'
                } scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:bg-purple-500/10 border border-slate-700 hover:border-purple-500/50 transition-all duration-300" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-5 w-5 text-purple-400" /> : 
              <Menu className="h-5 w-5 text-slate-300" />
            }
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-700/50 bg-slate-950/95 backdrop-blur-xl rounded-b-lg mx-4 mb-4">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 py-3 px-4 mx-2 rounded-lg text-slate-300 hover:text-white transition-all duration-300 ${
                  index % 3 === 0 ? 'hover:bg-purple-500/10' :
                  index % 3 === 1 ? 'hover:bg-blue-500/10' :
                  'hover:bg-emerald-500/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className={`w-2 h-2 rounded-full ${
                  index % 3 === 0 ? 'bg-gradient-to-r from-purple-400 to-pink-500' :
                  index % 3 === 1 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                  'bg-gradient-to-r from-emerald-400 to-teal-500'
                }`}></div>
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
