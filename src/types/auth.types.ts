import { z } from 'zod'

import { logInSchema, registerSchema, verifySchema } from '@/schemas'

export type LogInFormType = z.infer<typeof logInSchema>
export type RegisterFormType = z.infer<typeof registerSchema>
export type VerifyFormType = z.infer<typeof verifySchema>
