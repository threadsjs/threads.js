const { fetch } = require('undici');

class RESTManager {
	constructor(client) {
		Object.defineProperty(this, 'client', { value: client });
	}

	async request(url, options) {
		if (!options) {
			options = {};
		};
		options.method = options?.method ?? 'GET';
		const res = await fetch(`${this.client.options.base}${url}&access-token=${this.client.options.token}`, { ... options });
		const contentType = res.headers.get('content-type');
		if (contentType.includes('application/json')) {
			return res.json();
		}
		return res.text();
	}
}

module.exports = RESTManager;