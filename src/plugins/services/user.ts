import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from 'fastify'
import fp from 'fastify-plugin'
import { UserModel } from '../../models'
import { AuthenticatedUser, CreateUserCommand } from '../../schemas/user'

export const createUserService = (User: UserModel) => {
  return {
    getByUsername: async (
      username: string,
    ): Promise<AuthenticatedUser | undefined> => {
      const document = await User.findOne({ username })
      if (!document) {
        return undefined
      }
      return document.toAuthenticatedUser()
    },
    create: async (data: CreateUserCommand): Promise<AuthenticatedUser> => {
      const document = User.addOne(data)
      await document.save()
      return document.toAuthenticatedUser()
    },
    checkPassword: async (
      username: string,
      password: string,
    ): Promise<boolean> => {
      return User.verifyPassword(username, password)
    },
  }
}

const UserPlugin: FastifyPluginAsync = async (
  instance: FastifyInstance,
  _options: FastifyPluginOptions,
) => {
  const { User } = instance.db.models
  instance.decorate('User', createUserService(User))
}

export default fp(UserPlugin)
