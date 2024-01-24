import makeDb from '../../test/fixtures/db.js'
import makeUsersDb from './users-db.js'
import makeFakeUser from '../../test/fixtures/users.js'

describe('users db', () => {
  let usersDb

  beforeEach(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('inserts an user', async () => {
    const user = makeFakeUser()
    const result = await commentsDb.insert(user)
    return expect(result).toEqual(user)
  })

  it('finds a user by id', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    const found = await usersDb.findById(user)
    expect(found).toEqual(user)
  })

  it('updates a user', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    user.text = 'changed'
    const updated = await usersDb.update(user)
    return expect(updated.text).toBe('changed')
  })

  it('deletes a user', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    return expect(await usersDb.remove(user)).toBe(1)
  })
})