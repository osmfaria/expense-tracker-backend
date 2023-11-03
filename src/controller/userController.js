import createUserService from '../service/user/createUser.service.js'
import listUsersService from '../service/user/listUsers.service.js'

export const createUserController = async (req, res) => {
  const data = req.validatedData

  const user = await createUserService(data)

  return res.status(201).json(user)
}

export const listUsersController = async (req, res) => {
  const users = await listUsersService()

  return res.status(200).json(users)
}
