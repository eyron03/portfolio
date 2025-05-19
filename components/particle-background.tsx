"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 100)

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1
        const x = Math.random() * (canvas.width - size * 2)
        const y = Math.random() * (canvas.height - size * 2)
        const speedX = Math.random() * 0.5 - 0.25
        const speedY = Math.random() * 0.5 - 0.25

        // Use a more visible color for particles
        const isDark = document.documentElement.classList.contains("dark")
        const color = isDark
          ? `rgba(170, 85, 255, ${Math.random() * 0.4 + 0.3})` // More visible in dark mode
          : `rgba(130, 58, 220, ${Math.random() * 0.3 + 0.2})`

        particlesRef.current.push({
          x,
          y,
          size,
          speedX,
          speedY,
          color,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.x
      mouseRef.current.y = e.y
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = undefined as any
      mouseRef.current.y = undefined as any
    }

    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width) {
          particle.x = 0
        } else if (particle.x < 0) {
          particle.x = canvas.width
        }

        if (particle.y > canvas.height) {
          particle.y = 0
        } else if (particle.y < 0) {
          particle.y = canvas.height
        }

        // Mouse interaction
        const dx = particle.x - mouseRef.current.x
        const dy = particle.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRef.current.radius && mouseRef.current.x !== undefined) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius

          particle.x += Math.cos(angle) * force * 2
          particle.y += Math.sin(angle) * force * 2
        }

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        connectParticles(particle)
      })
    }

    const connectParticles = (particle: Particle) => {
      const connectionDistance = 150

      particlesRef.current.forEach((otherParticle) => {
        if (particle === otherParticle) return

        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance
          // Use a more visible color for connections
          const isDark = document.documentElement.classList.contains("dark")
          ctx.strokeStyle = isDark
            ? `rgba(170, 85, 255, ${opacity * 0.3})` // More visible in dark mode
            : `rgba(130, 58, 220, ${opacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          ctx.stroke()
        }
      })
    }

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      initParticles()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      observer.disconnect()
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
}
