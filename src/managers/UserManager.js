const RESTManager = require('./RESTManager');

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
}

module.exports = UserManager;