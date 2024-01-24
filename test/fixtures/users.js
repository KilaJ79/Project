import faker from 'faker';
import { createId, isCuid } from "@paralleldrive/cuid2";

const Id =  Object.freeze({
  makeId: createId(),
  isValidId: isCuid
})

export default function makeFakeUser (overrides) {
  const user = {
    id: Id.makeId(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    source: {
      ip: faker.internet.ip(),
      browser: faker.internet.userAgent(),
      referrer: faker.internet.url()
    }
  }
  
  return {
    ...user,
    ...overrides
  }
}