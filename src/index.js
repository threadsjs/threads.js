const { fetch } = require("undici");
const RESTManager = require("./managers/RESTManager");
const UserManager = require("./managers/UserManager");
const PostManager = require("./managers/PostManager");

class Client {
	constructor(options) {
		this.options = {}
		this.options.token = options ? options.token : null;
		this.options.secret = options ? options.secret : null;
		this.options.base = options ? options.base : "https://graph.threads.net";

		this.rest = new RESTManager(this);

		this.users = new UserManager(this);

		this.posts = new PostManager(this);
	}

	async refresh_token(token) {
		return await this.request(`/access_token/refresh_access_token?grant_type=th_refresh_token&access_token=${token}`);
	}

	async getToken(secret, token) {
		const request = await this.request(`/access_token?grant_type=th_exchange_token&client_secret=${secret}&access_token=${token}`)
	}
}

module.exports = {
	Client,
};
