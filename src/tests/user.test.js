import request from 'supertest'
import { app } from '../app'
import prismaClient from '../database/prismaClient'

describe('🔷 User route testing', () => {
  afterAll(async () => {
    await prismaClient.$disconnect()
  })

  test('Should create a user', async () => {
    const user = {
      name: 'Test User',
      companyId: 99,
    }

    const response = await request(app).post('/users').send(user)

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('name', 'Test User')
    expect(response.body).toHaveProperty('companyId', 99)
    expect(typeof response.body.id).toBe('string')
  })

  test('Should list users', async () => {
    const user1 = {
      name: 'Test User 1',
      companyId: 101,
    }
    const user2 = {
      name: 'Test User 2',
      companyId: 102,
    }

    await prismaClient.user.createMany({ data: [user1, user2] })

    const response = await request(app).get('/users')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          companyId: expect.any(Number),
        }),
      ])
    )
  })
})
