import path from 'path'

import fs from 'fs'

import { MongoMemoryServer } from 'mongodb-memory-server'

const globalConfigPath = path.join(__dirname, 'globalConfig.json')

const mongod =
  global.__MONGOD__ ||
  new MongoMemoryServer({
    autoStart: false
  })

export default async () => {
  if (!mongod.runningInstance) {
    await mongod.start()
  }

  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getConnectionString()
  }

  // Write global config to disk because all tests run in different contexts.
  writeFileSync(globalConfigPath, JSON.stringify(mongoConfig))

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod
}