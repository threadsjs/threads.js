'use strict';

const Base = require('./Base');

/**
 * Represents Threads reply quota limits.
 * @extends {Base}
 */
class ReplyQuota extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The usage limit
     * @type {number}
    */
    this.usage = data.reply_quota_usage;

    /**
     * The usage limit
     * @type {APIQuotaLimit}
    */
    this.config = data.reply_config
  }
}

module.exports = ReplyQuota;