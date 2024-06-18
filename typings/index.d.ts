export abstract class Base {
    public valueOf(): string;
}

export type APIMediaType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'AUDIO' | 'REPOST_FACADE';

export interface APIPost {
	/**
	 * ID of the post
	 */
	id: string;

	/**
	 * Whether this post is a quote post
	 */
	is_quote_post: boolean;

	/**
	 * Where the post is published
	 */
	media_product_type: string;

	/**
	 * Type of media for a post
	 */
	media_post: APIMediaType;

	/**
	 * Media URL of the post (or null if none) 
	 */
	media_url: string | null;

	/**
	 * Creator of the post
	 */
	owner: APIPostOwner;

	/**
	 * Permalink of the post (or null if none)
	 */
	permalink: string | null;

	/**
	 * Shortcode of the post's media (or null if none)
	 */
	shortcode: string | null;

	/**
	 * Text of the post (or null if none)
	 */
	text: string | null;

	/**
	 * Thumbnail URL of the post's media (or null if none)
	 */
	thumbnail_url: string | null;

	/**
	 * Timestamp of the post
	 */
	timestamp: string;

	/**
	 * Username of the post's creator
	 */
	username: string | null;
}

export interface APIPostOwner {
	/**
	 * User ID that created the post
	 */
	id: string;
}

export interface APIQuotaLimit {
	/**
	 * The limit on how many posts or replies can be made
	 */
    quota_usage: number;

	/**
	 * How long the quota limit lasts for
	 */
    quota_duration: number;
}