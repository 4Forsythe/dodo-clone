import React from 'react'

import { cn } from '@/lib'

interface IFormErrorBlock {
  text: string
  className?: string
}

export const FormErrorBlock: React.FC<IFormErrorBlock> = ({ text, className }) => {
  return (
    <span className={cn('px-2.5 text-sm text-destructive font-medium', className)}>{text}</span>
  )
}
