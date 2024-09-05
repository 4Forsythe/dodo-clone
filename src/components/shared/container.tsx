import React from 'react'

import { cn } from '@/lib/utils'

interface IContainer {
  className?: string
}

export const Container: React.FC<React.PropsWithChildren<IContainer>> = ({
  className,
  children,
}) => {
  return <div className={cn('max-w-[1280px] mx-auto', className)}>{children}</div>
}
