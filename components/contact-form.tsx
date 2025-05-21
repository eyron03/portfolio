"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSubmitting(true)

    try {
      const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)

      if (result.text === "OK") {
        toast.success("Message sent!", {
          description: "Thank you for your message. I'll get back to you soon.",
        })
        formRef.current.reset()
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      toast.error("Failed to send message", {
        description: "Please try again or contact me directly via email.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField id="name" label="Name" type="text" placeholder="Your name" />
        <FormField id="email" label="Email" type="email" placeholder="Your email" />
      </div>
      <FormField id="title" label="Subject" type="text" placeholder="Subject" />
      <FormTextarea id="message" label="Message" placeholder="Your message" rows={5} />

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </motion.div>
    </form>
  )
}

// Reusable Input Field
function FormField({
  id,
  label,
  type,
  placeholder,
}: {
  id: string
  label: string
  type: string
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} required />
    </div>
  )
}

// Reusable Textarea Field
function FormTextarea({
  id,
  label,
  placeholder,
  rows,
}: {
  id: string
  label: string
  placeholder: string
  rows: number
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={id} placeholder={placeholder} rows={rows} required className="resize-none" />
    </div>
  )
}
