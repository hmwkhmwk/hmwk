import React from "react";

const Body = () => (
  <div id="body">
    <div className="greeting">
      <h2> Hi Tommy! </h2>
    </div>
    <div className="prompt">
      <h3> Are you ready to share?</h3>
    </div>
    <div className="submitButton">
      <p>Upload</p>
    </div>
  </div>
);

export default Body;

// Body component will be renamed to Home.js
// Another component called Body.js will be the router of
// what renders on the body section at each point of the user journey.
