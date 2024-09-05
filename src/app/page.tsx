import { Container, Filters, ProductGroup, TopBar } from '@/components/shared'

const items = [
  {
    id: '1',
    name: 'Пицца №1',
    price: 700,
  },
  {
    id: '2',
    name: 'Пицца №2',
    price: 750,
  },
  {
    id: '3',
    name: 'Пицца №3',
    price: 450,
  },
  {
    id: '4',
    name: 'Пицца №4',
    price: 500,
  },
  {
    id: '5',
    name: 'Пицца №5',
    price: 480,
  },
]

export default function Home() {
  return (
    <>
      <TopBar />
      <Container className="pb-5">
        <div className="gap-14 grid grid-cols-[auto,1fr]">
          <div className="w-60">
            <Filters />
          </div>
          <div className="gap-14 flex flex-col">
            <ProductGroup title="Завтрак" items={items} categoryId={0} />
            <ProductGroup title="Пиццы" items={items} categoryId={1} />
          </div>
        </div>
      </Container>
    </>
  )
}
