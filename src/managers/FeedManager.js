const RESTManager = require('./RESTManager');

class FeedManager extends RESTManager {
	async fetch() {
		return await this.request('/api/v1/feed/text_post_app_timeline/', {
			method: 'POST',
			body: 'pagination_source=text_post_feed_threads'
		})
	}

	async fetchThreads(user) {
		return await this.request(`/api/v1/text_feed/${String(user)}/profile`);
	}

	async fetchReplies(user) {
		return await this.request(`/api/v1/text_feed/${String(user)}/profile/replies`);
	}

	async recommended() {
		return await this.request('/api/v1/text_feed/recommended_users/');
	}
}

module.exports = FeedManager;