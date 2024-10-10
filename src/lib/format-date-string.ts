/**
 * Функция для форматирования типа Date в DateString
 * @param date - дата типа Date
 * @returns строка формата DD month YYYY (string)
 */

export const formatDateString = (date: Date): string => {
  const dateString = new Date(date)

  return `${dateString.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
  })} ${dateString.getFullYear()}`
}
