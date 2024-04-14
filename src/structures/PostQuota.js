'use strict';

const Base = require('./Base');

/**
 * Represents Threads post quota limits.
 * @extends {Base}
 */
class PostQuota extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The usage limit
     * @type {number}
    */
    this.usage = data.quota_usage;

    /**
     * The usage limit
     * @type {APIQuotaLimit}
    */
    this.config = data.config
  }
}

module.exports = PostQuota;