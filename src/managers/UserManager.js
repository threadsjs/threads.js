const RESTManager = require('./RESTManager');
const { parseBloksResponse } = require("../util/Bloks.js");

class UserManager extends RESTManager {
	async fetch(user) {
		return await this.request(`/api/v1/users/${String(user)}/info`);
	}

	async show(user) {
		return await this.request(`/api/v1/friendships/show/${String(user)}/`, {
			method: 'POST',
		});
	}

	async follow(user) {
		return await this.request(`/api/v1/friendships/create/${String(user)}/`, {
			method: 'POST',
		});
	}

	async unfollow(user) {
		return await this.request(`/api/v1/friendships/destroy/${String(user)}/`, {
			method: 'POST',
		});
	}

	async search(query, count) {
		return await this.request(`/api/v1/users/search/?q=${query}&count=${count ?? 30}`);
	}

	async followers(user) {
		return await this.request(`/api/v1/friendships/${String(user)}/followers/`);
	}

	async following(user) {
		return await this.request(`/api/v1/friendships/${String(user)}/following/`);
	}

	async mute(user) {
		const requestBody = {
			target_posts_author_id: user,
			container_module: "ig_text_feed_timeline"
		};
		return await this.request(`/api/v1/friendships/mute_posts_or_story_from_follow/`, {
			method: 'POST',
			body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
		});
	}

	async unmute(user) {
		const requestBody = {
			target_posts_author_id: user,
			container_module: "ig_text_feed_timeline"
		};
		return await this.request(`/api/v1/friendships/unmute_posts_or_story_from_follow/`, {
			method: 'POST',
			body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
		});
	}

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

	async block(user) {
		const requestBody = {
			surface: "ig_text_feed_timeline",
			is_auto_block_enabled: "true",
			user_id: user,
		};
		return await this.request(`/api/v1/friendships/block/${user}/`, {
			method: 'POST',
			body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
		});
	}

	async unblock(user) {
		const requestBody = {
			user_id: user,
			container_module: "ig_text_feed_profile"
		};
		return await this.request(`/api/v1/friendships/unblock/${user}/`, {
			method: 'POST',
			body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
		});
	}
}

module.exports = UserManager;