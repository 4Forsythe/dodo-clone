import { Header } from '@/components/shared'

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen">
      <Header />
      {modal}
      {children}
    </main>
  )
}
