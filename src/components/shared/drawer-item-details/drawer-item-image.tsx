import React from 'react'
import Image, { type ImageProps } from 'next/image'

import { cn } from '@/lib'

interface IDrawerItemImage extends ImageProps {
  className?: string
}

export const DrawerItemImage: React.FC<IDrawerItemImage> = ({ className, ...rest }) => {
  return (
    <div className={cn('max-w-[3.75rem] max-h-[3.75rem] rounded-lg', className)}>
      <Image {...rest} priority />
    </div>
  )
}
