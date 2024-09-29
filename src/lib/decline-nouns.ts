/**
 * Функция для автоматического склонения существительных в нужный падеж от количества
 * @param count - количество, относящееся к существительному
 * @param singularNomitative - существительное в 1 лице, им. падеже и ед. числе (например, товар)
 * @param pluralNomitative - существительное в 1 лице, им. падеже и ед. числе (например, товаров)
 * @param gender - род существительного ('masculine' | 'feminine' | 'neuter')
 * @returns существительное в нужном падеже (string)
 */

export const declineNoun = (
  count: number,
  singularNomitative: string,
  pluralNomitative: string,
  gender: 'masculine' | 'feminine' | 'neuter'
): string => {
  // Определение формы слова в зависимости от числа
  let lastDigit = count % 10
  let lastTwoDigits = count % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return pluralNomitative
  } else if (lastDigit === 1) {
    return singularNomitative
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return getGenitiveSingular(singularNomitative, gender)
  } else {
    return pluralNomitative
  }
}

// Функция для определения родительного падежа единственного числа
const getGenitiveSingular = (noun: string, gender: 'masculine' | 'feminine' | 'neuter'): string => {
  // Склонение мужских существительных
  if (gender === 'masculine') {
    if (noun.endsWith('ь')) {
      return noun.slice(0, -1) + 'я'
    } else if (noun.endsWith('й')) {
      return noun.slice(0, -1) + 'я'
    } else {
      return noun + 'а'
    }
  }
  // Склонение женских существительных
  else if (gender === 'feminine') {
    if (noun.endsWith('а')) {
      return noun.slice(0, -1) + 'ы'
    } else if (noun.endsWith('я')) {
      return noun.slice(0, -1) + 'и'
    }
  } else if (gender === 'neuter') {
    // Склонение существительных среднего рода
    if (noun.endsWith('о')) {
      return noun.slice(0, -1) + 'а'
    } else if (noun.endsWith('е')) {
      return noun.slice(0, -1) + 'я'
    }
  }

  return noun
}
