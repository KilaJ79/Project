import makeUser from "../user/index.js";
export default function makeEditUser({ usersDb }) {
	return async function editUser({ id, ...changes } = {}) {
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
	}
}
