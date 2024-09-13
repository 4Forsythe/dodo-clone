'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'

interface IIngredientCard {
  name: string
  price: number
  imageUrl: string
  isSelected?: boolean
  className?: string
  onClick: () => void
}

export const IngredientCard: React.FC<IIngredientCard> = ({
  name,
  price,
  imageUrl,
  isSelected,
  className,
  onClick,
}) => {
  return (
    <button
      className={cn(
        'w-[6.5rem] p-2 flex flex-col items-center bg-white border border-transparent rounded-xl shadow-lg shadow-gray-300 relative hover:shadow-md transition duration-200',
        { 'border border-primary': isSelected },
        className
      )}
      onClick={onClick}
    >
      {isSelected && <CircleCheck className="top-1 right-1 text-primary absolute" />}
      <Image src={imageUrl} width={110} height={110} alt={name} priority />
      <h2 className="mb-1 text-xs flex-auto">{name}</h2>
      <span className="mb-1 text-sm font-bold">{price} ₽</span>
    </button>
  )
}
