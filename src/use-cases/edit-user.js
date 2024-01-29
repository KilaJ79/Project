/**
 * use case edit user
 * deps: userDb
 */
import makeUser from "../user/index.js";

export default function makeEditUser({ usersDb }) {
	return async function editUser({ id, ...changes } = {}) {
		console.log({
			from: "use case > editUser",
			changes
		})
		/** 
		if (!id) {
			throw new Error('You must have a valid id');
		}
		if (!changes.text) {
			throw new Error('You must supply text.')
		}
		const existing = await usersDb.findById({ id })
		if (!existing) {
			throw new RangeError('User not found.')
		}
		const user = makeUser({...existing, ...changes})
		const updated = await usersDb.update({
			id: updated.getId(),
			name: updated.getName(),
			email: updated.getEmail(),
			password: updated.getPassword()
		})
		return{...existing, ...updated}  
		*/
		const user = await usersDb.update(userInfo)
		console.log({
			user
		})
		return user
	}
}

