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
		const user = await usersDb.insert(userInfo)
		// const exists = await usersDb.findById(user.getId())
		// if (exists) {
		// 	throw new Error('User already exists')
		// }
		console.log({
			user
		});

		return user;
	}
}