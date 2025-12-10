import { NextResponse } from "next/server"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(150),
  message: z.string().min(10).max(5000),
})

const RESEND_API_URL = "https://api.resend.com/emails"

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null)
    if (!json) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    const parsed = bodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, subject, message } = parsed.data

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.CONTACT_FROM_EMAIL
    const toEmail = process.env.CONTACT_TO_EMAIL

    if (!apiKey || !fromEmail || !toEmail) {
      return NextResponse.json(
        {
          error: "Email service not configured",
          hint: "Set RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL env vars.",
        },
        { status: 500 },
      )
    }

    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    })

    if (!response.ok) {
      const body = await response.json().catch(() => null)
      const error = body?.error || body?.message || "Failed to send email"
      return NextResponse.json({ error }, { status: 502 })
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("Contact API error", error)
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}
