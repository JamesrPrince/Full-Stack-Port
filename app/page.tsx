import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WebVitals } from "@/components/performance/web-vitals"
import { DynamicSections } from "@/components/performance/dynamic-sections"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Performance monitoring */}
      <WebVitals />
      
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-blue-950/20 animate-gradient"></div>
      
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-float" style={{animationDelay: '6s'}}></div>
      
      <div className="relative z-10">
        <Header />
        <main className="space-y-0">
          <Hero />
          <About />
          <DynamicSections />
        </main>
        <Footer />
      </div>
    </div>
  )
}