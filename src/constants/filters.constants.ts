import { ProductSortBy } from '@/types/product.types'

type SortType = {
  name: string
  property: ProductSortBy
}

export const SORTS: SortType[] = [
  {
    name: 'популярности',
    property: ProductSortBy.RATING,
  },
  {
    name: 'названию',
    property: ProductSortBy.NAME,
  },
  {
    name: 'актуальности',
    property: ProductSortBy.CREATED_AT,
  },
]

export const DEFAULT_PRICE_FROM = 275
export const DEFAULT_PRICE_TO = 1250
