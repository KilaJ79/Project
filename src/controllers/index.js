import editUser from '../use-cases/edit-user.js'
import removeUser from '../use-cases/remove-user.js'
import makeDeleteUser from './delete-user.js'
import makePatchUser from './patch-user.js'
import makePostUser from './post-user.js'
import notFound from './notfound.js'

import { addUser } from '../use-cases/index.js'

const deleteUser = makeDeleteUser({ removeUser })
const patchUser = makePatchUser({ editUser })
const postUser = makePostUser({ addUser })

const userController = Object.freeze({
  deleteUser,
  patchUser,
  postUser,
  notFound
})

export default userController
export { deleteUser, patchUser, postUser, notFound }