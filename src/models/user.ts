import { Schema, Document, model, Model } from 'mongoose'
import * as crypto from 'crypto'
import { settings } from '../config'
import { AuthenticatedUser, CreateUserCommand } from '../schemas/user'

export interface UserModel extends Model<UserDocument> {
  addOne(doc: CreateUserCommand): UserDocument
  verifyPassword(username: string, password: string): boolean

  toAuthenticatedUser(document: UserDocument): AuthenticatedUser
}

export interface UserDocument extends Document {
  username: string
  password: string
  firstname: string
  lastname: string
  email: string
  createdAt: string
  updatedAt: string
  toAuthenticatedUser(): AuthenticatedUser
}

export const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const createPasswordHash = (username: string, password: string) => {
  const salt = crypto
    .createHash('sha256')
    .update(username + settings.hashedPasswordSalt)
    .digest('base64')
  const input = password + salt
  return crypto.createHash('sha256').update(input).digest('base64')
}

userSchema.statics.addOne = (doc: CreateUserCommand) => {
  const password = createPasswordHash(doc.username, doc.password)
  return new User({
    ...doc,
    password,
  })
}

userSchema.statics.verifyPassword = async (
  username: string,
  password: string,
) => {
  const user = await User.findOne({ username }).select('+password').exec()
  return user?.password === createPasswordHash(username, password)
}

userSchema.methods.toAuthenticatedUser = function (): AuthenticatedUser {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  }
}

export const User = model<UserDocument, UserModel>('User', userSchema)
