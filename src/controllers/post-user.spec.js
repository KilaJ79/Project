import makePostUser from './post-user.js'
import makeFakeUser from '../../test/fixtures/users.js'

describe('post user controller', () => {
  it('successfully posts a user', async () => {
    const postUser = makePostUser({ addUser: c => c })
    const user = makeFakeUser()
    const request = {
      headers: {
        'Content-Type': 'application/json',
        Referer: user.source.referrer,
        'User-Agent': user.source.browser
      },
      body: user,
      ip: user.source.ip
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json',
        'Last-Modified': new Date().toUTCString()
      },
      statusCode: 201,
      body: { posted: request.body }
    }
    const actual = await postUser(request)
    expect(actual).toEqual(expected)
  })
  it('reports user errors', async () => {
    const postUser = makePostUser({
      addUser: () => {
        throw Error('Pow!')
      }
    })
    const fakeUser = makeFakeUser()
    const request = {
      headers: {
        'Content-Type': 'application/json',
        Referer: fakeUser.source.referrer,
        'User-Agent': fakeUser.source.browser
      },
      body: fakeUser,
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow!' }
    }
    const actual = await postUser(request)
    expect(actual).toEqual(expected)
  })
})
