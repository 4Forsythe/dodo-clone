'use server'

import * as fs from 'fs'
import * as handlebars from 'handlebars'

import { transporter } from '@/config/nodemailer.config'

const SENDER_EMAIL = String(process.env.SMTP_EMAIL)

interface IReplacements {
  amount?: string
  orderId?: string
  code?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  returnUrl?: string
}

interface ISendMailOptions {
  to: string
  subject: string
  text?: string
  html?: {
    path: string
    replacements: IReplacements
  }
}

export const sendMail = async (options: ISendMailOptions) => {
  try {
    let html = undefined

    if (options.html) {
      const source = fs.readFileSync(options.html.path, 'utf-8').toString()

      if (source) {
        const template = handlebars.compile(source)

        const { amount, orderId, code, customerName, customerEmail, customerPhone, returnUrl } =
          options.html.replacements

        const replacements: IReplacements = {
          amount,
          orderId,
          code,
          customerName,
          customerEmail,
          customerPhone,
          returnUrl,
        }

        html = template(replacements)
      }
    }

    return transporter.sendMail({
      from: `DodoClone <${SENDER_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: html,
    })
  } catch (error) {
    console.error('nodemailer: sendMail()', error)
  }
}
