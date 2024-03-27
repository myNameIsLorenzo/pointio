import { fastify, FastifyReply, FastifyRequest } from 'fastify'
import pino from 'pino'
import autoload from '@fastify/autoload'
import path from 'path'
import JWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { settings } from './config'
import { DB } from './plugins/db'
import { createUserService } from './plugins/services/user'
import { createDeviceService } from './plugins/services/device'

declare module 'fastify' {
  export interface FastifyInstance {
    db: DB
    User: ReturnType<typeof createUserService>
    Device: ReturnType<typeof createDeviceService>
    tester: string
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      username: string
    }
    user: {
      username: string
      firstname: string
      lastname: string
      email: string
    }
  }
}

const createApp = () => {
  const app = fastify({
    logger: pino({ level: 'info' }),
  })

  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Fastify Mongoose Demo',
        description: 'Fastify Mongoose Demo Application',
        version: '0.1.0',
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  })

  app.register(JWT, {
    secret: settings.jwtSecret,
  })

  app.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
  })

  app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { prefix: '/api' },
  })

  app.ready((err) => {
    if (err) throw err
    app.swagger()
  })

  return app
}

export default createApp
