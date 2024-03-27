import { Static, Type } from '@sinclair/typebox'

export const LoginCommand = Type.Object({
  username: Type.String(),
  password: Type.String(),
})
export type LoginCommand = Static<typeof LoginCommand>

export const LoginReply = Type.Object(
  {
    token: Type.String(),
  },
  { description: 'JWT token' },
)
export type LoginReply = Static<typeof LoginReply>
