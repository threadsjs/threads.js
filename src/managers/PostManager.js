const RESTManager = require("./RESTManager");

class PostManager extends RESTManager {
	async fetch(post) {
		return await this.request(`/api/v1/text_feed/${post}/replies`);
	}

	async likers(post, user) {
		return await this.request(`/api/v1/media/${post}_${user}/likers/`);
	}

	async create(
		user,
		options = {
			contents: "",
			data: null,
		}
	) {
		const requestBody = {
			publish_mode: "text_post",
			text_post_app_info:
				'{"reply_control":0}' + options.data !== null ? options.data : "",
			timezone_offset: "-25200",
			source_type: "4",
			_uid: String(user),
			device_id: `android-${this.client.androidId}`,
			caption: options.contents,
			upload_id: new Date().getTime(),
			device: {
				manufacturer: "OnePlus",
				model: "ONEPLUS+A3010",
				android_version: 25,
				android_release: "7.1.1",
			},
		};
		return await this.request(`/api/v1/media/configure_text_only_post/`, {
			method: "POST",
			body: `signed_body=SIGNATURE.${encodeURIComponent(
				JSON.stringify(requestBody)
			)}`,
		});
	}

	async reply(
		user,
		options = {
			contents: "",
			post: "",
		}
	) {
		let text_post_app_info = JSON.stringify({
			reply_id: options.post,
			reply_control: 0,
		});
		const requestBody = {
			publish_mode: "text_post",
			text_post_app_info,
			timezone_offset: "-25200",
			source_type: "4",
			_uid: String(user),
			device_id: `android-${this.client.androidId}`,
			caption: options.contents,
			upload_id: new Date().getTime(),
			device: {
				manufacturer: "OnePlus",
				model: "ONEPLUS+A3010",
				android_version: 25,
				android_release: "7.1.1",
			},
		};

		return await this.request(`/api/v1/media/configure_text_only_post/`, {
			method: "POST",
			body: `signed_body=SIGNATURE.${encodeURIComponent(
				JSON.stringify(requestBody)
			)}`,
		});
	}

	async delete(post, user) {
		return await this.request(
			`/api/v1/media/${post}_${String(user)}/delete/?media_type=TEXT_POST`,
			{
				method: "POST",
			}
		);
	}

	async quote(contents, user, post) {
		let text_post_app_info = JSON.stringify({"quoted_post_id": post, "reply_control": 0});

		const requestBody = {
			publish_mode: "text_post",
			text_post_app_info,
			timezone_offset: "-25200",
			source_type: "4",
			_uid: user,
			device_id: `android-${this.client.androidId}`,
			caption: contents,
			upload_id: new Date().getTime(),
			device: {
				manufacturer: "OnePlus",
				model: "ONEPLUS+A3010",
				android_version: 25,
				android_release: "7.1.1",
			},
		};
		return await this.request(`/api/v1/media/configure_text_only_post/`, {
			method: 'POST',
			body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
		});
	}

	async delete(post, user) {
		return await this.request(
			`/api/v1/media/${post}_${String(user)}/delete/?media_type=TEXT_POST`,
			{
				method: "POST",
			}
		);
	}

	async like(post, user) {
		return await this.request(`/api/v1/media/${post}_${String(user)}/like/`, {
			method: "POST",
		});
	}

	async repost(post) {
		return await this.request(`/api/v1/repost/create_repost/`, {
			method: 'POST',
			body: 'media_id=' + post
		});
	}

	async embed(url) {
		return await this.request(
			`/api/v1/text_feed/link_preview/?url=${encodeURIComponent(url)}`
		);
	}
}

module.exports = PostManager;
