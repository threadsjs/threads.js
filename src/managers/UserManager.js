const RESTManager = require('./RESTManager');

class UserManager extends RESTManager {
	async fetch(user) {
		return await this.request(`/api/v1/users/${user}/info`);
	}

	async follow(user) {
		return await this.request(`/api/v1/friendships/create/${user}/`, {
			method: 'POST',
		});
	}

	async search(query, count) {
		return await this.request(`/api/v1/users/search/?q=${query}&count=${count ?? 30}`);
	}
}

module.exports = UserManager;