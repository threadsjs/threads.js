const RESTManager = require('./RESTManager');

class UserManager extends RESTManager {
	async get(id) {
		return await this.request(`/${id ? id : 'me'}?fields=id,username,threads_profile_picture_url,threads_biography`);
	}
}

module.exports = UserManager;