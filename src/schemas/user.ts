import { Static, Type } from '@sinclair/typebox'

export const AuthenticatedUser = Type.Object({
  id: Type.String(),
  username: Type.String(),
  email: Type.String(),
  firstname: Type.String(),
  lastname: Type.String(),
  createdAt: Type.String(),
  updatedAt: Type.String(),
})
export type AuthenticatedUser = Static<typeof AuthenticatedUser>

export const CreateUserCommand = Type.Object({
  username: Type.String(),
  password: Type.String(),
  firstname: Type.String(),
  lastname: Type.String(),
  email: Type.String(),
})
export type CreateUserCommand = Static<typeof CreateUserCommand>
