'use client'

import React from 'react'

import { cn } from '@/lib'
import type { LucideIcon } from 'lucide-react'

import { Heading } from '@/components/shared'

interface ITipBlock {
  icon: LucideIcon
  title: string
  description: string
  extra?: React.ReactNode
  className?: string
}

export const TipBlock: React.FC<ITipBlock> = ({
  icon: Icon,
  title,
  description,
  extra,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-fit h-fit px-6 py-5 gap-3 flex flex-col border border-secondary-foreground/50 bg-secondary/30 rounded-2xl',
        className
      )}
    >
      <div className="gap-2 flex items-center">
        <Icon size={20} />
        <Heading className="my-0 font-bold" text={title} size="xs" />
      </div>

      <p className="mb-1.5 text-sm text-gray-500 leading-[1.35rem]">{description}</p>

      {extra}
    </div>
  )
}
