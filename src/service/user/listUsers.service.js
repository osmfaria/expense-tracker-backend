import prismaClient from '../../database/prismaClient.js'

const listUsersService = async () => {
  const users = await prismaClient.user.findMany()

  return users
}

export default listUsersService
