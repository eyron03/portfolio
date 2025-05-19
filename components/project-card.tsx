/* eslint-disable @next/next/no-img-element */
"use client"

import { motion } from "framer-motion"
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
      className="h-full"
    >
      <div className="relative h-full group">
        {/* The card itself */}
        <Card className="overflow-visible h-full flex flex-col relative z-10">
          <div className="relative w-full overflow-visible">
            {/* Image container with overflow visible to allow image to pop out */}
            <div className="w-full h-48 md:h-56 lg:h-64 bg-muted overflow-visible relative">
              {/* Empty space that maintains the layout when image pops out */}
              <div className="w-full h-full"></div>
            </div>
          </div>
          <CardContent className="flex flex-col flex-grow p-5 relative z-10">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
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

        {/* The image that pops out on hover */}
        <div className="absolute top-0 left-0 right-0 w-full h-48 md:h-56 lg:h-64 overflow-visible z-20">
          <motion.div
            className="w-full h-full relative"
            whileHover={{
              scale: 1.15,
              y: -10,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full  rounded-t-lg shadow-xl"
            />
            
            {/* Shadow effect that enhances the 3D pop-out appearance */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3)] rounded-t-lg"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
