import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyPluginAsync,
} from 'fastify'
import fp from 'fastify-plugin'
import { DeviceModel } from '../../models'
import {
  CreateDeviceCommand,
  DeviceDto,
  DeviceDtos,
  UpdateDeviceCommand,
} from '../../schemas/device'

export const createDeviceService = (Device: DeviceModel) => {
  return {
    findAll: async (): Promise<DeviceDtos> => {
      const documents = await Device.find({})
      return documents.map((doc) => doc.toDto())
    },
    getById: async (id: string): Promise<DeviceDto | undefined> => {
      const document = await Device.findById(id)
      return document?.toDto()
    },
    create: async (data: CreateDeviceCommand): Promise<DeviceDto> => {
      const device = Device.addOne(data)
      await device.save()
      return device.toDto()
    },
    update: async (
      id: string,
      data: UpdateDeviceCommand,
    ): Promise<DeviceDto | undefined> => {
      const document = await Device.findByIdAndUpdate(id, data, { new: true })
      return document?.toDto()
    },
    activate: async (id: string): Promise<DeviceDto | undefined> => {
      const document = await Device.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true },
      )
      return document?.toDto()
    },
    deactivate: async (id: string): Promise<DeviceDto | undefined> => {
      const document = await Device.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true },
      )
      return document?.toDto()
    },
    remove: async (id: string): Promise<DeviceDto | undefined> => {
      const document = await Device.findByIdAndDelete(id)
      return document?.toDto()
    },
  }
}

const DevicePlugin: FastifyPluginAsync = async (
  instance: FastifyInstance,
  _options: FastifyPluginOptions,
) => {
  const { Device } = instance.db.models
  instance.decorate('Device', createDeviceService(Device))
}

export default fp(DevicePlugin)
