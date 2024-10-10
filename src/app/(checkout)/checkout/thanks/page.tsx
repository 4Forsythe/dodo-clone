import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { useDrawerItemDetails } from '@/hooks'
import { calcCartTotal, declineNoun, formatPhone, getOrder } from '@/lib'

import { CheckoutBlock, Container, Heading, OrderCartItem } from '@/components/shared'

export default async function ThanksPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const params = searchParams?.order

  const orderId = Number(params?.slice(37))
  const userId = String(params?.slice(0, 36))

  if (!orderId || !userId) return notFound()

  const order = await getOrder(orderId, userId)

  if (!order) return notFound()

  const { id, amount, items, customerName, customerEmail, customerPhone, address, createdAt } =
    order

  const { deliveryPrice } = calcCartTotal(amount)

  const date = createdAt.toLocaleDateString(undefined, {
    dateStyle: 'long',
  })

  const time = createdAt.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Container className="pb-5">
      <Heading text="Спасибо за заказ!" className="font-semibold" size="xl" />

      <div className="mt-5 mb-10 flex">
        <div className="my-2.5 space-y-10 p-4 flex-1">
          <div className="flex flex-col">
            <span className="font-medium text-gray-400 leading-6">Заказ №{id}</span>
            <span className="font-medium text-gray-400 leading-6">
              {date} в {time}
            </span>
          </div>

          <div className="space-y-10 flex flex-col">
            <div className="flex flex-col">
              <h5 className="mb-2 text-lg font-bold">{customerName}</h5>
              <span className="mb-1 font-semibold text-gray-400">{customerEmail}</span>
              <span className="text-sm font-semibold text-gray-400">
                {formatPhone(customerPhone)}
              </span>
            </div>

            <div className="flex flex-col">
              <h5 className="mb-2 text-lg font-bold">Доставка</h5>
              <span className="mb-1 font-semibold text-gray-400">{address}</span>
              <span className="text-sm font-semibold text-gray-400">с 14:00 по 15:00</span>
            </div>
          </div>
        </div>

        <CheckoutBlock className="w-[48rem] h-fit py-4">
          <div className="pb-4 gap-1 flex flex-col border-b border-neutral-200">
            <h3 className="text-xl font-bold">
              {`${items.length} ${declineNoun(
                items.length,
                'товар',
                'товаров',
                'masculine'
              )} на сумму
              ${amount} ₽`}
            </h3>
            <span className="font-medium text-gray-400">
              {deliveryPrice > 0
                ? `Стоимость доставки — ${deliveryPrice} ₽`
                : 'Бесплатная доставка'}
            </span>
          </div>
          <div className="max-h-[264px] my-4 pr-3 gap-3 grid grid-cols-2 items-center overflow-auto scrollbar">
            {items.map((item) => {
              const { details, doppings } = useDrawerItemDetails(
                item.variant.size,
                Number(item.variant.type),
                item.variant.weight,
                item.doppings
              )

              return (
                <OrderCartItem
                  className="p-4 bg-neutral-100 rounded-3xl"
                  id={item.id}
                  name={item.variant.product.name}
                  imageUrl={item.variant.product.imageUrl}
                  price={item.variant.price}
                  quantity={item.quantity}
                  details={details}
                  doppings={doppings}
                />
              )
            })}
          </div>
        </CheckoutBlock>
      </div>

      <div className="px-4 py-8 gap-24 flex">
        <div className="w-[15rem] gap-2.5 flex flex-col">
          <Link
            className="text-lg font-medium text-primary transition duration-200 hover:text-primary/80"
            href="/"
            target="_blank"
          >
            Написать в чат
          </Link>

          <Link
            className="text-lg font-medium text-primary transition duration-200 hover:text-primary/80"
            href="/"
            target="_blank"
          >
            Поддержать разработчика
          </Link>
        </div>
        <div className="space-x-10 flex flex-1">
          <div className="max-w-[25rem] space-y-1.5 flex flex-col">
            <p className="text-[15px] text-neutral-500">
              Круто, у тебя получилось оформить заказ! Это значит, что сайт работает именно так, как
              и было запланированно его автором!
            </p>
            <p className="text-[15px] text-neutral-500">
              Увы, твой заказ никогда не доставят, но ты все еще можешь продолжать играться с нашими
              функциями.
            </p>
          </div>
          <div className="max-w-[25rem] space-y-1.5 flex flex-col">
            <p className="text-[15px] text-neutral-500">
              Спасибо за участие в тестировании проекта! Будет супер, если ты найдешь какой-либо баг
              и сообщишь об этом в чат.
            </p>
            <p className="text-[15px] text-neutral-500">
              Если тебя вдохновил результат, можешь выразить благодарность в виде финансовой
              поддержки автору.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
