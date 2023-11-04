import { AppError } from '../../errors/appError'
import { validate } from '../middleware/validationMiddleware'
import { userCreateSchema } from '../schema/userSchema'
import { jest } from '@jest/globals'

describe('🔷 Middleware test', () => {
  const next = jest.fn()

  const mockReq = (body) => ({ body })

  const mockRes = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  test('Should call next with validatedData', async () => {
    const validUser = {
      name: 'User A',
      companyId: 10,
    }

    const req = mockReq(validUser)
    const res = mockRes()

    await validate(userCreateSchema)(req, res, next)
    expect(req.validatedData).toEqual(validUser)
  })

  test('Should call next with AppError', async () => {
    const invalidUser = {
      name: 'User B',
      companyId: -1,
    }

    const req = mockReq(invalidUser)
    const res = mockRes()

    await validate(userCreateSchema)(req, res, next)
    console.log(next.mock.calls[0][0].message)
    expect(next).toBeCalledWith(expect.any(AppError))
    expect(next.mock.calls[0][0].message).toEqual([
      'should be equal or higher than 1',
    ])
  })
})
