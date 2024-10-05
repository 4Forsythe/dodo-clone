import { prisma } from '@/prisma/prisma-client'

export const getOrder = async (id: number, userId: string) => {
  const order = await prisma.order.findFirst({
    where: { id, userId },
    include: {
      items: { include: { variant: { include: { product: true } }, doppings: true } },
    },
  })

  if (!order) return null

  return order
}
