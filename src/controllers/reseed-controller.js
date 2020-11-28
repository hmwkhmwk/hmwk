const { newDB, RESEED_PATH_PREFIX } = require("../db");

/**
 * The ReseedController class contains the HTTP handlers for reseed subscriptions.
 * It interacts with JsonDB, a flat-file database, to persist
 * (subscriptionId, webhookUrl, hmwkAssignmentsId, studentsId, hmwkCompletionTrackingId) values.
 */
class ReseedController {
  constructor(db = null) {
    if (db === null) {
      db = newDB();
    }
    this._db = db;
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  // monday.com custom trigger subscribe handler
  async subscribe(req, res, next) {
    try {
      // Unmarshal.
      const { subscriptionId, webhookUrl, inputFields } = req.body.payload;
      const {
        hmwkAssignmentsId,
        studentsId,
        hmwkCompletionTrackingId,
      } = inputFields;

      // Persist.
      const value = {
        webhookUrl,
        hmwkAssignmentsId,
        studentsId,
        hmwkCompletionTrackingId,
      };
      await this._db.push(`${RESEED_PATH_PREFIX}/${subscriptionId}`, value);

      // webhookId is treated as the same as subscriptionId.
      return res.status(200).send({ webhookId: subscriptionId });
    } catch (err) {
      next(err);
    }
  }

  // monday.com custom trigger unsubscribe handler
  async unsubscribe(req, res) {
    try {
      // webhookId is treated as the same as subscriptionId.
      const { webhookId } = req.body.payload;
      await this._db.delete(`${RESEED_PATH_PREFIX}/${webhookId}`);
    } catch (err) {
      next(err);
    }
    return res.sendStatus(200);
  }
}

module.exports = ReseedController;
