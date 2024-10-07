import { z } from 'zod'

import { profileSchema } from '@/schemas/profile'

export type ProfileFormType = z.infer<typeof profileSchema>
