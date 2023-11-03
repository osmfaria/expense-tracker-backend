import prismaClient from '../../database/prismaClient.js'

const createUserService = async (data) => {
  console.log(data)
  const user = await prismaClient.user.create({ data })

  return user
}

export default createUserService
