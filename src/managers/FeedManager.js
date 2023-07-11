const RESTManager = require('./RESTManager');

class FeedManager extends RESTManager {
	async fetch(max_id) {
		return await this.request('/api/v1/feed/text_post_app_timeline/', {
			method: 'POST',
			body: 'pagination_source=text_post_feed_threads' + (max_id ? '&max_id=' + encodeURIComponent(max_id) : ''),
		})
	}

	async fetchThreads(user, max_id) {
		return await this.request(`/api/v1/text_feed/${String(user)}/profile/` + (max_id ? '?max_id=' + encodeURIComponent(max_id) : ''));
	}

	async fetchReplies(user, max_id) {
		return await this.request(`/api/v1/text_feed/${String(user)}/profile/replies/` + (max_id ? '?max_id=' + encodeURIComponent(max_id) : ''));
	}

	async recommended(paging_token) {
		return await this.request('/api/v1/text_feed/recommended_users/' + (paging_token ? '?paging_token=' + paging_token : ''));
	}

	async notifications(filter, pagination) {
		let params = {
			feed_type: 'all',
			mark_as_seen: false,
			timezone_offset: -25200,
			timezone_name: "America%2FLos_Angeles"
		}
	
		if (filter) {
			params.selected_filters = filter;
		}
	
		if (pagination) {
			params.max_id = pagination.max_id;
			params.pagination_first_record_timestamp = pagination.pagination_first_record_timestamp;
		}
	
		const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

		return await this.request('/api/v1/text_feed/text_app_notifications/?' + queryString);
	}

	async notificationseen() {
		return await this.request('/api/v1/text_feed/text_app_inbox_seen/', {
			method: 'POST',
		})
	}
}

module.exports = FeedManager;