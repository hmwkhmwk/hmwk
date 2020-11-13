// Common JsonDB path prefix.
const PATH_PREFIX = "/subscriptions";

/**
 * The ReseedController class contains the HTTP handlers for reseed subscriptions.
 * It interacts with JsonDB, a flat-file database, to persist
 * (subscriptionId, webhookUrl) values.
 */
class ReseedController {
  constructor(db) {
    this._db = db;
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  // monday.com custom trigger subscribe handler
  async subscribe(req, res, next) {
    const { subscriptionId, webhookUrl } = req.body.payload;

    try {
      this._db.push(`${PATH_PREFIX}/${subscriptionId}`, webhookUrl);
    } catch (err) {
      next(err);
    }

    // webhookId is treated as the same as subscriptionId.
    return res.status(200).send({ webhookId: subscriptionId });
  }

  // monday.com custom trigger unsubscribe handler
  async unsubscribe(req, res) {
    // webhookId is treated as the same as subscriptionId.
    const { webhookId } = req.body.payload;

    try {
      this._db.delete(`${PATH_PREFIX}/${webhookId}`);
    } catch (err) {
      next(err);
    }
    return res.sendStatus(200);
  }
}

module.exports = ReseedController;
