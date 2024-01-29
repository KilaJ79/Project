/**
 * add new user controller
 */
export default function makeDeleteUser ({ removeUser }) {
  return async function deleteUser (httpRequest) {
    try {
      // validate http request
      const { source = {}, ...userInfo } = httpRequest.body

      // update the source
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']

      // add headers
      if (httpRequest.headers['Referer']) {
        source.referrer = httpRequest.headers['Referer']
      }

      // call use cases. remove user
      const user = await removeUser({ id, ...userInfo })

      // if not ok, throw error
      if (!user) {
        throw new Error('User not found');
      }

      // ok. return response object
      return {
        headers,
        statusCode: 404,
        body: user
      }
    } catch (e) {
      console.log(e)
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}