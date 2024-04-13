const { fetch } = require("undici");
const RESTManager = require("./managers/RESTManager");
const UserManager = require("./managers/UserManager");

class Client {
	constructor(options) {
		this.options = {}
		this.options.token = options ? options.token : null;
		this.options.base = options ? options.base : "https://graph.instagram.com";

		this.rest = new RESTManager(this);

		this.users = new UserManager(this);
	}

	async login(token) {
		// TODO: implement Instagram API login
		this.options.token = token;
	}
}

module.exports = {
	Client,
};
