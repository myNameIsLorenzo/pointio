import {fastify, FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify'
import autoload from '@fastify/autoload'
import path from 'path'
import JWT from '@fastify/jwt'
import { settings } from '../../src/config'
import {DB} from "../../src/plugins/db";
import {createUserService} from "../../src/plugins/services/user";
import {createDeviceService} from "../../src/plugins/services/device";

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

export type CreateTestAppOptions = {
  autoLoadPlugins?: boolean
  decorates?: Record<string, unknown>
  plugins?: FastifyPluginAsync[]
}

const defaultCreateTestAppOptions: CreateTestAppOptions = {
  autoLoadPlugins: true,
  decorates: {},
  plugins: []
}

export const createTestApp = (
  createTestAppOptions: CreateTestAppOptions = defaultCreateTestAppOptions,
) => {
  const options = {
    ...defaultCreateTestAppOptions,
    ...createTestAppOptions,
  }

  const app = fastify()

  app.register(JWT, {
    secret: settings.jwtSecret,
  })

  if (options?.autoLoadPlugins) {
    app.register(autoload, {
      dir: path.join(__dirname, '../../src/plugins'),
    })
  } else {
    options?.plugins?.forEach((plugin) => {
      app.register(plugin)
    })
    if (options?.decorates) {
      Object.entries(options.decorates).forEach(([key, value]) => {
        app.decorate(key, value)
      })
    }
  }

  app.register(autoload, {
    dir: path.join(__dirname, '../../src/routes'),
    options: { prefix: '/api' },
  })

  return app
}

export const login = async (app: FastifyInstance) => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/login',
    payload: {
      username: 'tester',
      password: 'Secret!'
    }
  })

  const loginInfo = response.json()

  return loginInfo.token
}
