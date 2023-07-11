const RESTManager = require('./RESTManager');

class FeedManager extends RESTManager {
	async fetch(max_id) {
		return await this.request('/api/v1/feed/text_post_app_timeline/', {
			method: 'POST',
			body: 'pagination_source=text_post_feed_threads' + (max_id ? '&max_id=' + encodeURIComponent(max_id) : ''),
		})
	}

	async fetchThreads(user, max_id) {
		return await this.request(`/api/v1/text_feed/${String(user)}/profile` + (max_id ? '?max_id=' + encodeURIComponent(max_id) : ''));
	}

	async fetchReplies(user, max_id) {
		return await this.request(`/api/v1/text_feed/${String(user)}/profile/replies` + (max_id ? '?max_id=' + encodeURIComponent(max_id) : ''));
	}

	async recommended(paging_token) {
		return await this.request('/api/v1/text_feed/recommended_users/' + (paging_token ? '?paging_token=' + paging_token : ''));
	}
}

module.exports = FeedManager;