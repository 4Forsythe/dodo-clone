import { z } from 'zod'

export const verifySchema = z.object({
  code: z
    .string()
    .min(6, { message: 'Код должен состоять из 6-ти символов' })
    .max(6, { message: 'Код должен состоять из 6-ти символов' }),
})
