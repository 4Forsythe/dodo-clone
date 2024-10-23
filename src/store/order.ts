import { create } from 'zustand'

import { api } from '@/services/api'

import type { Order } from '@prisma/client'

export interface IOrderState {
  items: Order[]
  isLoading: boolean
  isError: boolean
  getOrders: () => Promise<void>
}

export const useOrderStore = create<IOrderState>((set) => ({
  items: [],
  isLoading: true,
  isError: false,

  getOrders: async () => {
    try {
      set({ isLoading: true, isError: false })

      const items = await api.orders.getAll({ limit: 10 })

      set({ items })
    } catch (error) {
      set({ isError: true })
      console.error('useOrderStore: getOrders()', error)
    } finally {
      set({ isLoading: false })
    }
  },
}))
