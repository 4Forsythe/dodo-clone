import { PrismaClient } from '@prisma/client'

import { hashSync } from 'bcrypt'
import { faker } from '@faker-js/faker'

import { categories, ingredients, products } from '../src/constants/seed.constants'

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

  await prisma.product.createMany({
    data: products,
  })
}

/* Очистка данных */
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
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
