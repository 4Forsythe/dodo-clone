import { z } from 'zod'

export const birthdaySchema = z.object({
  day: z
    .string()
    .regex(/^([1-9]|[12][0-9]|3[01])$/, 'Введите день от 1 до 31')
    .optional()
    .or(z.literal('')),
  month: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, 'Выберите один из месяцев')
    .optional()
    .or(z.literal('')),
  year: z
    .string()
    .regex(/^\d{4}$/, 'Введите год в формате "ГГГГ"')
    .optional()
    .or(z.literal('')),
})
