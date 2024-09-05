import { Container, Filters, TopBar } from '@/components/shared'

export default function Home() {
  return (
    <>
      <TopBar />
      <Container className="pb-5">
        <div className="gap-14 grid grid-cols-[auto,1fr]">
          <div className="w-60">
            <Filters />
          </div>
          <div className="gap-14 flex flex-col">Список товаров</div>
        </div>
      </Container>
    </>
  )
}
