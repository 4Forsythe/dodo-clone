'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui'
import {
  Container,
  Heading,
  CheckoutCart,
  CheckoutForm,
  CheckoutSidebar,
} from '@/components/shared'

import { useCart } from '@/hooks'
import { checkoutSchema } from '@/schemas'
import { createOrder } from '@/app/actions'

import type { ICreateOrder } from '@/types'
import { useSession } from 'next-auth/react'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const methods = useForm<ICreateOrder>({
    mode: 'onSubmit',
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      address: '',
      comment: '',
    },
  })

  React.useEffect(() => {
    methods.reset({
      customerName: session?.user.name || '',
      customerEmail: session?.user.email,
      customerPhone: session?.user.phone || '',
    })
  }, [status])

  const onSubmit: SubmitHandler<ICreateOrder> = async (data) => {
    try {
      const url = await createOrder(data)

      if (url) {
        location.href = url
      }
    } catch (error) {
      setIsSubmitting(false)

      toast.error('Ой! Кажется, что-то пошло не так...')
      console.error('CheckoutPage: onSubmit()', error)
    }
  }

  const { amount, items, isLoading, isPending, updateCartItem, deleteCartItem } = useCart()

  const onUpdate = (id: string, dto: { quantity: number }, type: 'increment' | 'decrement') => {
    if (!isPending) {
      const quantity = type === 'increment' ? ++dto.quantity : --dto.quantity
      updateCartItem(id, { quantity })
    }
  }

  return (
    <Container className="pb-5">
      <Heading text="Оформить заказ" className="font-semibold" size="xl" />

      <FormProvider {...methods}>
        <form className="gap-20 flex" onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Основной блок */}
          <div className="mb-20 gap-10 flex flex-1 flex-col">
            <CheckoutCart
              items={items}
              isLoading={isLoading}
              isPending={isPending}
              onUpdate={onUpdate}
              onDelete={(id) => deleteCartItem(id)}
            />

            {/* Форма заказа */}
            <CheckoutForm isLoading={isLoading} />

            <div className="mt-3.5 px-10 flex items-center justify-between">
              <Button
                className="h-12 pl-12 text-base font-semibold text-gray-400 border border-gray-300 relative hover:border-gray-400"
                variant="ghost"
                size="lg"
                type="button"
                onClick={() => router.back()}
              >
                <ChevronLeft className="left-2 absolute" size={24} />
                Назад в корзину
              </Button>
              <Button
                className="min-w-[300px] h-12 pr-12 text-base font-semibold relative"
                size="lg"
                type="submit"
                isLoading={isLoading || isPending || isSubmitting}
              >
                <ChevronRight className="right-2 absolute" size={24} />
                Оформить заказ на {amount} ₽
              </Button>
            </div>
          </div>

          {/* Сайдбар */}
          <div className="w-[29rem]">
            <CheckoutSidebar
              count={items.length}
              amount={amount}
              isLoading={isLoading || isPending}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
