'use client'

import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib'

import { Skeleton } from '@/components/ui'
import { Container, StoriesModal } from '@/components/shared'

import { useStories } from '@/hooks'

import type { StoriesType } from '@/types'

interface IStories {
  className?: string
}

export const Stories: React.FC<IStories> = ({ className }) => {
  const [story, setStory] = React.useState<StoriesType>()
  const [isShowing, setIsShowing] = React.useState(false)

  const { items, isLoading } = useStories()

  const onShowStories = (stories: StoriesType) => {
    setStory(stories)

    if (stories.items.length > 0) {
      setIsShowing(true)
    }
  }

  return (
    <>
      {story && isShowing && (
        <StoriesModal stories={story.items} onClose={() => setIsShowing(false)} />
      )}
      <Container className={cn('pb-10', className)}>
        <div className="gap-2 flex items-center">
          {isLoading
            ? [...Array(6)].map((_, index) => (
                <Skeleton key={index} className="w-[200px] h-[248px] bg-neutral-100 rounded-3xl" />
              ))
            : items.map((item) => (
                <button
                  key={item.id}
                  className="rounded-3xl overflow-hidden"
                  onClick={() => onShowStories(item)}
                >
                  <Image
                    className="w-[200px] h-[250px] object-cover"
                    width={200}
                    height={250}
                    src={item.imageUrl}
                    alt={item.imageUrl}
                    priority
                  />
                </button>
              ))}
        </div>
      </Container>
    </>
  )
}
