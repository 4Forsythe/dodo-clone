import { z } from 'zod'

export const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: 'Слишком короткое имя' })
    .max(144, { message: 'Слишком длинное имя' }),
  customerEmail: z.string().email({ message: 'Неподходящий формат электронной почты' }),
  customerPhone: z
    .string()
    .min(12, { message: 'Неподходящий формат номера телефона' })
    .max(12, { message: 'Неподходящий формат номера телефона' }),
  address: z
    .string()
    .min(5, { message: 'Слишком короткий адрес доставки' })
    .max(250, { message: 'Слишком длинный адрес доставки' }),
  deliveredAt: z.date({ message: 'Выберите время доставки' }),
  isContactless: z.boolean().default(false),
  comment: z.string().max(720, { message: 'Слишком большой комментарий к заказу' }).optional(),
})
