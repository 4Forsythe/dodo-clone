'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { cn, getDeliveryTime } from '@/lib'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronLeft, ChevronRight, Mails, TriangleAlert } from 'lucide-react'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui'
import {
  Container,
  Heading,
  TipBlock,
  CheckoutCart,
  CheckoutForm,
  CheckoutSidebar,
} from '@/components/shared'

import { useCart } from '@/hooks'
import { checkoutSchema } from '@/schemas'
import { createOrder, sendCode } from '@/app/actions'

import type { User } from '@prisma/client'
import type { ICreateOrder } from '@/types'

interface ICheckout {
  profile: User
  className?: string
}

export const Checkout: React.FC<ICheckout> = ({ profile, className }) => {
  const router = useRouter()

  const { name, email, phone, activatedAt } = profile

  const [isSending, setIsSending] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const variants = getDeliveryTime()

  const methods = useForm<ICreateOrder>({
    mode: 'onSubmit',
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: name || '',
      customerEmail: email,
      customerPhone: phone || '',
      address: '',
      deliveredAt: variants[0],
      isContactless: false,
      comment: '',
    },
  })

  const onSendMail = async () => {
    try {
      setIsSubmitting(true)

      await sendCode(profile.email)

      setIsSending(true)
      toast.success(`Письмо отправлено на ${profile.email}`)
    } catch (error) {
      toast.error('Сейчас мы не можем отправить письмо...')
      console.error('Profile: onSendMail()', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit: SubmitHandler<ICreateOrder> = async (data) => {
    try {
      setIsSubmitting(true)

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
    <Container className={cn('pb-5', className)}>
      <Heading text="Оформить заказ" className="font-semibold" size="xl" />

      <FormProvider {...methods}>
        <form className="gap-20 flex" onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Основной блок */}
          <div className="min-w-[40rem] mb-20 gap-10 flex flex-1 flex-col">
            {!activatedAt && !isSending && (
              <TipBlock
                className="max-w-[40rem]"
                icon={TriangleAlert}
                title="Учетная запись не подтверждена"
                description="Вы не можете оформлять заказы пока не подтвердите свой адрес электронной почты."
                extra={
                  <Button
                    className="w-fit rounded-xl"
                    size="sm"
                    type="button"
                    isLoading={isSubmitting}
                    onClick={onSendMail}
                  >
                    Подтвердить email
                  </Button>
                }
              />
            )}

            {!activatedAt && isSending && (
              <TipBlock
                className="max-w-[40rem]"
                icon={Mails}
                title="Письмо для подтверждения отправлено"
                description="Мы отправили новое письмо для подтверждения на ваш адрес электронной почты. Пожалуйста, перейдите по ссылке из него для верификации учетной записи."
              />
            )}

            <CheckoutCart
              items={items}
              isLoading={isLoading}
              isPending={isPending}
              onUpdate={onUpdate}
              onDelete={(id) => deleteCartItem(id)}
            />

            {/* Форма заказа */}
            <CheckoutForm isLoading={isLoading} />

            <div className="mt-3.5 flex items-center justify-around">
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
                disabled={!activatedAt || !(items.length > 0)}
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
