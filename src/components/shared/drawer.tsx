'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn, declineNoun } from '@/lib'
import { ChevronRight } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button, Skeleton } from '@/components/ui'
import { Heading, DrawerItem } from '@/components/shared'

import { route } from '@/config/routes.config'

import { MIN_DELIVERY_PRICE } from '@/constants'
import { useCart, useDrawerItemDetails } from '@/hooks'

interface IDrawer {
  className?: string
}

export const Drawer: React.FC<React.PropsWithChildren<IDrawer>> = ({ children, className }) => {
  const [isRedirecting, setIsRedirecting] = React.useState(false)

  const { amount, items, isLoading, isPending, updateCartItem, deleteCartItem } = useCart()

  const onUpdate = (id: string, dto: { quantity: number }, type: 'increment' | 'decrement') => {
    if (!isPending) {
      const quantity = type === 'increment' ? ++dto.quantity : --dto.quantity
      updateCartItem(id, { quantity })
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn('flex flex-col items-center justify-between bg-neutral-100', className)}
      >
        {/* Хедер */}
        {items.length > 0 && (
          <SheetHeader className="w-full px-4 pb-4 bg-white">
            <Heading
              text={`${items.length} ${declineNoun(
                items.length,
                'товар',
                'товаров',
                'masculine'
              )} на ${amount} ₽`}
              className="mb-1 font-semibold"
              size="md"
            />
            <p className="text-sm text-gray-500">
              {MIN_DELIVERY_PRICE > amount
                ? `До минимальной суммы на доставку - ${MIN_DELIVERY_PRICE - amount} ₽`
                : 'Бесплатная доставка'}
            </p>
          </SheetHeader>
        )}

        {/* Корзина */}
        {items.length > 0 ? (
          <div className="w-full inline-flex flex-1 flex-col overflow-y-auto *:mb-2">
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-[130px] m-4 bg-neutral-200 rounded-2xl" />
                ))
              : items.map((item) => {
                  const { details, doppings } = useDrawerItemDetails(
                    item.size,
                    item.type,
                    item.weight,
                    item.ingredients
                  )

                  return (
                    <DrawerItem
                      key={item.id}
                      {...item}
                      details={details}
                      doppings={doppings}
                      isLoading={isPending}
                      onUpdate={(type) => onUpdate(item.id, { quantity: item.quantity }, type)}
                      onDelete={() => deleteCartItem(item.id)}
                    />
                  )
                })}
          </div>
        ) : (
          <div className="w-full gap-6 flex flex-1 flex-col items-center justify-center bg-white">
            <div className="flex flex-col items-center">
              <Image
                src="/images/empty-drawer.svg"
                width={120}
                height={120}
                alt="Пустая корзина"
                priority
              />
              <Heading className="my-2.5" text="Пока что пусто" />
              <p className="text-center text-sm text-gray-700 font-medium">
                Добавьте пиццу. Или две!
                <br />
                Мы доставим ваш заказ от {MIN_DELIVERY_PRICE}₽
              </p>
            </div>

            <SheetClose>
              <Button className="w-full rounded-2xl" size="lg">
                Всё понятно
              </Button>
            </SheetClose>
          </div>
        )}

        {/* Футер */}
        {items.length > 0 && (
          <SheetFooter className="w-full p-8 bg-white border-t border-neutral-200">
            <div className="gap-4 flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <span className="font-bold">Сумма заказа</span>
                <span className="font-bold">{amount} ₽</span>
              </div>

              <Link href={route.CHECKOUT}>
                <Button
                  className="w-full h-12 pr-12 text-base font-semibold flex items-center relative"
                  size="lg"
                  isLoading={isRedirecting}
                  onClick={() => setIsRedirecting(true)}
                >
                  К оформлению заказа <ChevronRight className="right-5 absolute" size={20} />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
