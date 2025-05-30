import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground">Professional journey in development and data analysis</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-xl">{exp.title}</CardTitle>
                  <Badge variant="outline">{exp.period}</Badge>
                </div>
                <p className="text-lg font-medium text-primary">{exp.company}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
