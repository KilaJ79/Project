/**
 * use case remove user
 * deps: userDb
 */

import makeUser from "../user/index.js";

export default function makeRemoveUser({ usersDb }) {
	return async function removeUser(userInfo) {
		console.log({
			from: "use case > removeUser",
			userInfo
		})
		/** 
		if (!id) {
			throw new Error('You must have a valid id');
		}
		const userToDelete = await usersDb.findById({ id })
		if (!userToDelete) {
			return deleteNothing()
		}
		return hardDelete(userToDelete)
	}
	function deleteNothing () {
		return {
			message: 'User not found, nothing to delete.'
		}
	}
	async function hardDelete (user) {
		await usersDb.remove(user)
		return {
			message: 'User deleted.'
		}
		*/
		const user = await usersDb.remove(userInfo)
		console.log({
			user
		})
		return user
	}
}