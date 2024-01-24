/**
 * add new user controller
 */
export default function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    try {
      // validate http request
      const { source = {}, ...userInfo } = httpRequest.body
      
      // update the source
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers["User-Agent"]
      
      // add headers
      if (httpRequest.headers["Referer"]) {
        source.refferrer = httpRequest.headers["Referer"]
      }

      // call use cases. add user
      const user = await addUser({ ...userInfo, source })
      // if not ok, throw error
      if(!user) throw new Error(user)
      
      // ok. return response object
      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date().toUTCString()
				},
        statusCode: 201,
        body: user
      }
    } catch (e) {
      console.log(e)
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
	}
}