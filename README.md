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
## Usage
```js
const { Client } = require('@threadsjs/threads.js');

(async () => {
	const client = new Client();
	// You can also specify a token: const client = new Client({ token: 'token' });
	await client.login('username', 'password');

	await client.users.fetch('25025320').then(user => {
		console.log(user);
	});
})();
```

## Methods
### client.users.fetch
In the parameters, pass the userId of the user whose information you want to get.
```js
await client.users.fetch("1")
```
### client.users.follow
Pass the userId of the user you want to subscribe to in the parameters
```js
await client.users.follow("1")
```
### client.users.search
Pass the query as the first parameter, and the number of objects in the response as the second parameter (by default - 30)
```js
await client.users.search("zuck", "10")
```
### client.users.followers
In the parameters, pass the userId of the user whose followers you want to get.
```js
await client.users.followers("1")
```
### client.users.following
In the parameters, pass the userId of the user whose followings you want to get.
```js
await client.users.following("1")
```

<br />

### client.feeds.fetchThreads
In the parameters, pass the userId of the user whose threads you want to get.
```js
await client.feeds.fetchThreads("1")
```
### client.feeds.fetchReplies
In the parameters, pass the userId of the user whose replies you want to get.
```js
await client.feeds.fetchReplies("1")
```
### client.feeds.recommended
Getting a list of recommendations.
```js
await client.feeds.recommended()
```

<br />

### client.posts.fetch
In the parameters pass the id of the post you want to get information about
```js
await client.posts.fetch("aAaAAAaaa")
```
### client.posts.likers
In the parameters pass the id of the post whose likes you want to get
```js
await client.posts.likers("aAaAAAaaa")
```
### client.posts.create
The method is used to create a thread. Pass the text of the thread as the first parameter, and the user id as the second
```js
await client.posts.create("Hello world!", "1")
```
### client.posts.reply
The method is used to create reply to a thread. Pass the text of the reply as the first parameter, the user id as the second, and post id as the third
```js
await client.posts.reply("Hello world!", "1", "aAaAAAaaa")
```
### client.posts.delete
The method is used to delete a thread. Pass the post id as the first parameter, and the user id as the second
```js
await client.posts.delete("aAaAAAaaa", "1")
```
### client.posts.like
The method is used to like a thread. Pass the post id as the first parameter, and the user id as the second
```js
await client.posts.like("aAaAAAaaa", "1")
```
### client.posts.repost
The method is used to repost a thread. Pass the post id as the only parameter
```js
await client.posts.repost("aAaAAAaaa")
```
