import { create } from 'zustand'

import { api } from '@/services/api'

import type { StoriesType } from '@/types'

export interface IStoriesState {
  items: StoriesType[]
  isLoading: boolean
  isError: boolean
  getStories: () => Promise<void>
}

export const useStoriesStore = create<IStoriesState>((set) => ({
  items: [],
  isLoading: true,
  isError: false,

  getStories: async () => {
    try {
      set({ isLoading: true, isError: false })

      const items = await api.stories.getAll()

      set({ items })
    } catch (error) {
      set({ isError: true })
      console.error('useStoriesStore: getStories()', error)
    } finally {
      set({ isLoading: false })
    }
  },
}))
