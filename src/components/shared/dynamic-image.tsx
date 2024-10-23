import React from 'react'
import Image, { type ImageProps } from 'next/image'

import { getImage } from '@/lib/get-image'

interface IDynamicImage extends ImageProps {
  className?: string
}

export const DynamicImage: React.FC<IDynamicImage> = async ({ src, alt, className, ...props }) => {
  const { image, base64 } = await getImage(src.toString())

  return (
    <Image
      className={className}
      src={src}
      placeholder="blur"
      blurDataURL={base64}
      alt={alt}
      {...image}
      {...props}
    />
  )
}
