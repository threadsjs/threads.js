export abstract class Base {
    public valueOf(): string;
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