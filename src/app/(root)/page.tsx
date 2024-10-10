import { getProducts } from '@/lib'

import { Container, Filters, ProductGroup, TopBar, Stories } from '@/components/shared'

import type { IProductParams } from '@/types'

export default async function RootPage({ searchParams }: { searchParams: IProductParams }) {
  const categories = await getProducts(searchParams)

  const hasProducts = categories.some((category) => category.products.length > 0)

  return (
    <>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Container className="pt-10 pb-20">
        <Stories />
        <div className="gap-20 grid flex-1 grid-cols-[auto,1fr]">
          <div className="w-60">
            <Filters />
          </div>
          <div className="gap-10 flex flex-col">
            {!hasProducts && (
              <span className="py-20 text-center text-gray-400">
                Похоже, у нас не нашлось товаров по заданным фильтрам
              </span>
            )}
            {categories.map(
              (category) =>
                category.products.length > 0 && (
                  <ProductGroup
                    key={category.id}
                    title={category.name}
                    items={category.products}
                    categoryId={category.id}
                  />
                )
            )}
          </div>
        </div>
      </Container>
    </>
  )
}
