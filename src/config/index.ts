import * as dotenv from 'dotenv'

if (process.env.ENV == 'test') {
  dotenv.config({ path: '.env.test' })
} else {
  dotenv.config()
}

const DEFAULT_SERVER_PORT = 3000
const DEFAULT_JWT_SECRET = 'secret'
const DEFAULT_HASHED_PASSWORD_SALT = 'secret'

export interface Settings {
  serverPort: number
  mongoUri: string
  jwtSecret: string
  hashedPasswordSalt: string
}

export const settings: Settings = {
  serverPort: process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : DEFAULT_SERVER_PORT,

  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
  hashedPasswordSalt:
    process.env.HASHED_PASSWORD_SALT || DEFAULT_HASHED_PASSWORD_SALT,
}
