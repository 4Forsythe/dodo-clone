import { Container, ExceptionBlock, Header, Footer } from '@/components/shared'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Container className="flex flex-1 items-center justify-center">
        <ExceptionBlock
          title="Страница не найдена"
          text="Вы попали на страницу, на которую не должны были попасть"
          imageUrl="/images/404.svg"
        />
      </Container>
      <Footer />
    </main>
  )
}
