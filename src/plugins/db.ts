import { FastifyInstance } from 'fastify'
import { FastifyPluginAsync, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { settings } from '../config'
import { User, UserModel, Device, DeviceModel } from '../models'

export interface DB {
  models: Models
}

export interface Models {
  User: UserModel
  Device: DeviceModel
}

const DBPlugin: FastifyPluginAsync = async (
  instance: FastifyInstance,
  _options: FastifyPluginOptions,
) => {
  try {
    mongoose.connection.on('connected', () => {
      instance.log.info({ actor: 'MongoDB' }, 'connected')
    })
    mongoose.connection.on('disconnected', () => {
      instance.log.error({ actor: 'MongoDB' }, 'disconnected')
    })

    const db = await mongoose.connect(settings.mongoUri)

    const models: Models = { User, Device }

    instance.decorate('db', { models }).addHook('onClose', () => {
      db.connection.close()
    })
  } catch (error) {
    instance.log.error('Error connecting to MongoDB', error)
  }
}

export default fp(DBPlugin)
