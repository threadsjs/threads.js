const RESTManager = require('./RESTManager');

class FeedManager extends RESTManager {
	async fetch(user) {
		return await this.request(`/api/v1/text_feed/${user}/profile`);
	}

	async recommended() {
		return await this.request('/api/v1/text_feed/recommended_users/');
	}
}

module.exports = FeedManager;