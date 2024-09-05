import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Plus } from 'lucide-react'

import { Button } from '@/components/ui'
import { Heading } from './heading'

interface IProductCard {
  id: string
  name: string
  price: number
  imageUrl?: string
  className?: string
}

export const ProductCard: React.FC<IProductCard> = ({ id, name, price, imageUrl, className }) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        {/* Картинка */}
        <div className="h-[260px] mb-3 p-6 flex items-center justify-center bg-neutral-50 rounded-xl overflow-hidden">
          <Image
            width={215}
            height={215}
            src={imageUrl || '/images/product-placeholder.svg'}
            alt={name}
          />
        </div>

        {/* Заголовок */}
        <Heading className="mb-1.5" text={name} size="sm" />

        {/* Состав (описание) */}
        <p className="mb-4 text-sm text-gray-400">Цыпленок, моцарелла</p>

        {/* Взаимодействие */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">от {price} ₽</span>

          <Button className="gap-1 flex items-center font-bold" variant="secondary">
            <Plus size={16} />
            Выбрать
          </Button>
        </div>
      </Link>
    </div>
  )
}
