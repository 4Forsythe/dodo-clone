import { Container, Filters, ProductGroup, TopBar } from '@/components/shared'

import { getProducts } from '@/lib'

import type { IProductParams } from '@/types'

export default async function RootPage({ searchParams }: { searchParams: IProductParams }) {
  const categories = await getProducts(searchParams)

  return (
    <>
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      <Container className="pb-5">
        <div className="gap-14 grid grid-cols-[auto,1fr]">
          <div className="w-60">
            <Filters />
          </div>
          <div className="gap-10 flex flex-col">
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
