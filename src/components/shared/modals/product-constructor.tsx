'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ProductConstructorForm } from '@/components/shared'

import type { ProductType } from '@/types/product.types'

interface IProductConstructor {
  product: ProductType
  className?: string
}

export const ProductConstructor: React.FC<IProductConstructor> = ({ product, className }) => {
  const router = useRouter()

  return (
    <Dialog open={!!product} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn('w-[58rem] max-w-[58rem] h-[38rem] bg-white overflow-hidden', className)}
      >
        <ProductConstructorForm product={product} />
      </DialogContent>
    </Dialog>
  )
}
