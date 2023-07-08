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
const { getToken, getUser } = require('@threadsjs/threads.js');

await getToken('username', 'password').then(async token => {
	await getUser('25025320', token).then(user => {
		console.log(user)
	})
})
```
