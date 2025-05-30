import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, BarChart3, Cloud, Palette, Cog } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML/CSS", "JavaScript"],
      icon: Code,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      iconBg: "from-purple-600 to-pink-600",
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Python", "Express.js", "FastAPI", "REST APIs", "GraphQL", "Microservices"],
      icon: Cog,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "from-blue-600 to-cyan-600",
    },
    {
      title: "Data Analysis & ML",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Jupyter", "R"],
      icon: BarChart3,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      iconBg: "from-emerald-600 to-teal-600",
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "BigQuery", "Snowflake"],
      icon: Database,
      gradient: "from-orange-500 to-red-500",
      bgGradient: "from-orange-500/10 to-red-500/10",
      iconBg: "from-orange-600 to-red-600",
    },
    {
      title: "Data Visualization",
      skills: ["Tableau", "Power BI", "D3.js", "Plotly", "Matplotlib", "Seaborn", "Chart.js"],
      icon: Palette,
      gradient: "from-violet-500 to-purple-500",
      bgGradient: "from-violet-500/10 to-purple-500/10",
      iconBg: "from-violet-600 to-purple-600",
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform", "Git"],
      icon: Cloud,
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-500/10 to-blue-500/10",
      iconBg: "from-indigo-600 to-blue-600",
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30"></div>
      <div className="absolute top-20 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A comprehensive toolkit spanning <span className="text-purple-400 font-semibold">development</span> and 
            <span className="text-blue-400 font-semibold"> data science</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className={`group bg-gradient-to-br ${category.bgGradient} border-slate-700 hover:border-slate-600 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm relative overflow-hidden`}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.iconBg} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className={`text-lg text-white group-hover:bg-gradient-to-r group-hover:${category.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Floating skill badges */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-6">Technologies I work with daily</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {["React", "Python", "PostgreSQL", "AWS", "TypeScript", "Docker", "Next.js", "Tableau"].map((tech, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${
                  index % 4 === 0 ? 'from-purple-600 to-blue-600' :
                  index % 4 === 1 ? 'from-blue-600 to-cyan-600' :
                  index % 4 === 2 ? 'from-emerald-600 to-teal-600' :
                  'from-pink-600 to-orange-600'
                } text-white text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default`}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
