/**
 * monday.com custom trigger subscribe handler
 * @param {Request} req
 * @param {Response} res
 */
async function track(req, res) {
  return res.status(200).send({ webhookId: req.body.payload.subscriptionId });
}

/**
 * monday.com custom trigger unsubscribe handler
 * @param {Request} req
 * @param {Response} res
 */

module.exports = {
  track,
};
