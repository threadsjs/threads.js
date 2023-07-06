import { fetch } from 'undici';

async function getLsd() {
	return await fetch("https://www.threads.net/@instagram").then(async res => {
		const text = await res.text();
		const pos = text.search("\"token\"");
		const lsd = text.substring(pos + 9, pos + 31);
		return lsd
	})
}

export async function getUser(userId) {
	const lsd = await getLsd()
	return await fetch("https://www.threads.net/api/graphql", {
    "credentials": "omit",
    "headers": {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-IG-App-ID": "238260118697367",
        "X-FB-LSD": lsd,
        "Sec-Fetch-Site": "same-origin",
    },
    "body": `lsd=${lsd}&variables={"userID":"${userId}"}&doc_id=23996318473300828`,
    "method": "POST",
	}).then(async res => {
		return await res.json()
	})
}
