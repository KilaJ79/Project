export default function buildMakeSource ({ isValidIp }) {
	return function makeSource({ ip, browser, refferrer } = {}) {
		if (!ip) {
			throw new Error('User must have an ip');
		}
		if (!isValidIp(ip)) {
			throw new Error('User must have a valid ip');
		}
		return Object.freeze({
			getIp: () => ip,
			getBrowser: () => browser,
			getRefferer: () => refferrer
		})
	}
}