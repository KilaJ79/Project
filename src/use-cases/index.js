import makeAddUser from "./add-user.js";
import makeEditUser from "./edit-user.js";
import makeRemoveUser from "./remove-user.js";

import { usersDb } from "../data-access/index.js";

const addUser = makeAddUser({ usersDb });
const editUser = makeEditUser({ usersDb });
const removeUser = makeRemoveUser({ usersDb });

const userService = Object.freeze({
	addUser,
	editUser,
	removeUser
})

export default userService
export { addUser, editUser, removeUser }