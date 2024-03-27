import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify'
import fp from 'fastify-plugin'

const AuthPlugin: FastifyPluginAsync = async (
  instance: FastifyInstance,
  _options: FastifyPluginOptions,
) => {
  const { User } = instance
  instance.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      request.jwtVerify(async (err, decoded) => {
        if (err) {
          reply.send(err)
          return
        }
        const user = await User.getByUsername(decoded.username)
        if (!user) {
          reply.send('User not found')
          return
        }
        return {
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        }
      })
    },
  )
}

export default fp(AuthPlugin)
