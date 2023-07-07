# threads.js
thread.js is a Node.js library that allows you to interact with the Threads API

# Installation
```
npm install @threadsjs/threads.js
```

# Example usage
```js
import { getPost } from '@threadjs/threads.js';

await getPost('3141055616164096839').then(post => {
  console.log(post)
});
```
