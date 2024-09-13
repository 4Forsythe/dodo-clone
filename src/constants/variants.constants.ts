export const PIZZA_SIZES_MAP = {
  25: 'Маленькая',
  30: 'Средняя',
  35: 'Большая',
} as const

export const PIZZA_TYPES_MAP = {
  1: 'Традиционное',
  2: 'Тонкое',
} as const

export type PizzaSizes = keyof typeof PIZZA_SIZES_MAP
export type PizzaTypes = keyof typeof PIZZA_TYPES_MAP

export const PIZZA_SIZES = Object.entries(PIZZA_SIZES_MAP).map(([value, text]) => ({
  text,
  value,
}))

export const PIZZA_TYPES = Object.entries(PIZZA_TYPES_MAP).map(([value, text]) => ({
  text,
  value,
}))
