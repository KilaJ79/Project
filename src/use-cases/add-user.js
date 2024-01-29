/**
 * use case add new user
 * deps: userDb
 */
export default function makeAddUser ({ usersDb }){
	return async function addUser(userInfo) {
		console.log({
			from: "use case > addUser",
			userInfo
		})
		// cek user info
		// klo email sdh ada, throw error
		if (usersDb.email) {
			throw new Error('Email already exists');
		}
		const user = await usersDb.insert(userInfo)

		console.log({
			user
		});

		return user;
	}
}