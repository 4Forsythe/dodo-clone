import { PrismaClient } from '@prisma/client'

import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'

import {
  CATEGORIES,
  INGREDIENTS,
  PRODUCTS,
  PRODUCTS_WITH_VARIANTS,
  STORY_ITEMS,
  STORIES,
} from '../constants/seed.constants'

const prisma = new PrismaClient()

/* Сидер */
async function main() {
  try {
    await down()
    await up()
  } catch (error) {
    console.error(error)
  }
}

/* Генерация данных */
async function up() {
  /* Категории */
  await prisma.category.createMany({
    data: CATEGORIES,
  })

  /* Ингредиенты */
  await prisma.ingredient.createMany({
    data: INGREDIENTS,
  })

  /* Товары с вариациями */
  await Promise.all(
    PRODUCTS_WITH_VARIANTS.map(async (product) => {
      const { id } = await prisma.product.create({
        data: {
          ...product,
          rating: faker.number.int({ min: 0, max: 10 }),
          ingredients: {
            connect: INGREDIENTS.slice(
              faker.number.int({ min: 0, max: INGREDIENTS.length / 2 }),
              faker.number.int({ min: INGREDIENTS.length / 2, max: INGREDIENTS.length })
            ),
          },
        },
      })

      const variants = Array.from({ length: 3 }, () => ({
        size: [25, 30, 35][faker.number.int({ min: 0, max: 2 })],
        type: faker.number.int({ min: 1, max: 2 }),
        weight: faker.number.int({ min: 150, max: 930 }),
        price: faker.number.int({ min: 275, max: 1065 }),
        productId: id,
      }))

      await prisma.productVariant.createMany({
        data: variants,
      })
    })
  )

  /* Товары без вариаций */
  await Promise.all(
    PRODUCTS.map(async (product) => {
      const { id } = await prisma.product.create({
        data: {
          ...product,
          rating: faker.number.int({ min: 0, max: 10 }),
        },
      })

      const variant = {
        size: faker.number.int({ min: 1, max: 4 }),
        weight: faker.number.int({ min: 150, max: 930 }),
        price: faker.number.int({ min: 125, max: 485 }),
        productId: id,
      }

      await prisma.productVariant.createMany({
        data: variant,
      })
    })
  )

  /* Сторисы */
  await prisma.stories.createMany({
    data: STORIES,
  })

  /* Сторис-карточки */
  await prisma.story.createMany({
    data: STORY_ITEMS,
  })

  /* Юзеры и товары в корзинах */
  Array.from({ length: 5 }, async () => {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: hashSync(faker.internet.password(), 12),
      },
    })

    const cart = await prisma.cart.create({
      data: {
        userId: user.id,
        token: user.id,
      },
    })

    Array.from({ length: 3 }, async () => {
      await prisma.cartItem.create({
        data: {
          variantId: faker.number.int({ min: 1, max: 26 }),
          cartId: cart.id,
          doppings: {
            connect: Array.from({ length: 3 }, () => {
              return { id: faker.number.int({ min: 1, max: 17 }) }
            }),
          },
        },
      })
    })
  })
}

/* Очистка данных */
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Stories" RESTART IDENTITY CASCADE`
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
