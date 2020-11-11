/**
 * monday.com custom trigger subscribe handler
 * @param {Request} req
 * @param {Response} res
 */
async function subscribe(req, res) {
  return res.status(200).send({ webhookId: req.body.payload.subscriptionId });
}

/**
 * monday.com custom trigger unsubscribe handler
 * @param {Request} req
 * @param {Response} res
 */
async function unsubscribe(req, res) {
  return res.sendStatus(200);
}

module.exports = {
  subscribe,
  unsubscribe,
};
