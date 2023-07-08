const RESTManager = require('./RESTManager');

class PostManager extends RESTManager {
	constructor() {
		super();
		this.androidId = (Math.random() * 1e24).toString(36);
	}
	
	async create(contents, user) {
		const id = this.androidId;
		const requestBody = {
			publish_mode: "text_post",
			text_post_app_info: '{"reply_control":0}',
			timezone_offset: "-25200",
			source_type: "4",
			_uid: user,
			device_id: `android-${id}`,
			caption: contents,
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
