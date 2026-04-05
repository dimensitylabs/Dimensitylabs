import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/types/contact'

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)

    const body = await request.json()

    // Validate input
    const result = contactFormSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.format() },
        { status: 400 }
      )
    }

    const { name, email, company, service, budget, message } = result.data

    // Send email via Resend
    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || 'hello@dimensitylabs.dev',
      subject: `New Contact Form Submission: ${service}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${service}
Budget: ${budget || 'N/A'}

Message:
${message}
      `.trim(),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
