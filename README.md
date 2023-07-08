# threads.js
thread.js is a Node.js library that allows you to interact with the Threads API
* Performant
* Authenticated

## Installation
```
npm install @threadsjs/threads.js
```
## Example usage
```js
const { getToken, Client } = require('./src/index.js');

let token;
(async () => {
  token = await getToken('username', 'password');
})();
const client = new Client({ token });

(async () => {
	await client.users.fetch('25025320').then(user => {
		console.log(user);
	});
})();
```
