/**
 * add edit user controller
 */
export default function makePatchUser ({ editUser }) {
  return async function patchUser(httpRequest) {
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

      // call use cases. edit user
      const user = await editUser({ ...userInfo, source, id: httpRequest.params.id })
      
      // if not ok, throw error
      if(!user) throw new Error(user)
      
      // ok. return response object
      return {
        headers: {
          'Content-Type': 'application/json',
          'Last-Modified': new Date().toUTCString()
        },
        statusCode: 200,
        body: user
      }
      
    } catch (e) {
      console.log(e)
      if (e.name === 'RangeError') {
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 404,
          body: {
            error: e.message
          }
        }
      }
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
