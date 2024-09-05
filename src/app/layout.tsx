import { Nunito } from 'next/font/google'

import { Header } from '@/components/shared'

import './styles.css'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={nunito.variable}>
        <main className="min-h-screen bg-white">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
