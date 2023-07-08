const RESTManager = require('./RESTManager');

class UserManager extends RESTManager {
	async fetch(user) {
		return await this.request(`/api/v1/users/${user}/info`)
	}
}

module.exports = UserManager;