<div align="center">
	
# threads.js
thread.js is a Node.js library that allows you to interact with the Threads API

[![npm version](https://img.shields.io/npm/v/@threadsjs/threads.js.svg?color=green)](https://www.npmjs.com/package/@threadsjs/threads.js)
[![Downloads](https://img.shields.io/npm/dm/@threadsjs/threads.js.svg)](https://www.npmjs.com/package/@threadsjs/threads.js)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/threadsjs/threads.js.svg)](http://isitmaintained.com/project/threadsjs/threads.js "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/threadsjs/threads.js.svg)](http://isitmaintained.com/project/threadsjs/threads.js "Percentage of issues still open")

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation-and-updating">Installation and updating</a> •
  <a href="#usage">Usage</a> •
  <a href="#methods">Methods</a>
</p>

</div>

## Features
* Object-oriented
* Performant
* Authenticated
* 100% coverage

## Installation and updating
```
npm install @threadsjs/threads.js
```
## Example usage
```js
const { Client } = require('@threadsjs/threads.js');

(async () => {
	const client = new Client({ token: 'token' });

	await client.users.get().then(user => {
		console.log(user);
	});
})();
```