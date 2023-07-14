const RESTManager = require('./RESTManager');

class RestrictionManager extends RESTManager {
	async restrict(user) {
		const requestBody = {
			user_ids: user,
			container_module: "ig_text_feed_timeline"
		};
		return await this.request(`/api/v1/restrict_action/restrict_many/`, {
			method: 'POST',
			body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
		});
	}

	async unrestrict(user) {
		return await this.request(`/api/v1/restrict_action/unrestrict/`, {
			method: 'POST',
			body: `target_user_id=${user}&container_module=ig_text_feed_timeline`,
		});
	}
}

module.exports = RestrictionManager;