const { fetch } = require('undici');

const docIDs = {
	BarcelonaProfileRootQuery: '23996318473300828',
	BarcelonaPostPageQuery: '6821609764538244',
	BarcelonaProfileThreadsTabQuery: '6549913525047487',
	BarcelonaProfileRepliesTabQuery: '6480022495409040',
}

class RESTManager {
	async getLsd() {
		return await fetch('https://www.threads.net/@instagram').then(async res => {
			const text = await res.text();
			const matches = text.match(/\["LSD",\[\],{"token":"([^"]*)"}/);
			return matches[1];
		})
	}

	async request(docId, variables) {
		if (this.lsd === undefined) {
			this.lsd = await this.getLsd();
		}
		
		let request = {};
		request.headers = {
			'User-Agent': 'threads-client',
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-IG-App-ID': '238260118697367',
			'X-FB-LSD': this.lsd,
			'Sec-Fetch-Site': 'same-origin',
		};
		request.body = `lsd=${this.lsd}&doc_id=${docId}&variables=${encodeURIComponent(JSON.stringify(variables))}`;
		request.credentials = 'omit';
		request.method = 'POST';
		const res = await fetch('https://www.threads.net/api/graphql', { ... request });
		const contentType = res.headers.get('content-type');
		if (contentType.includes('text/javascript')) {
			return res.json();
		}
		return res.text();
	}

	async getUser(userId) {
		return await this.request(docIDs.BarcelonaProfileRootQuery, {userID: String(userId)});
	}

	async getUserPosts(userId) {
		return await this.request(docIDs.BarcelonaProfileThreadsTabQuery, {userID: String(userId)});
	}

	async getUserReplies(userId) {
		return await this.request(docIDs.BarcelonaProfileRepliesTabQuery, {userID: String(userId)});
	}

	async getPost(postId) {
		return await this.request(docIDs.BarcelonaPostPageQuery, {postID: String(postId)});
	}
}

module.exports = RESTManager;