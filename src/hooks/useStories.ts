import React from 'react'

import { useStoriesStore, type IStoriesState } from '@/store'

export const useStories = (): IStoriesState => {
  const stories = useStoriesStore()

  React.useEffect(() => {
    stories.getStories()
  }, [])

  return stories
}
