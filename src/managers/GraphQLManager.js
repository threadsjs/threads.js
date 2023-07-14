const { fetch } = require('undici');

class RESTManager {
	constructor(client) {
		Object.defineProperty(this, 'client', { value: client });
	}

	async getLsd() {
		return await fetch('https://www.threads.net/@instagram').then(async res => {
			const text = await res.text();
			const pos = text.search('\'token\'');
			const lsd = text.substring(pos + 9, pos + 31);
			return lsd
		})
	}

	async request(docId, variables) {
		const lsd = await this.getLsd();
		let request = {};
		request.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-IG-App-ID': '238260118697367',
			'X-FB-LSD': lsd,
			'Sec-Fetch-Site': 'same-origin',
		};
		request.body = `lsd=${lsd}&doc_id=${docId}&variables=${variables}`;
		request.credentials = 'omit';
		request.method = 'POST';
		const res = await fetch('https://www.threads.net/api/graphql', { ... request });
		const contentType = res.headers.get('content-type');
		console.log(contentType)
		if (contentType.includes('text/javascript')) {
			return res.json();
		}
		return res.text();
	}

	async getUser(userId) {
		return await this.request('23996318473300828', `{"userID":"${String(userId)}"}`);
	}

	async getPost(postId) {
		return await this.request('6254373924615707', `{"postID":"${String(postId)}"}`);
	}
}

module.exports = RESTManager;