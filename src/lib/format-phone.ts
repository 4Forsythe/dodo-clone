/**
 * Функция для форматирования строки в формат телефонного номера
 * @param phone - неформатированный номер
 * @returns отформатированный номер (string)
 */

export const formatPhone = (phone: string): string => {
  return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)}-${phone.slice(
    8,
    10
  )}-${phone.slice(10, 12)}`
}
