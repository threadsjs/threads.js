const RESTManager = require('./RESTManager');

class PostManager extends RESTManager {
	async get(id) {
		return await this.request(`/v1.0/${id}?fields=id,username,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcude,thumbnail_url,children,is_quote_post`);
	}

	async post(options) {
		let container;
        if (typeof(options) === 'string') {
            await this.request(`/me/threads?media_type=IMAGE&text=${options}`, {
				method: 'POST'
			}).then(res => {
				containerId = res.id;
			});
        } else {
			// TODO: not this
			let mediaType = options.mediaType === 'video' ? 'video' : 'image'
            if (options.carouselItem) {
				await this.request(`/me/threads?media_type=${mediaType.toUpperCase()}&${mediaType}_url=${options.url}`, {
					method: 'POST'
				}).then(res => {
					container = res.id;
				});
			} else {
				await this.request(`/me/threads?media_type=CAROUSEL&children=${options.url}&is_carousel_item=true`, {
					method: 'POST'
				}).then(res => {
					container = res.id;
				});
			}
        }
		return await this.request(`/me/threads_publish?creation_id=${container}`, {
			method: 'POST'
		})
	}
}

module.exports = PostManager;