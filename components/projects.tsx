import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, TrendingUp, Zap, Brain, BarChart3 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Projects() {
  const projects = [
    {
      title: "E-commerce Analytics Dashboard",
      description:
        "Full-stack web application with real-time analytics dashboard for e-commerce businesses. Features customer behavior tracking, sales forecasting, and inventory optimization.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&auto=format",
      tags: ["React", "Node.js", "PostgreSQL", "Python", "Tableau"],
      type: "Full-Stack + Analytics",
      icon: BarChart3,
      gradient: "from-blue-500 to-cyan-500",
      github: "https://github.com/JamesrPrince",
      demo: "https://demo.com",
    },
    {
      title: "Customer Churn Prediction Model",
      description:
        "Machine learning model to predict customer churn with 92% accuracy. Includes data preprocessing pipeline, feature engineering, and model deployment via REST API.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop&auto=format",
      tags: ["Python", "Scikit-learn", "FastAPI", "Docker", "AWS"],
      type: "Data Science",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      github: "https://github.com/JamesrPrince",
      demo: "https://demo.com",
    },
    {
      title: "Real-time Data Pipeline",
      description:
        "Scalable data pipeline processing 1M+ events daily. Includes real-time streaming, data transformation, and automated reporting for business intelligence.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=200&fit=crop&auto=format",
      tags: ["Apache Kafka", "Python", "PostgreSQL", "Docker", "Airflow"],
      type: "Data Engineering",
      icon: Zap,
      gradient: "from-emerald-500 to-teal-500",
      github: "https://github.com/JamesrPrince",
      demo: "https://demo.com",
    },
    {
      title: "Social Media Analytics Platform",
      description:
        "Web platform for social media sentiment analysis and trend tracking. Features natural language processing, data visualization, and automated reporting.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop&auto=format",
      tags: ["Next.js", "Python", "MongoDB", "NLP", "Chart.js"],
      type: "Full-Stack + ML",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-500",
      github: "https://github.com/JamesrPrince",
      demo: "https://demo.com",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A showcase of development and data science projects that combine 
            <span className="text-purple-400 font-semibold"> innovation</span> with 
            <span className="text-blue-400 font-semibold"> impact</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={project.image || "/placeholder.svg"} 
                  alt={project.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${project.gradient} shadow-lg`}>
                    <project.icon className="w-4 h-4 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-black/70 text-white border-none backdrop-blur-sm">
                    {project.type}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="text-xs border-slate-600 text-slate-300 hover:border-purple-500 hover:text-purple-300 transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 transition-all duration-200">
                    <Link href={project.github}>
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild className={`bg-gradient-to-r ${project.gradient} hover:opacity-90 text-white shadow-lg transition-all duration-200 transform hover:scale-105`}>
                    <Link href={project.demo}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
