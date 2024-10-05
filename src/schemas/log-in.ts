import { z } from 'zod'

import { passwordSchema } from './password'

export const logInSchema = z.object({
  email: z.string().email({ message: 'Неподходящий формат электронной почты' }),
  password: passwordSchema,
})
