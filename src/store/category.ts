import { create } from 'zustand'

interface ICategoryState {
  category: number
  setCategory: (category: number) => void
}

export const useCategoryStore = create<ICategoryState>((set) => ({
  category: 0,
  setCategory: (category: number) => set({ category }),
}))
