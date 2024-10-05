import { z } from 'zod'
import { logInSchema, registerSchema } from '@/schemas'

export type LogInFormType = z.infer<typeof logInSchema>
export type RegisterFormType = z.infer<typeof registerSchema>
