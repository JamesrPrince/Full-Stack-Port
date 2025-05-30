"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { 
  SkillsSkeleton, 
  ProjectsSkeleton, 
  ContactSkeleton, 
  BlogSkeleton 
} from "./loading-components"

// Dynamic imports for client-side code splitting
const Skills = dynamic(() => import("@/components/skills").then(mod => ({ default: mod.Skills })), {
  loading: () => <SkillsSkeleton />,
  ssr: false
})

const Projects = dynamic(() => import("@/components/projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <ProjectsSkeleton />,
  ssr: false
})

const Experience = dynamic(() => import("@/components/experience").then(mod => ({ default: mod.Experience })), {
  ssr: false
})

const BlogPreview = dynamic(() => import("@/components/blog-preview").then(mod => ({ default: mod.BlogPreview })), {
  loading: () => <BlogSkeleton />,
  ssr: false
})

const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <ContactSkeleton />,
  ssr: false
})

export function DynamicSections() {
  return (
    <>
      <Suspense fallback={<SkillsSkeleton />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="py-20" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<BlogSkeleton />}>
        <BlogPreview />
      </Suspense>
      <Suspense fallback={<ContactSkeleton />}>
        <Contact />
      </Suspense>
    </>
  )
}