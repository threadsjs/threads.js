import { fetch } from 'undici';

async function getLsd() {
	return await fetch("https://www.threads.net/@instagram").then(async res => {
		const text = await res.text();
		const pos = text.search("\"token\"");
		const lsd = text.substring(pos + 9, pos + 31);
		return lsd
	})
}

export async function getToken(username, password) {
	const id = (Math.random()*1e24).toString(36)
	return await fetch("https://i.instagram.com/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/",{
		method: "POST",
		headers: {
			"User-Agent": "Barcelona 289.0.0.77.109 Android",
			"Sec-Fetch-Site": "same-origin",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		body: `params={"client_input_params":{"password":"${password}","contact_point":"${username}","device_id":"android-${id}"},"server_params":{"credential_type":"password","device_id":"android-${id}"}}&bk_client_context={"bloks_version":"5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73","styles_id":"instagram"}&bloks_versioning_id=5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73`
	}).then(async res => {
		const text = await res.text();
		const pos = text.search("Bearer IGT:2:");
		const token = text.substring(pos + 13, pos + 173);
		return token;
	});
}

export async function getUser(userId, token) {
	return await fetch(`https://i.instagram.com/api/v1/users/${userId}/info`, {
		headers: {
			'User-Agent': 'Barcelona 289.0.0.77.109 Android',
			'Authorization': 'Bearer IGT:2:' + token
		}
	}).then(async res => {
		const user = await res.json()
		return user
	})
}

export async function getPost(postId) {
	const lsd = await getLsd()
	return await fetch("https://www.threads.net/api/graphql", {
	"credentials": "omit",
	"headers": {
		"Content-Type": "application/x-www-form-urlencoded",
		"X-IG-App-ID": "238260118697367",
		"X-FB-LSD": lsd,
		"Sec-Fetch-Site": "same-origin",
	},
	"body": `lsd=${lsd}&variables={"postID":"${postId}"}&doc_id=5587632691339264`,
	"method": "POST",
	}).then(async res => {
		return await res.json()
	})
}

export async function postThread(contents, userId, token) {
	return await fetch(`https://i.instagram.com/api/v1/media/configure_text_only_post/`, {
		method: 'POST',
		headers: {
			'User-Agent': 'Barcelona 289.0.0.77.109 Android',
			'Authorization': 'Bearer IGT:2:' + token,
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'Sec-Fetch-Site': 'same-origin'
		},
		body: `signed_body=SIGNATURE.%7B%22publish_mode%22%3A%22text_post%22%2C%22text_post_app_info%22%3A%22%7B%5C%22reply_control%5C%22%3A0%7D%22%2C%22timezone_offset%22%3A%22-25200%22%2C%22source_type%22%3A%224%22%2C%22_uid%22%3A%22${userId}%22%2C%22device_id%22%3A%22android-${(Math.random()*1e24).toString(36)}%22%2C%22caption%22%3A%22${contents}%22%2C%22device%22%3A%7B%22manufacturer%22%3A%22OnePlus%22%2C%22model%22%3A%22ONEPLUS+A3010%22%2C%22android_version%22%3A25%2C%22android_release%22%3A%227.1.1%22%7D%7D`
	}).then(async res => {
		const user = await res.json()
		return user
	})
}