import request from 'supertest'
import { app } from '../app'
import prismaClient from '../database/prismaClient'

describe('🔷 Expense route testing', () => {
  let userId
  let expenseId
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

    expenseId = response.body.id
  })

  test('Should update expense', async () => {
    const updatedExpense = {
      amount: 73,
      description: 'Updated expense',
      id: expenseId,
    }

    const response = await request(app).patch(`/expenses`).send(updatedExpense)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty(
      'description',
      updatedExpense.description
    )
    expect(response.body).toHaveProperty('amount', updatedExpense.amount)
  })

  test('Should delete expense', async () => {
    const response = await request(app).delete(`/expenses/${expenseId}`).send()

    expect(response.statusCode).toBe(204)

    const expenseSerach = await prismaClient.expense.findUnique({
      where: {
        id: expenseId,
      },
    })

    expect(expenseSerach).toBeNull()
  })

  test('Should list expenses, in order from the most recent', async () => {
    const expenses = [
      {
        description: 'gas',
        amount: 50.45,
        date: new Date('2023-10-02'),
        userId,
      },
      {
        description: 'dinner with client',
        amount: 76.4,
        date: new Date('2023-08-08'),
        userId,
      },
      {
        description: 'Taxi to airport',
        amount: 25.2,
        date: new Date('2023-01-02'),
        userId,
      },
    ]

    await prismaClient.expense.createMany({
      data: expenses,
    })

    const response = await request(app).get(`/expenses/${userId}/2023`).send()
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)

    expenses.forEach((expense, index) => {
      expect(response.body[index]).toHaveProperty(
        'description',
        expense.description
      )
      expect(response.body[index]).toHaveProperty('amount', expense.amount)
      expect(new Date(response.body[index].date)).toEqual(expense.date)
    })
  })

  test('Should list expenses grouped by week', async () => {
    const expenses = [
      {
        description: 'lunch',
        amount: 20.0,
        date: new Date('2023-10-04'),
        userId,
      },
      {
        description: 'Taxi',
        amount: 14.0,
        date: new Date('2023-08-09'),
        userId,
      },
      {
        description: 'Snacks',
        amount: 10.0,
        date: new Date('2023-01-04'),
        userId,
      },
    ]

    await prismaClient.expense.createMany({
      data: expenses,
    })

    const response = await request(app)
      .get(`/expenses/week/${userId}/2023`)
      .send()
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)

    expenses.forEach((_, index) => {
      expect(response.body[index]).toHaveProperty('week_number')
      expect(response.body[index]).toHaveProperty('total_amount')
      expect(response.body[index]).toHaveProperty('week')
      expect(response.body[index]).toHaveProperty('year')
    })
  })
})
