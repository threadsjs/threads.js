const RESTManager = require('./RESTManager');

class PostManager extends RESTManager {
	async post(options) {
        if (typeof(options) === 'string') {
            return await this.request(`/v19.0/me/threads?media_type=IMAGE&text=${options}`, {
				method: 'POST'
			});
        } else {
			// TODO: not this
			let mediaType = options.mediaType === 'video' ? 'video' : 'image'
            return await this.request(`/v19.0/me/threads?media_type=${mediaType.toUpperCase()}&${mediaType}_url=${options.url}&is_carousel_item=${options.carouselItem ? 'true' : 'false'}`, {
				method: 'POST'
			});
        }
	}
}

module.exports = PostManager;