import emailjs from "@emailjs/browser"

export interface EmailData {
  name: string
  email: string
  title: string
  message: string
}

export async function sendEmail(data: EmailData) {
  try {
    // Validate input
    if (!data.name || !data.email || !data.title || !data.message) {
      return { success: false, error: "All fields are required" }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return { success: false, error: "Please enter a valid email address" }
    }

    // Send via EmailJS
    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,  // e.g. "service_xxx"
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // e.g. "template_yyy"
      {
        name: data.name,
        email: data.email,
        title: data.title,
        message: data.message,
        time: new Date().toLocaleString(),
      },
      process.env.NEXT_PUBLIC_EMAILJS_USER_ID! // public key
    )

    if (response.status === 200) {
      return { success: true }
    } else {
      return { success: false, error: "Failed to send email." }
    }
  } catch (err) {
    console.error("EmailJS error:", err)
    return { success: false, error: "Unexpected error occurred." }
  }
}
