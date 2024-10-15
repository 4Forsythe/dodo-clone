import { create } from 'zustand'

import { ProductSortBy } from '@/types/product.types'

export interface IFiltersState {
  category: number
  sortBy: ProductSortBy
  setCategory: (id: number) => void
  setSortBy: (value: ProductSortBy) => void
}

export const useFiltersStore = create<IFiltersState>((set) => ({
  category: 1,
  sortBy: ProductSortBy.CREATED_AT,
  setCategory: (id: number) => set({ category: id }),
  setSortBy: (value: ProductSortBy) => set({ sortBy: value }),
}))
