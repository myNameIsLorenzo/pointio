import createApp from './app'
import { settings } from './config'

const app = createApp()

const start = async () => {
  try {
    await app.listen({ port: settings.serverPort })
    app.log.info('Server started successfully')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
