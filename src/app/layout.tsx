import { Providers } from './providers'

import { Nunito } from 'next/font/google'

import './styles.css'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

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
