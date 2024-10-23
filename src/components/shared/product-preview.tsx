import React from 'react'
import Image, { type ImageProps } from 'next/image'

import { cn } from '@/lib'

interface IProductPreview extends ImageProps {
  size?: number
  className?: string
}

export const ProductPreview: React.FC<IProductPreview> = ({
  width,
  height,
  size,
  alt,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'w-[32rem] h-[32rem] flex flex-1 items-center justify-center relative',
        className
      )}
    >
      <Image
        className={cn('top-2 left-2 z-10 relative transition-all duration-300', {
          'w-[19rem] h-[19rem]': size === 25,
          'w-[23rem] h-[23rem]': size === 30,
          'w-[29rem] h-[29rem]': size === 35,
        })}
        width={width || 350}
        height={height || 350}
        alt={alt}
        priority
        {...rest}
      />

      {[25, 30, 35].includes(Number(size)) && (
        <div>
          <div className="w-[26.5rem] h-[26.5rem] top-1/2 left-1/2 border-2 border-dashed border-primary opacity-15 -translate-x-1/2 -translate-y-1/2 rounded-full absolute" />
          <div className="w-[21.5rem] h-[21.5rem] top-1/2 left-1/2 border-2 border-dashed border-primary opacity-20 -translate-x-1/2 -translate-y-1/2 rounded-full absolute" />
        </div>
      )}
    </div>
  )
}
