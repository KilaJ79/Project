import axios from 'axios'
import qs from 'querystring'
import makeFakeUser from './fixtures/users'
import dotenv from 'dotenv'
dotenv.config()
axios.defaults.validateStatus = function (status) {
  // Throw only if the status code is greater than or equal to 500
  return status < 500
}

describe('akismet', () => {
  it('works', async () => {
    const user = makeFakeUser()
    const req = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: process.env.DM_SPAM_API_URL,
      method: 'post',
      data: qs.stringify({
        user_ip: user.source.ip,
        user_agent: user.source.browser,
        referrer: user.source.referrer,
        user_type: 'user',
        user_name: user.name,
        user_email: user.email,
        is_test: false
      })
    }
    const res = await axios(req)
    expect(res.data).toBe(false)
  })
})
