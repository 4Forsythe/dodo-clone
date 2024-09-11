import { create } from 'zustand'

interface ICategoryState {
  categoryId: number
  setCategoryId: (value: number) => void
}

export const useCategoryStore = create<ICategoryState>((set) => ({
  categoryId: 1,
  setCategoryId: (categoryId: number) => set({ categoryId }),
}))
