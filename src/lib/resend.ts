import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

export const resend = apiKey ? new Resend(apiKey) : null

export const FROM_EMAIL = process.env.FROM_EMAIL ?? 'dimensitylabs.work@gmail.com'
export const TO_EMAIL = process.env.TO_EMAIL ?? 'dimensitylabs.work@gmail.com'
