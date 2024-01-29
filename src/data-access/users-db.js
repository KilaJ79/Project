import { dbName } from "../constants/index.js"

export default function makeUsersDb({ getInstance }) {
	return Object.freeze({
		findById,
		insert,
		update,
		remove
	})

	async function findById({ id: _id }) {
		const client = await getInstance()
		const result = await client.db(dbName).collection('users').find({ _id })
		const found = await result.toArray()
		if (found.length === 0) {
			return null
		}
		const { _id: id, ...info } = found[0]
		return { id, ...info }
	}

	async function insert(userInfo) {
		console.log({
			from: "usersDB > insert",
			userInfo
		})

		const client = await getInstance();

		console.log({
			client
		});

		const result = await client.db(dbName)
			.collection('users')
			.insertOne({ ...userInfo });

		console.log({
			result
		});

		return result;
	}
	
	async function update ({ id: _id, ...userInfo }) {
		console.log({
			from: "usersDB > update",
			userInfo
		})
		const client = await getInstance()
		console.log({
			client
		})

		const result = await client.db(dbName)
		.collection('users')
		.updateOne(
			{ _id }, 
			{ $set: 
				{ ...userInfo } 
		})

		console.log({
			result
		})
		
		return result
	}

	async function remove ({ id: _id }) {
		console.log({
			from: "usersDB > remove",
			userInfo
		})
		const client = await getInstance()

		console.log({
			client
		})

		const result = await client.db(dbName)
		.collection('users')
		.deleteOne({ _id })

		console.log({
			result
		})
		return result
	}

}