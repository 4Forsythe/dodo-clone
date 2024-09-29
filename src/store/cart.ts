import { create } from 'zustand'

import { toast } from 'sonner'

import { api } from '@/services/api'
import { mapCartItems } from '@/lib/map-cart-items'

import type { ICreateCartItem } from '@/types'

export type CartItemState = {
  id: string
  name: string
  size: number
  type?: number
  weight: number
  imageUrl: string
  price: number
  quantity: number
  ingredients: Array<{ name: string; price: number }>
}

export interface ICartState {
  amount: number
  items: CartItemState[]
  isLoading: boolean
  isPending: boolean
  isError: boolean
  getCart: () => Promise<void>
  createCartItem: (dto: ICreateCartItem, onSuccess?: VoidFunction) => Promise<void>
  updateCartItem: (id: string, dto: { quantity: number }) => Promise<void>
  deleteCartItem: (id: string) => Promise<void>
}

export const useCartStore = create<ICartState>((set) => ({
  amount: 0,
  items: [],
  isLoading: true,
  isPending: false,
  isError: false,

  getCart: async () => {
    try {
      set({ isLoading: true, isError: false })

      const data = await api.carts.getAll()
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore: getCart()', error)
    } finally {
      set({ isLoading: false })
    }
  },

  createCartItem: async (dto: ICreateCartItem, onSuccess?: VoidFunction) => {
    try {
      set({ isPending: true, isError: false })

      const data = await api.carts.create(dto)
      const product = data.items.find((item) => item.variantId === dto.variantId)

      const { amount, items } = mapCartItems(data)

      set({ amount, items })
      toast.success(`${product?.variant.product.name} теперь в вашей корзине!`)

      onSuccess && onSuccess()
    } catch (error) {
      set({ isError: true })
      toast.error('Упс! Что-то пошло не так!')
      console.error('useCartStore: createCartItem()', error)
    } finally {
      set({ isPending: false })
    }
  },

  updateCartItem: async (id: string, dto: { quantity: number }) => {
    try {
      set({ isPending: true, isError: false })

      const data = await api.carts.update(id, dto)
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore: updateCartItem()', error)
    } finally {
      set({ isPending: false })
    }
  },

  deleteCartItem: async (id: string) => {
    try {
      set({ isPending: true, isError: false })

      const data = await api.carts.remove(id)
      const { amount, items } = mapCartItems(data)

      set({ amount, items })
    } catch (error) {
      set({ isError: true })
      console.error('useCartStore: deleteCartItem()', error)
    } finally {
      set({ isPending: false })
    }
  },
}))
