import type { Stories, Story } from '@prisma/client'

export type StoriesType = Stories & {
  items: Story[]
}
