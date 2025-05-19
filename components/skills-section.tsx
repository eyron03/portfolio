"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface Skill {
  name: string
  level: number
}

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !animated) {
      controls.start("visible")
      setAnimated(true)
    }
  }, [isInView, controls, animated])

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: index * 0.1,
              },
            },
          }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{skill.name}</h3>
            <span className="text-sm text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={controls}
              variants={{
                hidden: { width: 0 },
                visible: {
                  width: `${skill.level}%`,
                  transition: {
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.3 + index * 0.1,
                  },
                },
              }}
              className="h-full bg-primary rounded-full"
            ></motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
