import { Card, CardContent } from "@/components/ui/card"
import { Code, BarChart3, Database, Brain } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Building modern web applications with React, Node.js, and cloud technologies",
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Extracting insights from complex datasets using Python, SQL, and visualization tools",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Designing and implementing robust data pipelines and database architectures",
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Developing predictive models and implementing AI solutions for business problems",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            With 5+ years of experience in software development and data analysis, I specialize in creating end-to-end
            solutions that combine robust engineering with data-driven insights. My unique background allows me to build
            applications that not only function well but also provide valuable analytics and intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="pt-6">
                <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
