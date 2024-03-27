import { Static, Type } from '@sinclair/typebox'

export const DeviceParams = Type.Object({
  id: Type.String(),
})
export type DeviceParams = Static<typeof DeviceParams>

export const DeviceDto = Type.Object({
  id: Type.String(),
  name: Type.String(),
  address: Type.String(),
  isActive: Type.Boolean(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
})
export type DeviceDto = Static<typeof DeviceDto>

export const DeviceDtos = Type.Array(DeviceDto)
export type DeviceDtos = Static<typeof DeviceDtos>

export const CreateDeviceCommand = Type.Object({
  name: Type.String(),
  address: Type.String(),
})
export type CreateDeviceCommand = Static<typeof CreateDeviceCommand>

export const UpdateDeviceCommand = Type.Partial(CreateDeviceCommand)
export type UpdateDeviceCommand = Static<typeof UpdateDeviceCommand>
