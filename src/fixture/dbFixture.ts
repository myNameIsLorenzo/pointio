import mongoose from 'mongoose'
import { User, Device } from '../models'
import { settings } from '../config'

async function createUsers() {
  await User.addOne({
    username: 'tester',
    firstname: 'John',
    lastname: 'Doe',
    password: 'Secret!',
    email: 'john.doe@email.com',
  }).save()
}

async function createDevices() {
  await Device.addOne({
    name: 'First Device',
    address: '10.10.10.1',
  }).save()

  await Device.addOne({
    name: 'Second Device',
    address: '10.10.10.2',
  }).save()
}

const createDbFixtures = async () => {
  const client = await mongoose.connect(settings.mongoUri)

  await client.connection.db.dropDatabase()

  await createUsers()
  await createDevices()

  client.connection.close()
}

export default createDbFixtures
