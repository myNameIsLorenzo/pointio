import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from 'fastify'
import {
  CreateDeviceCommand,
  DeviceDto,
  DeviceDtos,
  DeviceParams,
  UpdateDeviceCommand,
} from '../../schemas/device'

const DeviceRoutesPlugin: FastifyPluginAsync = async (
  instance: FastifyInstance,
  _options: FastifyPluginOptions,
) => {
  const { Device } = instance

  instance.get<{ Reply: DeviceDtos }>(
    '/',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDtos,
          500: {
            type: 'null',
            description: 'Error retrieving devices',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        return await Device.findAll()
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )

  instance.get<{ Params: DeviceParams; Reply: DeviceDto }>(
    '/:id',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDto,
          404: {
            type: 'null',
            description: 'Device not found',
          },
          500: {
            type: 'null',
            description: 'Error retrieving device',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const device = await Device.getById(request.params.id)
        if (!device) {
          return reply.code(404).send()
        }
        return device
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )

  instance.post<{ Body: CreateDeviceCommand; Reply: DeviceDto }>(
    '/',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        body: CreateDeviceCommand,
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          201: DeviceDto,
          500: {
            type: 'null',
            description: 'Error creating device',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        return await Device.create(request.body)
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )

  instance.put<{
    Params: DeviceParams
    Body: UpdateDeviceCommand
    Reply: DeviceDto
  }>(
    '/:id',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        body: UpdateDeviceCommand,
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDto,
          404: {
            type: 'null',
            description: 'Device not found',
          },
          500: {
            type: 'null',
            description: 'Error updating device',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const id = request.params.id
        const device = await Device.update(id, request.body)
        if (!device) {
          return reply.code(404).send()
        }
        return device
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )

  instance.delete<{ Params: DeviceParams; Reply: DeviceDto }>(
    '/:id',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDto,
          404: {
            type: 'null',
            description: 'Device not found',
          },
          500: {
            type: 'null',
            description: 'Error deleting device',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const device = await Device.remove(request.params.id)
        if (!device) {
          return reply.code(404).send()
        }
        return device
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )

  instance.patch<{ Params: DeviceParams; Reply: DeviceDto }>(
    '/:id/activate',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDto,
          404: {
            type: 'null',
            description: 'Device not found',
          },
          500: {
            type: 'null',
            description: 'Error activating device',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const device = await Device.activate(request.params.id)
        if (!device) {
          return reply.code(404).send()
        }
        return device
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )

  instance.patch<{ Params: DeviceParams; Reply: DeviceDto }>(
    '/:id/deactivate',
    {
      onRequest: [instance.authenticate],
      schema: {
        tags: ['Devices'],
        security: [
          {
            apiKey: [],
          },
        ],
        response: {
          200: DeviceDto,
          404: {
            type: 'null',
            description: 'Device not found',
          },
          500: {
            type: 'null',
            description: 'Error deactivating device',
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const device = await Device.deactivate(request.params.id)
        if (!device) {
          return reply.code(404).send()
        }
        return device
      } catch (error) {
        request.log.error(error)
        return reply.code(500).send()
      }
    },
  )
}

export default DeviceRoutesPlugin
