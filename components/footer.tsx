import Link from "next/link"
import { Github, Linkedin, Mail, Heart, Code2 } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Prince Chisenga
              </span>
            </div>
            <p className="text-slate-300 max-w-md mb-6 leading-relaxed">
              Full-Stack Developer & Data Analyst passionate about building scalable applications 
              and extracting meaningful insights from data.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/JamesrPrince"
                className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/prince--chisenga/"
                className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
              <Link
                href="mailto:jameslira36@yahoo.com"
                className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "#about", label: "About" },
                { href: "#skills", label: "Skills" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#contact", label: "Contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Web Development",
                "Data Analysis",
                "Machine Learning",
                "API Development",
                "Consulting",
              ].map((service, index) => (
                <li key={index} className="text-slate-400 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-sm text-slate-400 mb-4 md:mb-0">
              <span>© {currentYear} Prince Chisenga. Made with</span>
              <Heart className="h-4 w-4 text-red-400 mx-1" />
              <span>and Next.js</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}