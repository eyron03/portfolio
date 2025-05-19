/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillsSection from "@/components/skills-section"
import ContactForm from "@/components/contact-form"
import ParticleBackground from "@/components/particle-background"
import CursorEffect from "@/components/cursor-effect"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const handleScroll = () => {
    const sections = ["home", "about", "projects", "skills", "contact"]
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
        }
      }
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const projects = [
    {
      title: "StoryHub",
      description: "The goal of StoryHub is to create an engaging, interactive, and child-friendly storytelling platform that makes reading both fun and educational. Designed specifically for kids, StoryHub allows young readers to explore captivating stories while also testing their comprehension through interactive quizzes.",
      tags: ["Laravel", "Tailwind CSS", "Javascript", "Turn.js", "MySQL"],
      image: "/img/storyhub.jpg?height=600&width=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Hospital Appointment System",
      description: "As a web development student, I designed and built a Hospital Appointment System using PHP and MySQL as part of my academic project work. This project helped me understand the full web development process. from backend logic to user interface, and even deployment.",
      tags: ["PHP", "Javascript", "CSS", "MySQL"],
      image: "/img/appointment-system.jpg?height=600&width=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
    {
      title: "Accounting System",
      description: "Web-based accounting application designed to simplify and streamline financial management for businesses of all sizes. The system offers a comprehensive suite of tools for tracking income and expenses, generating financial reports, managing invoices, reconciling transactions, and ensuring accurate bookkeeping. ",
      tags: ["Laravel", "Livewire", "MySQL", "Chart.js"],
      image: "/img/truesight2.jpg?height=600&width=800",
      github: "https://github.com",
      demo: "https://example.com",
    },
  ]

  const skills = [
    { name: "PHP", level: 95 },
    { name: "Laravel", level: 95 },
    { name: "HTML/CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "MySQL", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Vue.js", level: 85 },
    { name: "TypeScript", level: 85 },
    { name: "Flutter", level: 70 },
    { name: "MongoDB", level: 70 },
    { name: "WordPress", level: 60 },
  ]

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background to-background/80">
      <CursorEffect />
      <ParticleBackground />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            <span className="text-primary">Portfolio</span>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            {["home", "about", "projects", "skills", "contact"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium capitalize transition-colors ${
                    activeSection === section ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </motion.ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex md:hidden">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block">Hi, I'm </span>
            <span className="block mt-2 text-primary">Aaron Christian Arenas</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">Full Stack Developer</p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => scrollToSection("contact")} variant="default">
                Contact Me
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="secondary" onClick={() => scrollToSection("projects")}>
                View Projects
              </Button>
            </motion.div>
          </div>
          <div className="flex items-center justify-center mt-12 space-x-6">
            <motion.a
              href="https://github.com/eyron03"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/eyronarenas/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              href="mailto:aaronchristianarenas50@gmail.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-10"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary animate-bounce"
          >
            <ArrowDown className="w-6 h-6" />
            <span className="sr-only">Scroll Down</span>
          </button>
        </motion.div>
      </section>

      <section id="about" className="py-20 px-4" ref={ref}>
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">About Me</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
              }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-2xl border-4 border-primary/20">
                <img src="/img/profile.jfif?height=600&width=600" alt="Profile" className="object-cover w-full h-full" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                <p className="font-bold">2+ Years Experience</p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } },
              }}
            >
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-muted-foreground mb-6">
                Hi! I'm Aaron, a full stack web developer with a passion for making the digital world
                a better place, one code commit at a time. With advanced proficiency in PHP and JavaScript,
                I'm an expert at crafting cutting-edge, high-performance, and scalable web solutions for individuals
                and organizations. As a developer, I possess an intimate knowledge of both front-end and back-end
                development, enabling me to tackle projects from a holistic perspective and provide smooth user experiences.
                Whether you require a basic website or a sophisticated web-based system, I possess the skills and expertise to make your vision a reality.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-medium">Name:</p>
                  <p className="text-muted-foreground">Aaron Christian Arenas</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-muted-foreground">aaronchristianarenas50@gmail.com</p>
                </div>
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-muted-foreground">Pangasinan, Philippines</p>
                </div>
                <div>
                  <p className="font-medium">Availability:</p>
                  <p className="text-muted-foreground">Freelance / Full-time</p>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button variant="default" asChild>
                  <a href="/CV_Aaron Christian Arenas_Web Developer.pdf" download="CV_Aaron Christian Arenas_Web Developer.pdf">
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">My Projects</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects. Each project represents a unique challenge and solution that I've
              worked on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button variant="outline" asChild>
              <Link
                href="https://github.com/eyron03"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Github className="mr-2 h-4 w-4" />
                View More on GitHub
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">My Skills</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              I've worked with a variety of technologies and tools throughout my career. Here's an overview of my
              technical skills and proficiency levels.
            </p>
          </motion.div>

          <SkillsSection skills={skills} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <h3 className="text-xl font-bold mb-4">Frontend Development</h3>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>React.js</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Next.js</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Vue.js</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Redux</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Framer Motion</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>SASS/SCSS</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <h3 className="text-xl font-bold mb-4">Backend Development</h3>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Node.js</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Express.js</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>MongoDB</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>PostgreSQL</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>Firebase</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>GraphQL</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>REST APIs</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span>AWS</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Get In Touch</h2>
            <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out to me using the
              form below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out to me through any of these channels. I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">aaronchristianarenas50@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">LinkedIn</h4>
                    <p className="text-muted-foreground">linkedin.com/in/eyronarenas</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">GitHub</h4>
                    <p className="text-muted-foreground">github.com/eyron03</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/eyron03"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-card p-3 rounded-full border hover:border-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/eyronarenas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-card p-3 rounded-full border hover:border-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="mailto:aaronchristianarenas50@gmail.com"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-card p-3 rounded-full border hover:border-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="sr-only">Email</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Aaron Christian Arenas. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
