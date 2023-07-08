import { EventEmitter } from 'events';

declare module 'events' {
    class EventEmitter {
      constructor(options?: { captureRejections?: boolean });
      addListener(event: string | symbol, listener: (...args: any[]) => void): this;
      on(event: string | symbol, listener: (...args: any[]) => void): this;
      once(event: string | symbol, listener: (...args: any[]) => void): this;
      removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
      off(event: string | symbol, listener: (...args: any[]) => void): this;
      removeAllListeners(event?: string | symbol): this;
      setMaxListeners(n: number): this;
      getMaxListeners(): number;
      listeners(event: string | symbol): Function[];
      rawListeners(event: string | symbol): Function[];
      emit(event: string | symbol, ...args: any[]): boolean;
      listenerCount(type: string | symbol): number;
      prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
      prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
      eventNames(): (string | symbol)[];
    }
  }
  
  declare module 'undici' {
    interface RequestOptions {
      method?: string;
      headers?: { [key: string]: string };
      body?: string;
    }
  
    interface FetchResponse {
      text(): Promise<string>;
      json(): Promise<any>;
    }
  
    function fetch(url: string, options: RequestOptions): Promise<FetchResponse>;
  }
  
  declare function getToken(username: string, password: string): Promise<string>;
  
  declare class Client extends EventEmitter {
    constructor(options: { token: string; userAgent?: string; appId?: string });
    getLsd(): Promise<string>;
    getUser(userId: string): Promise<any>;
    getPost(postId: string): Promise<any>;
    postThread(contents: string, userId: string): Promise<any>;
  }
  
  export { getToken, Client };
  