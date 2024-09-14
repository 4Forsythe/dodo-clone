'use client'

import React from 'react'
import Link from 'next/link'

import { cn } from '@/lib'
import { ChevronRight } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui'
import { Heading, DrawerItem } from '@/components/shared'

import { route } from '@/config/routes.config'

import { useDrawerItemDetails } from '@/hooks'

interface IDrawer {
  className?: string
}

export const Drawer: React.FC<React.PropsWithChildren<IDrawer>> = ({ children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn('flex flex-col items-center justify-between bg-neutral-100', className)}
      >
        {/* Хедер */}
        <SheetHeader className="w-full px-4 pb-4">
          <Heading text="2 товара на 175 ₽" className="mb-1 font-semibold" size="md" />
          <p className="text-sm text-gray-500">До минимальной суммы на доставку - 420 ₽</p>
        </SheetHeader>

        {/* Корзина */}
        <div className="w-full inline-flex flex-1 flex-col *:mb-2 overflow-auto">
          {[...Array(10)].map((item) => {
            const { details } = useDrawerItemDetails(30, 2, 300, [])

            return (
              <DrawerItem
                key={item.id}
                id={item.id}
                imageUrl="/images/product-placeholder.svg"
                name="Пепперони"
                price={250}
                quantity={3}
                details={details}
              />
            )
          })}
        </div>

        {/* Футер */}
        <SheetFooter className="w-full p-8 bg-white border-t border-neutral-200">
          <div className="gap-4 flex flex-1 flex-col">
            <div className="flex items-center justify-between">
              <span className="font-bold">Сумма заказа</span>
              <span className="font-bold">179 ₽</span>
            </div>

            <Link href={route.CART}>
              <Button
                className="w-full h-12 pr-12 text-base font-semibold flex items-center relative"
                size="lg"
              >
                К оформлению заказа <ChevronRight className="right-5 absolute" size={20} />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
