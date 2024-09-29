import React from 'react'

import { cn, calcCartTotal, declineNoun } from '@/lib'

import { CheckoutBlock, TotalDetails } from '@/components/shared'

interface ICheckoutSidebar {
  count: number
  amount: number
  discount?: number
  isLoading?: boolean
  className?: string
}

export const CheckoutSidebar: React.FC<ICheckoutSidebar> = ({
  count,
  amount,
  discount,
  isLoading,
  className,
}) => {
  const { deliveryPrice, discountPrice, totalPrice } = calcCartTotal(amount, discount)

  return (
    <CheckoutBlock
      className={cn('px-8 py-5 top-8 sticky rounded-2xl', className)}
      isLoading={isLoading}
    >
      <div className="gap-1 flex flex-col">
        <span className="mb-4 pb-4 text-lg font-bold border-b border-neutral-200">
          Детали заказа
        </span>

        <div className="mb-4 pb-4 gap-2 flex flex-col border-b border-neutral-200">
          <TotalDetails
            name={`${count} ${declineNoun(count, 'товар', 'товаров', 'masculine')} в корзине`}
            value={`${amount} ₽`}
          />
          <TotalDetails name="Скидки по акциям" value={`${discountPrice} ₽`} />
          <TotalDetails name="Доставка" value={`${deliveryPrice} ₽`} />
          <TotalDetails
            name="Начислим додокоины"
            value={
              <>
                0
                <svg
                  width={14}
                  height={14}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M7.5.75c.41 0 .75.34.75.75V3h.25a5 5 0 0 1 0 10h-.25v1.5a.75.75 0 0 1-1.5 0V13H4.07c-.38 0-.56 0-.7-.07a.67.67 0 0 1-.3-.3C3 12.5 3 12.32 3 11.94V4.07c0-.38 0-.56.07-.7a.67.67 0 0 1 .3-.3C3.5 3 3.68 3 4.06 3h2.68V1.5c0-.41.34-.75.75-.75Zm-3 10.75h4a3.5 3.5 0 1 0 0-7h-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </>
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">Сумма заказа</span>
          <span className="text-lg font-bold">{totalPrice} ₽</span>
        </div>
      </div>
    </CheckoutBlock>
  )
}
