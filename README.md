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
const { getToken, Client } = require('@threadsjs/threads.js');

const token = await getToken('username', 'password')
const client = new Client({ token: 'token' });

await client.getUser('25025320').then(user => {
  console.log(user);
});
```
