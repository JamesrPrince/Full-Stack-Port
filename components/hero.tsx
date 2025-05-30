import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            AC
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Alex Chen</h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">Full-Stack Developer & Data Analyst</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Passionate about building scalable web applications and extracting meaningful insights from data. I bridge
            the gap between development and analytics to create data-driven solutions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button asChild size="lg">
            <Link href="#contact">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-6 w-6" />
          </Link>
          <Link href="https://linkedin.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:alex@example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
