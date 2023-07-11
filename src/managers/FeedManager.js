const RESTManager = require('./RESTManager');

class FeedManager extends RESTManager {
	async fetch(max_id) {
		return await this.request('/api/v1/feed/text_post_app_timeline/', {
			method: 'POST',
			body: 'pagination_source=text_post_feed_threads' + (max_id ? '&max_id=' + encodeURIComponent(max_id) : ''),
		})
	}

	async fetchThreads(user) {
		return await this.request(`/api/v1/text_feed/${user}/profile`);
	}

	async fetchReplies(user) {
		return await this.request(`/api/v1/text_feed/${user}/profile/replies`);
	}

	async recommended() {
		return await this.request('/api/v1/text_feed/recommended_users/');
	}
}

module.exports = FeedManager;