'use client'

import React from 'react'

import { cn } from '@/lib'
import type { LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui'
import { Heading } from '@/components/shared'

interface ITipBlock {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  onClick: () => void
}

export const TipBlock: React.FC<ITipBlock> = ({
  icon: Icon,
  title,
  description,
  className,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'w-fit h-fit px-6 py-5 flex flex-col border border-secondary-foreground/50 bg-secondary/30 rounded-2xl',
        className
      )}
    >
      <div className="mb-3 gap-2 flex items-center">
        <Icon size={20} />
        <Heading className="my-0 font-bold" text={title} size="xs" />
      </div>

      <p className="mb-3 text-sm text-gray-500 leading-[1.35rem]">{description}</p>

      <Button className="w-fit rounded-xl" size="sm" onClick={onClick}>
        Всё понятно
      </Button>
    </div>
  )
}
