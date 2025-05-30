import { Card, CardContent } from "@/components/ui/card"
import { Code, BarChart3, Database, Brain, Sparkles, Zap } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Building modern web applications with React, Node.js, and cloud technologies",
      gradient: "from-purple-500 to-blue-500",
      bgGradient: "from-purple-500/10 to-blue-500/10",
      iconBg: "from-purple-600 to-blue-600",
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Extracting insights from complex datasets using Python, SQL, and visualization tools",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "from-blue-600 to-cyan-600",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Designing and implementing robust data pipelines and database architectures",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      iconBg: "from-emerald-600 to-teal-600",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Developing predictive models and implementing AI solutions for business problems",
      gradient: "from-pink-500 to-orange-500",
      bgGradient: "from-pink-500/10 to-orange-500/10",
      iconBg: "from-pink-600 to-orange-600",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            With <span className="text-purple-400 font-semibold">5+ years of experience</span> in software development and data analysis, I specialize in creating 
            <span className="text-blue-400 font-semibold"> end-to-end solutions</span> that combine robust engineering with data-driven insights. 
            My unique background allows me to build applications that not only function well but also provide 
            <span className="text-emerald-400 font-semibold"> valuable analytics and intelligence</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card 
              key={index} 
              className={`group text-center p-6 bg-gradient-to-br ${item.bgGradient} border-slate-700 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm relative overflow-hidden`}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardContent className="pt-6 relative z-10">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-3 text-white group-hover:bg-gradient-to-r group-hover:${item.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-2">5+</div>
            <div className="text-sm text-slate-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-sm text-slate-400">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">15+</div>
            <div className="text-sm text-slate-400">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent mb-2">24/7</div>
            <div className="text-sm text-slate-400">Availability</div>
          </div>
        </div>
      </div>
    </section>
  )
}
