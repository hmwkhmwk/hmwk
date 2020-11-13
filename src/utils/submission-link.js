// import Sha1 from './sha1.js'
const Sha1 = require("./sha1.js");

function generateSubmissionLink(host, endPoint) {
  // E.g.
  // `host` => https://www.hmwk.herokuapp.com
  // `endPoint` => /submission
  // `submissionLink` => https://www.hmwk.herokuapp.com/submission?token=xxxxx
  const maskedRandomString = generateMaskedRandomString();
  const submissionLink = `${host}/${endPoint}?token=${maskedRandomString}`;
  return submissionLink;
}

function generateMaskedRandomString() {
  const base = 36;
  const randomString =
    Math.random().toString(base).substring(2, 15) +
    Math.random().toString(base).substring(2, 15);
  return Sha1.hash(randomString);
}

module.exports = {
  generateSubmissionLink,
};
