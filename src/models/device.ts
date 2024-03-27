import { Schema, Document, model, Model } from 'mongoose'
import { CreateDeviceCommand, DeviceDto } from '../schemas/device'

export interface DeviceModel extends Model<DeviceDocument> {
  addOne(doc: CreateDeviceCommand): DeviceDocument
}

export interface DeviceDocument extends Document {
  name: string
  address: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  toDto(): DeviceDto
}
export const deviceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

deviceSchema.statics.addOne = (doc: CreateDeviceCommand) => {
  return new Device(doc)
}

deviceSchema.methods.toDto = function (): DeviceDto {
  return {
    id: this._id,
    name: this.name,
    address: this.address,
    isActive: this.isActive,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

export const Device = model<DeviceDocument, DeviceModel>('Device', deviceSchema)
