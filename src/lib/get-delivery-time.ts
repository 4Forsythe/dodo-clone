import { START_DELIVERY_AT, END_DELIVERY_AT } from '@/constants'

export const getDeliveryTime = () => {
  const today = new Date()
  const deliveryTimes = []

  const currentHour = today.getHours()

  let firstDeliveryTime = new Date(today)

  firstDeliveryTime.setHours(currentHour + 1)

  if (currentHour < START_DELIVERY_AT.getHours() || currentHour >= END_DELIVERY_AT.getHours()) {
    firstDeliveryTime = new Date(today)

    firstDeliveryTime.setDate(today.getDate() + 1)
    firstDeliveryTime.setHours(START_DELIVERY_AT.getHours())
    firstDeliveryTime.setMinutes(0)
  }

  for (let i = 0; i < 4; i++) {
    const deliveryTime = new Date(firstDeliveryTime)

    deliveryTime.setHours(deliveryTime.getHours() + i)
    deliveryTimes.push(deliveryTime)
  }

  return deliveryTimes
}
