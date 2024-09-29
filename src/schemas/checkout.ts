import { z } from 'zod'

export const checkoutSchema = z.object({
  customerName: z.string().min(2, { message: 'Слишком короткое имя' }),
  customerEmail: z.string().email({ message: 'Неподходящий формат электронной почты' }),
  customerPhone: z
    .string()
    .min(12, { message: 'Неподходящий формат номера телефона' })
    .max(12, { message: 'Неподходящий формат номера телефона' }),
  address: z.string().min(5, { message: 'Слишком короткий адрес доставки' }),
  comment: z.string().max(720, { message: 'Слишком большой комментарий к заказу' }).optional(),
})
