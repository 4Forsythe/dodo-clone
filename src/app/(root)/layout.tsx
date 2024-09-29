import { Header, Footer } from '@/components/shared'

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      {modal}
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  )
}
