const querystring = require("querystring");
const monday = require("monday-sdk-js")();

const jwt = require("jsonwebtoken");

const { newDB, OAUTH_PATH_PREFIX } = require("../db");

const db = newDB();

const authorize = (req, res) => {
  const { token } = req.query;
  return res.redirect(
    "https://auth.monday.com/oauth2/authorize?" +
      querystring.stringify({
        client_id: process.env.CLIENT_ID,
        state: token,
      })
  );
};

const callback = async (req, res) => {
  const { code, state } = req.query;
  const { userId, backToUrl } = jwt.verify(state, process.env.CLIENT_SECRET);

  // Get access token
  const token = await monday.oauthToken(
    code,
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );

  console.log(`Storing userId: ${userId} => token: "${token}"`);
  await db.push(`${OAUTH_PATH_PREFIX}/${userId}`, { token });

  // Redirect back to monday
  return res.redirect(backToUrl);
};

module.exports = {
  authorize,
  callback,
};
