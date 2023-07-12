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

	await client.users.fetch(25025320).then(user => {
		console.log(user);
	});
})();
```

## Methods
### client.users.fetch
In the parameters, pass the user id (supported as string and number) of the user whose information you want to get.
```js
await client.users.fetch(1)
```
### client.users.show
In the parameters, pass the user id (supported as string and number) of the user whose friendship status information you want to get.
```js
await client.users.show(1)
```
### client.users.follow
Pass the user id (supported as string and number) of the user you want to subscribe to in the parameters
```js
await client.users.follow(1)
```
### client.users.unfollow
Pass the user id (supported as string and number) of the user you want to unsubscribe from in the parameters
```js
await client.users.unfollow(1)
```
### client.users.search
Pass the query as the first parameter, and the number of objects in the response as the second parameter (by default - 30)
```js
await client.users.search("zuck", 10)
```
### client.users.followers
In the parameters, pass the user id (supported as string and number) of the user whose followers you want to get.
```js
await client.users.followers(1)
```
### client.users.following
In the parameters, pass the user id (supported as string and number) of the user whose followings you want to get.
```js
await client.users.following(1)
```
### client.users.mute
In the parameters, pass the user id (supported as string and number) of the user you want to mute.
```js
await client.users.mute(1)
```
### client.users.unmute
In the parameters, pass the user id (supported as string and number) of the user you want to unmute.
```js
await client.users.unmute(1)
```
### client.users.restrict
In the parameters, pass the user id (supported as string and number) of the user you want to restrict.
```js
await client.users.restrict(1)
```
### client.users.unrestrict
In the parameters, pass the user id (supported as string and number) of the user you want to unrestrict.
```js
await client.users.unrestrict(1)
```
### client.users.block
In the parameters, pass the user id (supported as string and number) of the user you want to block.
```js
await client.users.block(1)
```
### client.users.unblock
In the parameters, pass the user id (supported as string and number) of the user you want to unblock.
```js
await client.users.unblock(1)
```

<br />

### client.feeds.fetch
Gets the default feed. In the parameters, pass the optional max_id of the previous response's next_max_id.
```js
await client.feeds.fetch()
await client.feeds.fetch("aAaAAAaaa")
```
### client.feeds.fetchThreads
In the parameters, pass the user id (supported as string and number) of the user whose threads you want to get, and an optional max_id of the previous response's next_max_id.
```js
await client.feeds.fetchThreads(1),
await client.feeds.fetchThreads(1, "aAaAAAaaa")
```
### client.feeds.fetchReplies
In the parameters, pass the user id (supported as string and number) of the user whose replies you want to get, and an optional max_id of the previous response's next_max_id.
```js
await client.feeds.fetchReplies(1)
await client.feeds.fetchReplies(1, "aAaAAAaaa")
```
### client.feeds.recommended
Getting a list of recommendations. In the parameters, pass the optional paging_token of the previous response.
```js
await client.feeds.recommended()
await client.feeds.recommended(15)
```
### client.feeds.notifications
Getting a list of recommendations. In the parameters, pass an optional filter type and an optional pagination object with max_id and pagination_first_record_timestamp from the previous response.
Valid filter types:
- text_post_app_replies
- text_post_app_mentions
- verified
```js
let pagination = {
	max_id: "1688921943.766884",
	pagination_first_record_timestamp: "1689094189.845912"
}

await client.feeds.notifications()
await client.feeds.notifications(null, pagination)

await client.feeds.notifications("text_post_app_replies")
await client.feeds.notifications("text_post_app_replies", pagination)
```
### client.feeds.notificationseen
Clears all notifications. You might want to do this **after** client.feeds.notifications() and checking new_stories for what wasn't seen.
```js
await client.feeds.notificationseen()
```

<br />

### client.posts.fetch
In the parameters pass the id of the post you want to get information about, and an optional pagination token from the previous request.
```js
await client.posts.fetch("aAaAAAaaa")
await client.posts.fetch("aAaAAAaaa", "aAaAAAaaa")
```
### client.posts.likers
In the parameters pass the id of the post whose likes you want to get
```js
await client.posts.likers("aAaAAAaaa")
```
### client.posts.create
The method is used to create a thread. Pass the text of the thread as the first parameter, and the user id (supported as string and number) as the second
```js
await client.posts.create(1, { contents: "Hello World!" })
```
### client.posts.reply
The method is used to create reply to a thread. Pass the text of the reply as the first parameter, the user id (supported as string and number) as the second, and post id as the third
```js
await client.posts.reply(1, { contents: "Hello World!", post: "aAaAAAaaa" })
```
### client.posts.quote
The method is used to create a quote thread. Pass the text of the quote comment as the first parameter, the user id as the second, and post id as the third
```js
await client.posts.quote(1, { contents: "Hello World!", post: "aAaAAAaaa" })
```
### client.posts.delete
The method is used to delete a thread. Pass the post id as the first parameter, and the user id (supported as string and number) as the second
```js
await client.posts.delete("aAaAAAaaa", 1)
```
### client.posts.like
The method is used to like a thread. Pass the post id as the first parameter, and the user id (supported as string and number) as the second
```js
await client.posts.like("aAaAAAaaa", 1)
```
### client.posts.unlike
The method is used to unlike a thread. Pass the post id as the first parameter, and the user id (supported as string and number) as the second
```js
await client.posts.unlike("aAaAAAaaa", 1)
```
### client.posts.repost
The method is used to repost a thread. Pass the post id as the only parameter
```js
await client.posts.repost("aAaAAAaaa")
```
### client.posts.unrepost
The method is used to un-repost a thread. Pass the post id as the only parameter
```js
await client.posts.unrepost("aAaAAAaaa")
```
