'use client'

import React from 'react'

import { cn } from '@/lib'
import Stories from 'react-insta-stories'

import type { Story } from '@prisma/client'
import { X } from 'lucide-react'

interface IStoriesModal {
  stories: Story[]
  className?: string
  onClose: () => void
}

export const StoriesModal: React.FC<IStoriesModal> = ({ stories, className, onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={cn('inset-0 z-40 flex items-center justify-center fixed', className)}>
      <div className="inset-0 z-40 bg-black/80 absolute" onClick={onClose} />
      <div className="gap-1.5 z-50 flex relative">
        <div className="cursor-pointer rounded-xl shadow-2xl shadow-background/40 overflow-hidden">
          <Stories
            width={558}
            height={864}
            stories={stories.map((story) => ({ url: story.imageUrl })) || []}
            onAllStoriesEnd={onClose}
            defaultInterval={4500}
          />
        </div>

        <button
          className="h-fit py-1.5 text-neutral-300 hover:text-white hover:scale-110 transition duration-200"
          onClick={onClose}
        >
          <X size={38} />
        </button>
      </div>
    </div>
  )
}
