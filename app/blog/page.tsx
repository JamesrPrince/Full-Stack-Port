import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight, BookOpen, Zap, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getBlogPosts, blogCategories, type BlogPost } from "@/lib/blog"

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  
  // Add gradient colors for styling
  const postsWithGradients = blogPosts.map((post, index) => {
    const gradients = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-cyan-500", 
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500"
    ]
    return {
      ...post,
      gradient: gradients[index % gradients.length]
    }
  })
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-blue-950/20 animate-gradient"></div>
      
      {/* Floating background elements */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl animate-float" style={{animationDelay: '6s'}}></div>

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 pt-32 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Technical Blog
              </h1>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Insights, tutorials, and thoughts on 
              <span className="text-purple-400 font-semibold"> full-stack development</span>, 
              <span className="text-blue-400 font-semibold"> data analysis</span>, and 
              <span className="text-emerald-400 font-semibold"> emerging technologies</span>
            </p>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
          <div className="container mx-auto max-w-6xl relative z-10">
            {/* Categories Filter */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Filter by Category</h2>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {blogCategories.map((category, index) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      index === 0 ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none' :
                      'bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:text-white hover:border-none'
                    }`}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Post */}
            {postsWithGradients.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 text-white text-center">Featured Post</h2>
                <Card className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-500 backdrop-blur-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto overflow-hidden">
                      <Image
                        src={postsWithGradients[0].image || "/placeholder.svg"}
                        alt={postsWithGradients[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${postsWithGradients[0].gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className={`bg-gradient-to-r ${postsWithGradients[0].gradient} text-white border-none`}>
                          {postsWithGradients[0].category}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-400">
                          <CalendarDays className="mr-1 h-4 w-4" />
                          {new Date(postsWithGradients[0].date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-slate-400">
                          <Clock className="mr-1 h-4 w-4" />
                          {postsWithGradients[0].readTime}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                        {postsWithGradients[0].title}
                      </h3>
                      <p className="text-slate-300 mb-6 leading-relaxed">{postsWithGradients[0].excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {postsWithGradients[0].tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-slate-800/80 border-slate-600 text-slate-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <Link href={`/blog/${postsWithGradients[0].id}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Recent Posts */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white text-center">Recent Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {postsWithGradients.slice(1).map((post, index) => {
                  const gradients = [
                    { gradient: "from-blue-500 to-cyan-500", bg: "from-blue-500/10 to-cyan-500/10" },
                    { gradient: "from-purple-500 to-pink-500", bg: "from-purple-500/10 to-pink-500/10" },
                    { gradient: "from-emerald-500 to-teal-500", bg: "from-emerald-500/10 to-teal-500/10" },
                    { gradient: "from-orange-500 to-red-500", bg: "from-orange-500/10 to-red-500/10" },
                    { gradient: "from-indigo-500 to-purple-500", bg: "from-indigo-500/10 to-purple-500/10" }
                  ];
                  const colorScheme = gradients[index % gradients.length];
                  
                  return (
                    <Card key={post.id} className="group overflow-hidden bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${colorScheme.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className={`bg-gradient-to-r ${colorScheme.gradient} text-white border-none`}>
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-sm text-slate-400">
                            <Clock className="mr-1 h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <CardTitle className="text-lg text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-slate-400">
                            <CalendarDays className="mr-1 h-3 w-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <Button variant="ghost" size="sm" asChild className={`text-slate-300 hover:bg-gradient-to-r hover:${colorScheme.gradient} hover:text-white transition-all duration-300`}>
                            <Link href={`/blog/${post.id}`}>
                              Read More
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}
