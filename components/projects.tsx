import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Projects() {
  const projects = [
    {
      title: "E-commerce Analytics Dashboard",
      description:
        "Full-stack web application with real-time analytics dashboard for e-commerce businesses. Features customer behavior tracking, sales forecasting, and inventory optimization.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React", "Node.js", "PostgreSQL", "Python", "Tableau"],
      type: "Full-Stack + Analytics",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Customer Churn Prediction Model",
      description:
        "Machine learning model to predict customer churn with 92% accuracy. Includes data preprocessing pipeline, feature engineering, and model deployment via REST API.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Python", "Scikit-learn", "FastAPI", "Docker", "AWS"],
      type: "Data Science",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Real-time Data Pipeline",
      description:
        "Scalable data pipeline processing 1M+ events daily. Includes real-time streaming, data transformation, and automated reporting for business intelligence.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Apache Kafka", "Python", "PostgreSQL", "Docker", "Airflow"],
      type: "Data Engineering",
      github: "https://github.com",
      demo: "https://demo.com",
    },
    {
      title: "Social Media Analytics Platform",
      description:
        "Web platform for social media sentiment analysis and trend tracking. Features natural language processing, data visualization, and automated reporting.",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Next.js", "Python", "MongoDB", "NLP", "Chart.js"],
      type: "Full-Stack + ML",
      github: "https://github.com",
      demo: "https://demo.com",
    },
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">A showcase of development and data science projects</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{project.type}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={project.github}>
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
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
