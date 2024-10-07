import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib'
import { ChevronLeft } from 'lucide-react'

import { route } from '@/config'

import { Button } from '@/components/ui'
import { Heading } from '@/components/shared'

interface IExceptionBlock {
  title: string
  text: string
  imageUrl?: string
  className?: string
}

export const ExceptionBlock: React.FC<IExceptionBlock> = ({ title, text, imageUrl, className }) => {
  return (
    <div className={cn('w-[840px] gap-12 flex items-center justify-between', className)}>
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Heading text={title} size="xl" className="mb-4 font-extrabold" />
          <p className="text-lg text-gray-400">{text}</p>
        </div>

        <div className="mt-10 gap-5 flex items-center group">
          <Link href={route.HOME}>
            <Button className="gap-1 text-base font-semibold">
              <ChevronLeft
                className="group-hover:-translate-x-1 transition duration-200"
                size={20}
              />
              На главную
            </Button>
          </Link>
        </div>
      </div>

      {imageUrl && <Image width={340} height={340} src={imageUrl} alt={title} priority />}
    </div>
  )
}
