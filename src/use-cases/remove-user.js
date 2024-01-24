import makeUser from "../user/index.js";

export default function makeRemoveUser({ usersDb }) {
	return async function removeUser({ id }) {
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
	}
}