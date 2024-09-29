import React from 'react'

import { cn } from '@/lib'
import { Loader } from 'lucide-react'

import { Heading } from '@/components/shared'

interface ICheckoutBlock {
  title?: string
  extra?: React.ReactNode
  isLoading?: boolean
  className?: string
}

export const CheckoutBlock: React.FC<React.PropsWithChildren<ICheckoutBlock>> = ({
  title,
  extra,
  children,
  isLoading,
  className,
}) => {
  return (
    <div
      className={cn(
        'px-8 py-7 flex flex-col bg-white rounded-3xl shadow-lg shadow-neutral-200/60 overflow-hidden relative',
        className
      )}
    >
      {isLoading && (
        <div className="inset-0 z-10 flex items-center justify-center bg-white/70 absolute">
          <Loader className="opacity-80 animate-spin" size={24} />
        </div>
      )}

      {/* Заголовок */}
      {title && (
        <div className="mb-3 pb-3 flex items-center justify-between border-b border-neutral-200">
          <Heading text={title} className="my-0 font-bold" size="md" />
          {extra}
        </div>
      )}

      {/* Контент */}
      <div className="my-3 flex-1">{children}</div>
    </div>
  )
}
