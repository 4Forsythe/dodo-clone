import { z } from 'zod'

import { logInSchema } from './log-in'
import { passwordSchema } from './password'

export const registerSchema = logInSchema
  .merge(
    z.object({
      name: z.string().min(2, { message: 'Слишком короткое имя' }).optional(),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Введенные пароли не совпадают',
    path: ['confirmPassword'],
  })
