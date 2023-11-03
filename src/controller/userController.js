import createUserService from '../service/user/createUser.service.js'

export const createUserController = async (req, res) => {
  const data = req.validatedData

  const user = await createUserService(data)

  return res.status(201).json(user)
}
