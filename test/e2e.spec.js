import axios from 'axios'
import usersDb, { makeDb } from '../src/data-access'
import makeFakeUser from './fixtures/users'
import dotenv from 'dotenv'
dotenv.config()

describe('Users API', () => {
  beforeAll(() => {
    axios.defaults.baseURL = process.env.DM_BASE_URL + process.env.DM_API_ROOT
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500
    }
  })
  afterAll(async () => {
    const db = await makeDb()
    return db.collection('users').drop()
  })

  describe('adding users', () => {
    // Content moderator API only allows 1 request per second.
    beforeEach(done => setTimeout(() => done(), 1100))

    it('adds an user to the database', async () => {
      const response = await axios.post(
        '/users/',
        makeFakeUser({
          id: undefined,
          name: 'test',
          email: 'test',
          password: 'test'
        })
      )
      expect(response.status).toBe(201)
      const { posted } = response.data
      const doc = await usersDb.findById(posted)
      expect(doc).toEqual(posted)
      return commentsDb.remove(posted)
    })

    it('requires user to contain a name', async () => {
      const response = await axios.post(
        '/users',
        makeFakeUser({ id: undefined, name: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })

    it('requires user to contain an email', async () => {
      const response = await axios.post(
        '/users',
        makeFakeUser({ id: undefined, email: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })

    it('requires user to contain a password', async () => {
      const response = await axios.post(
        '/users',
        makeFakeUser({ id: undefined, password: undefined })
      )
      expect(response.status).toBe(400)
      expect(response.data.error).toBeDefined()
    })
  })

  describe('modfying comments', () => {
    // Content moderator API only allows 1 request per second.
    beforeEach(done => setTimeout(() => done(), 1100))
    it('modifies an user', async () => {
      const user = makeFakeUser({
        text: '<p>changed!</p>'
      })
      await usersDb.insert(user)
      const response = await axios.patch(`/users/${user.id}`, user)
      expect(response.status).toBe(200)
      expect(response.data.patched.text).toBe('<p>changed!</p>')
      return usersDb.remove(user)
    })
  })
  
  describe('deleting users', () => {
    it('hard deletes', async () => {
      const user = makeFakeUser()
      await usersDb.insert(user)
      const result = await axios.delete(`/users/${user.id}`)
      expect(result.data.deleted).toBe(true)
    })
  })
})
