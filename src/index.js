const EventEmitter = require("node:events");
const { fetch } = require("undici");
const RESTManager = require("./managers/RESTManager");
const UserManager = require("./managers/UserManager");
const PostManager = require("./managers/PostManager");
const FeedManager = require("./managers/FeedManager");
const { parseBloksResponse } = require("./util/Bloks.js");
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const androidId = (Math.random() * 1e24).toString(36);

class Client extends EventEmitter {
	constructor({ token, userAgent, appId }) {
		super({ captureRejections: true });

		this.token = token || null;
		this.userAgent = userAgent || "Barcelona 289.0.0.77.109 Android";
		this.appId = appId || "238260118697367";
		this.androidId = androidId;
		this.userId = null;
		this.base = "https://i.instagram.com";

		this.rest = new RESTManager(this);

		this.users = new UserManager(this);

		this.posts = new PostManager(this);

		this.feeds = new FeedManager(this);
	}

	async qeSync() {
		const uuid = uuidv4();
		const params = {
			id: uuid
		}

		return await fetch(this.base + '/api/v1/qe/sync/', {
			method: 'POST',
			headers: {
				"User-Agent": "Barcelona 289.0.0.77.109 Android",
				"Sec-Fetch-Site": "same-origin",
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				'X-DEVICE-ID': uuid
			},
			body: `params=${encodeURIComponent(params)}`
		}).then(res => {
			return res
		})
	}

	async encryptPassword(password) {
		// https://github.com/dilame/instagram-private-api/blob/master/src/repositories/account.repository.ts#L79-L103
		const key = crypto.randomBytes(32);
		const iv = crypto.randomBytes(12);
		let keyId;
		let pubKey;
		await this.qeSync().then(async res => {
			const headers = res.headers;
			keyId = headers.get('ig-set-password-encryption-key-id');
			pubKey = headers.get('ig-set-password-encryption-pub-key');
		});
		const rsaEncrypted = crypto.publicEncrypt({
			key: Buffer.from(pubKey, 'base64').toString(),
			padding: crypto.constants.RSA_PKCS1_PADDING,
		}, key);
		const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
		const time = Math.floor(Date.now() / 1000).toString();
		cipher.setAAD(Buffer.from(time));
		const aesEncrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
		const sizeBuffer = Buffer.alloc(2, 0);
		sizeBuffer.writeInt16LE(rsaEncrypted.byteLength, 0);
		const authTag = cipher.getAuthTag();
			return {
			time,
			password: Buffer.concat([
				Buffer.from([1, keyId]),
				iv,
				sizeBuffer,
				rsaEncrypted, authTag, aesEncrypted])
				.toString('base64'),
			};
		}

	async login(username, password) {
		const loginUrl = "/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/";
		const encryptedPassword = await this.encryptPassword(password);

		const params = {
			client_input_params: {
				password: `#PWD_INSTAGRAM:4:${encryptedPassword.time}:${encryptedPassword.password}`,
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

		const response = await fetch(this.base + loginUrl, requestOptions);
		const text = await response.text();
		const bloks = parseBloksResponse(text);

		if ('error' in bloks && bloks.error.error_user_msg === "challenge_required") {
			throw new Error('Your Instagram account is facing a checkpoint.')
		}

		if (bloks.two_factor_required) {
			const {
				two_factor_identifier,
				trusted_notification_polling_nonce
			} = bloks.two_factor_info

			console.log('Please approve the login request on your Instagram')

			const self = this;
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

					const response = await fetch(self.base + statusUrl, requestOptions);
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

						const response = await fetch(self.base + verifyUrl, requestOptions);
						const json = await response.json();
						const header = response.headers.get('Ig-Set-Authorization');

						if (json.logged_in_user.pk_id) {
							self.userId = json.logged_in_user.pk_id;
						}

						clearInterval(interval);
						const token = header.replace("Bearer IGT:2:", "") || null

						resolve(token);
					}
				}, 2_500);
			});

			this.token = token;
			return;
		}

		if (bloks.login_response.logged_in_user.pk_id) {
			this.userId = bloks.login_response.logged_in_user.pk_id;
		}

		this.token = bloks.headers?.["IG-Set-Authorization"].replace("Bearer IGT:2:", "");
	}
}

module.exports = {
	Client,
};
