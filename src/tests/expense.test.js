import request from 'supertest'
import { app } from '../app'
import prismaClient from '../database/prismaClient'

describe('🔷 Expense route testing', () => {
  let userId
  beforeAll(async () => {
    const user = {
      name: 'Test User',
      companyId: 99,
    }

    const createdUser = await prismaClient.user.create({ data: user })
    userId = createdUser.id
  })

  afterAll(async () => {
    await prismaClient.user.deleteMany()
    await prismaClient.$disconnect()
  })

  test('Should create user expense', async () => {
    const expense = {
      description: 'dinner with client',
      amount: 76.4,
      date: '2023-08-08',
      userId,
    }

    const response = await request(app).post('/expenses').send(expense)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('description', 'dinner with client')
    expect(response.body).toHaveProperty('amount', 76.4)
    expect(response.body).toHaveProperty('date')
    expect(response.body.date).toContain(expense.date)
    expect(typeof response.body.id).toContain('string')
  })
})
