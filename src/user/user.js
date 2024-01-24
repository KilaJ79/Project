export default function buildMakeUser({ Id, sanitize, makeSource }) {
	return function makeUser({
		id = Id.makeId(),
		name,
		email,
		password
	} = {}) {
		if (!id) {
			throw new Error('User must have a valid id');
		}
		if (!name) {
			throw new Error('User must have a name');
		}
		if (name.length < 3) {
			throw new Error('User must be longer than 3 characters');
		}
		if (!email) {
			throw new Error('User must have a email');
		}
		if (!password) {
			throw new Error('User must have a password');
		}
		if (typeof name !== 'string') {
			throw new Error('User name must be a string');
		}
		if (typeof email !== 'string') {
			throw new Error('User email must be a string');
		}
		if (typeof password !== 'string') {
			throw new Error('User password must be a string');
		}
		let sanitizedText = sanitize(text).trim()
    if (sanitizedText.length < 1) {
      throw new Error('User contains no usable text.')
    }
		const validSource = makeSource(source)
		return Object.freeze({
			getId: () => id,
			getName: () => name,
			getEmail: () => email,
			getPassword: () => password,
			getSource: () => validSource
		})
	}
}