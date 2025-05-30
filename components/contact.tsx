import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Github, Linkedin, Send, MessageCircle, Zap } from "lucide-react"
import Link from "next/link"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Let's discuss how we can work together on your next 
            <span className="text-purple-400 font-semibold"> project</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-6 text-white">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white">jameslira36@yahoo.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 text-white">Connect With Me</h3>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/JamesrPrince"
                  className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Github className="h-6 w-6 text-slate-300 group-hover:text-white" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/prince--chisenga/"
                  className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin className="h-6 w-6 text-slate-300 group-hover:text-white" />
                </Link>
                <Link
                  href="mailto:jameslira36@yahoo.com"
                  className="group p-3 rounded-full bg-slate-800 hover:bg-gradient-to-br hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Mail className="h-6 w-6 text-slate-300 group-hover:text-white" />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 text-white">What I Can Help With</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-500"></div>
                  <span>Full-stack web application development</span>
                </li>
                <li className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                  <span>Data analysis and visualization</span>
                </li>
                <li className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                  <span>Machine learning model development</span>
                </li>
                <li className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-500"></div>
                  <span>Database design and optimization</span>
                </li>
                <li className="flex items-center space-x-3 text-slate-300">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                  <span>Technical consulting and architecture</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
                Send Me a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      placeholder="First Name" 
                      className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Last Name" 
                      className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Subject" 
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your message..." 
                    className="min-h-[120px] bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500 transition-colors resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
