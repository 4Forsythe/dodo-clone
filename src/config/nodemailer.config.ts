import nodemailer from 'nodemailer'

const SMTP_EMAIL = process.env.SMTP_EMAIL || ''
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || ''

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
})
