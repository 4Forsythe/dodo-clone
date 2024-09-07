import { PrismaClient } from '@prisma/client'

import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'

import {
  categories,
  ingredients,
  products,
  productsWithVariants,
} from '../src/constants/seed.constants'

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
  await prisma.user.createMany({
    data: Array.from({ length: 5 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashSync(faker.internet.password(), 12),
    })),
  })

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.ingredient.createMany({
    data: ingredients,
  })

  productsWithVariants.map(async (product) => {
    const productWithVariants = await prisma.product.create({
      data: {
        ...product,
        ingredients: {
          connect: ingredients.slice(
            faker.number.int({ min: 0, max: ingredients.length / 2 }),
            faker.number.int({ min: ingredients.length / 2, max: ingredients.length })
          ),
        },
      },
    })

    const variants = Array.from({ length: 3 }, () => ({
      size: [25, 30, 35][faker.number.int({ min: 0, max: 2 })],
      doughType: faker.number.int({ min: 1, max: 2 }),
      price: faker.number.int({ min: 275, max: 1065 }),
      productId: productWithVariants.id,
    }))

    await prisma.productVariant.createMany({
      data: variants,
    })
  })

  await prisma.product.createMany({
    data: products,
  })
}

/* Очистка данных */
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
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
