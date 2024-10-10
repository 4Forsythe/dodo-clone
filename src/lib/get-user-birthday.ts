import type { User } from '@prisma/client'

/**
 * Функция для получения данных о дне рождения пользователя (день, месяц, год) в формате объекта
 * @param profile - данные текущего пользователя (User)
 * @returns день, месяц и год рождения в виде строк (day: string; month: string; year: string)
 */

export const getUserBirthday = (profile: User) => {
  let day = ''
  let month = ''
  let year = ''

  if (!profile.birthday) {
    return { day, month, year }
  }

  const dateString = new Date(profile.birthday)

  day = String(dateString.getDay())
  month = String(dateString.toLocaleDateString(undefined, { month: 'numeric' }))
  year = String(dateString.getFullYear())

  return { day, month, year }
}
