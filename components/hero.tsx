import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, Sparkles, Code2, Database } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-emerald-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-cyan-500/10 animate-pulse"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full opacity-25 animate-bounce delay-1000"></div>
      
      <div className="text-center max-w-5xl mx-auto relative z-10">
        <div className="mb-12">
          {/* Enhanced profile section */}
          <div className="relative mb-8">
            <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden">
                <Image 
                  src="/placeholder-user.jpg" 
                  alt="Prince Chisenga - Full-Stack Developer and Data Analyst" 
                  width={152} 
                  height={152} 
                  className="rounded-full object-cover"
                  priority
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-500/20 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Prince Chisenga
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full border border-purple-500/20">
              <Code2 className="w-5 h-5 text-purple-400" />
              <span className="text-lg sm:text-xl text-purple-300 font-medium">Full-Stack Developer</span>
            </div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full border border-blue-500/20">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-lg sm:text-xl text-blue-300 font-medium">Data Analyst</span>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Passionate about building <span className="text-purple-400 font-semibold">scalable web applications</span> and extracting <span className="text-blue-400 font-semibold">meaningful insights</span> from data. I bridge the gap between development and analytics to create <span className="text-emerald-400 font-semibold">data-driven solutions</span>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Link href="#contact">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 transform hover:scale-105" asChild>
            <Link href="/resume.pdf" download="Prince-Chisenga-Resume.pdf">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Link>
          </Button>
        </div>

        <div className="flex justify-center space-x-8">
          <Link href="https://github.com/JamesrPrince" className="group text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
            <div className="p-3 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300 shadow-lg">
              <Github className="h-6 w-6" />
            </div>
          </Link>
          <Link href="https://www.linkedin.com/in/prince--chisenga/" className="group text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110">
            <div className="p-3 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 shadow-lg">
              <Linkedin className="h-6 w-6" />
            </div>
          </Link>
          <Link
            href="mailto:jameslira36@yahoo.com"
            className="group text-slate-400 hover:text-white transition-all duration-300 transform hover:scale-110"
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 group-hover:from-emerald-600 group-hover:to-teal-600 transition-all duration-300 shadow-lg">
              <Mail className="h-6 w-6" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
