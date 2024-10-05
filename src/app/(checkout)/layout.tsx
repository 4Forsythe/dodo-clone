import { Header, Footer } from '@/components/shared'

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="min-h-screen flex flex-col bg-[#F7F7F7]">
      <Header className="border-neutral-100" hasSearch={false} hasCart={false} />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </main>
  )
}
