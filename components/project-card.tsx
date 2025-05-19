"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  demo: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group h-full flex flex-col">
        <div className="relative overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="aspect-video">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
          </motion.div>
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="secondary" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="default" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow p-5">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}