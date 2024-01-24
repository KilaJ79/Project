export default function makeDeleteUser ({ removeUser }) {
  return async function deleteUser (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const deleted = await removeUser({ id: httpRequest.params.id })
      return {
        headers,
        statusCode: 404,
        body: { deleted }
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