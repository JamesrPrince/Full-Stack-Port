import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML/CSS", "JavaScript"],
    },
    {
      title: "Backend Development",
      skills: ["Node.js", "Python", "Express.js", "FastAPI", "REST APIs", "GraphQL", "Microservices"],
    },
    {
      title: "Data Analysis & ML",
      skills: ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "Jupyter", "R"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "BigQuery", "Snowflake"],
    },
    {
      title: "Data Visualization",
      skills: ["Tableau", "Power BI", "D3.js", "Plotly", "Matplotlib", "Seaborn", "Chart.js"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Terraform", "Git"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground">A comprehensive toolkit spanning development and data science</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
