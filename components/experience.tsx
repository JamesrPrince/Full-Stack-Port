import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Award, TrendingUp } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      title: "Senior Full-Stack Developer & Data Analyst",
      company: "TechCorp Solutions",
      period: "2022 - Present",
      description:
        "Lead development of data-driven web applications serving 100K+ users. Built analytics dashboards, implemented ML models, and optimized database performance by 40%.",
      achievements: [
        "Developed customer analytics platform increasing retention by 25%",
        "Built real-time data pipeline processing 1M+ events daily",
        "Led team of 4 developers in agile environment",
      ],
      gradient: "from-purple-500 to-blue-500",
      bgGradient: "from-purple-500/10 to-blue-500/10",
      iconBg: "from-purple-600 to-blue-600",
    },
    {
      title: "Full-Stack Developer",
      company: "DataFlow Inc",
      period: "2020 - 2022",
      description:
        "Developed web applications with integrated analytics features. Collaborated with data science team to implement predictive models and visualization tools.",
      achievements: [
        "Created automated reporting system saving 20 hours/week",
        "Implemented A/B testing framework for product optimization",
        "Built RESTful APIs serving 50+ microservices",
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "from-blue-600 to-cyan-600",
    },
    {
      title: "Junior Data Analyst",
      company: "Analytics Pro",
      period: "2019 - 2020",
      description:
        "Analyzed large datasets to provide business insights. Created dashboards and reports for stakeholders across multiple departments.",
      achievements: [
        "Developed SQL queries reducing report generation time by 60%",
        "Created Tableau dashboards for executive decision making",
        "Automated data cleaning processes using Python",
      ],
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
      iconBg: "from-emerald-600 to-teal-600",
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30"></div>
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Professional journey in <span className="text-purple-400 font-semibold">development</span> and 
            <span className="text-blue-400 font-semibold"> data analysis</span>
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-emerald-500"></div>
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className={`absolute left-6 w-5 h-5 rounded-full bg-gradient-to-r ${exp.iconBg} border-4 border-slate-950 shadow-lg`}></div>
                
                <div className="ml-20">
                  <Card className={`group bg-gradient-to-br ${exp.bgGradient} border-slate-700 hover:border-slate-600 transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-sm relative overflow-hidden`}>
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <CardHeader className="relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <CardTitle className={`text-xl text-white group-hover:bg-gradient-to-r group-hover:${exp.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
                          {exp.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <Badge variant="outline" className={`border-slate-600 text-slate-300 bg-slate-800/50`}>
                            {exp.period}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded bg-gradient-to-r ${exp.iconBg} flex items-center justify-center`}>
                          <Briefcase className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-lg font-medium text-slate-200">{exp.company}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-slate-300 mb-4 leading-relaxed">{exp.description}</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-400">Key Achievements</span>
                        </div>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${exp.gradient} mt-2 flex-shrink-0`}></div>
                              <span className="text-sm text-slate-300 leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
