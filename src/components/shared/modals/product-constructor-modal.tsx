'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { ProductModalForm } from '@/components/shared'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import type { ProductType } from '@/types/product.types'

interface IProductConstructorModal {
  product: ProductType
  isLoading?: boolean
  className?: string
  onSubmit: (variant: number, ingredients: number[]) => void
  onClose: () => void
}

export const ProductConstructorModal: React.FC<IProductConstructorModal> = ({
  product,
  isLoading,
  className,
  onSubmit,
  onClose,
}) => {
  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent
        className={cn('w-[58rem] max-w-[58rem] h-[38rem] bg-white overflow-hidden', className)}
      >
        <ProductModalForm product={product} isLoading={isLoading} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
