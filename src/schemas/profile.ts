import { z } from 'zod'

import { birthdaySchema } from './birthday'

export const profileSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Слишком короткое имя' })
      .max(144, { message: 'Слишком длинное имя' })
      .optional()
      .or(z.literal('')),
    email: z.string().readonly(),
    phone: z
      .string()
      .min(12, { message: 'Неподходящий формат номера телефона' })
      .max(12, { message: 'Неподходящий формат номера телефона' })
      .optional()
      .or(z.literal('')),
    birthday: birthdaySchema.optional(),
  })
  .refine(
    (data) => {
      const hasDay = !!data.birthday?.day
      const hasMonth = !!data.birthday?.month
      const hasYear = !!data.birthday?.year

      return (hasDay && hasMonth && hasYear) || (!hasDay && !hasMonth && !hasYear)
    },
    {
      message: 'День, месяц и год должны быть заполнены вместе',
      path: ['birthday'],
    }
  )
