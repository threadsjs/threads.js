const { fetch } = require("undici");
const EventEmitter = require("node:events");
const { parseBloksResponse } = require("./utils");
const RESTManager = require("./managers/RESTManager");
const UserManager = require("./managers/UserManager");
const PostManager = require("./managers/PostManager");
const FeedManager = require("./managers/FeedManager");

const androidId = (Math.random() * 1e24).toString(36);

async function getToken(username, password) {
	const base = "https://i.instagram.com";
	const loginUrl = "/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/";

	const params = {
		client_input_params: {
			password: password,
			contact_point: username,
			device_id: `android-${androidId}`,
		},
		server_params: {
			credential_type: "password",
			device_id: `android-${androidId}`,
		},
	};

	const bkClientContext = {
		bloks_version:
			"5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73",
		styles_id: "instagram",
	};

	const requestBody = {
		params: JSON.stringify(params),
		bk_client_context: JSON.stringify(bkClientContext),
		bloks_versioning_id:
			"5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73",
	};

	const requestOptions = {
		method: "POST",
		headers: {
			"User-Agent": "Barcelona 289.0.0.77.109 Android",
			"Sec-Fetch-Site": "same-origin",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		},
		body: `params=${encodeURIComponent(
			requestBody.params,
		)}&bk_client_context=${encodeURIComponent(
			requestBody.bk_client_context,
		)}&bloks_versioning_id=${requestBody.bloks_versioning_id}`,
	};

	const response = await fetch(base + loginUrl, requestOptions);
	const text = await response.text();
	const bloks = parseBloksResponse(text);

	if (bloks.two_factor_required) {
		const {
			two_factor_identifier,
			trusted_notification_polling_nonce
		} = bloks.two_factor_info

		console.log('Please approve the login request on your Instagram')

		const token = await new Promise((resolve) => {
			const statusUrl = "/api/v1/two_factor/check_trusted_notification_status/";
			const verifyUrl = "/api/v1/accounts/two_factor_login/";

			const interval = setInterval(async function () {
				requestOptions.body = new URLSearchParams({
					two_factor_identifier: two_factor_identifier,
					username,
					device_id: `android-${androidId}`,
					trusted_notification_polling_nonces:
						JSON.stringify([trusted_notification_polling_nonce]),
				}).toString();

				const response = await fetch(base + statusUrl, requestOptions);
				const json = await response.json();

				if (json.review_status === 1) {
					requestOptions.body = new URLSearchParams({
						signed_body: 'SIGNATURE.' + JSON.stringify({
							verification_code: '',
							two_factor_identifier,
							username,
							device_id: `android-${androidId}`,
							trusted_notification_polling_nonces:
								JSON.stringify([trusted_notification_polling_nonce]),
							verification_method: '4'
						})
					}).toString()

					const response = await fetch(base + verifyUrl, requestOptions);
					const header = response.headers.get('Ig-Set-Authorization');

					clearInterval(interval);
					const token = header.replace("Bearer IGT:2:", "") || null

					resolve(token);
				}
			}, 2_500);
		});

		return token;
	}

	return (
		bloks.headers?.["IG-Set-Authorization"].replace("Bearer IGT:2:", "") || null
	);
}

class Client extends EventEmitter {
	constructor({ token, userAgent, appId }) {
		super({ captureRejections: true });

		if (!token) {
			throw new Error("Token is required.");
		}

		this.token = token;
		this.userAgent = userAgent || "Barcelona 289.0.0.77.109 Android";
		this.appId = appId || "238260118697367";
		this.androidId = androidId;

		this.rest = new RESTManager(this);

		this.users = new UserManager(this);

		this.posts = new PostManager(this);

		this.feeds = new FeedManager(this);
	}
}

module.exports = {
	getToken,
	Client,
};
