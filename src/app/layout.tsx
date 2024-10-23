import type { Metadata } from 'next'

import { Providers } from './providers'
import { SITE_NAME, SITE_DESCRIPTION } from '@/constants'

import { Nunito } from 'next/font/google'

import './styles.css'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
}

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/icon.ico" />
      </head>
      <body className={`${nunito.variable} scrollbar`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
