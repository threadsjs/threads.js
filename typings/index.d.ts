import { EventEmitter } from 'node:events';

export class Client extends EventEmitter {
	public constructor(options: ClientOptions);

	getLsd(): Promise<string>;
	getUser(userId: string): Promise<any>;
	getPost(postId: string): Promise<any>;
	postThread(contents: string, userId: string): Promise<any>;
}

export interface ClientOptions {
	token: string;
	userAgent?: string;
	appId?: string;
}