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
})
