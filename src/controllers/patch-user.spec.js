import makeFakeUser from '../../test/fixtures/users.js'
import makePatchUser from './patch-user.js'

describe('patch user controller', () => {
  it('successfully patches a user', async () => {
    const fakeUser = makeFakeUser()
    const patchUser = makePatchUser({ editUser: c => c })
    const request = {
      headers: {
        'Content-Type': 'application/json',
        Referer: fakeUser.source.referrer,
        'User-Agent': fakeUser.source.browser
      },
      params: {
        id: fakeUser.id
      },
      body: fakeUser
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 200,
      body: { patched: request.body }
    }
    const actual = await patchUser(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const fakeUser = makeFakeUser()
    const patchUser = makePatchUser({
      editUser: () => {
        throw Error('Pow!')
      }
    })
    const request = {
      headers: {
        'Content-Type': 'application/json',
        Referer: fakeUser.source.referrer,
        'User-Agent': fakeUser.source.browser
      },
      params: {
        id: fakeUser.id
      },
      body: fakeUser
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await patchUser(request)
    expect(actual).toEqual(expected)
  })
})