const RESTManager = require('./RESTManager');

class PostManager extends RESTManager {
	async create(contents, user) {
		const id = (Math.random() * 1e24).toString(36);
		const requestBody = {
			publish_mode: "text_post",
			text_post_app_info: '{"reply_control":0}',
			timezone_offset: "-25200",
			source_type: "4",
			_uid: user,
			device_id: `android-${id}`,
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

	async like(post, user) {
		return await this.request(`/api/v1/media/${post}_${user}/like/`, {
			method: 'POST',
		});
	}
}

module.exports = PostManager;