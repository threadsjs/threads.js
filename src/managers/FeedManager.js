const RESTManager = require('./RESTManager');

class FeedManager extends RESTManager {
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