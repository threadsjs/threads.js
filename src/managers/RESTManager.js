const { fetch } = require('undici');

const base = 'https://i.instagram.com'

class RESTManager {
	constructor(client) {
	  Object.defineProperty(this, 'client', { value: client });
	}

	async request(url, options) {
		if (!options) {
			options = {};
		};
		options.method = options?.method ?? 'GET';
		options.headers = {
			'Authorization': `Bearer IGT:2:${this.client.token}`,
			'User-Agent': this.client.userAgent,
			'Sec-Fetch-Site': 'same-origin',
		};
		if (options.method === 'POST') {
			options.headers.append({
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			});
		};
		const res = await fetch(base + url, { ... options });
		const contentType = res.headers.get('content-type');
		if (contentType.includes('application/json')) {
			return res.json();
		}
		return res.text();
	}
}

module.exports = RESTManager;