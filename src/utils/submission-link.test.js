const { expect } = require("chai");
const { generateSubmissionLink } = require("./submission-link");

test("submission link smoke test", () => {
  expect(true).equal(true);
});

test("submission link is generated with a fixed prefix", () => {
  // GIVEN
  const host = "https://www.hmwk.herokuapp.com";
  const endPoint = "submission";
  const submissionLinkPrefix = `${host}/${endPoint}?token=`;

  // WHEN
  const submissionLink = generateSubmissionLink(host, endPoint);

  // THEN
  expect(submissionLink.startsWith(submissionLinkPrefix)).equal(true);
});
