import React from "react";
import { Link } from "react-router-dom";
import AllHmwks from "./AllHmwks";

const Home = () => (
  <div id="home">
    <div className="greeting">
      <h2> Hi Tommy! </h2>
    </div>
    <div className="prompt">
      <h3> Are you ready to share?</h3>
    </div>
    <div className="submitButton">
      <p>Upload</p>
    </div>
    <Link to="/allHmwks" component={AllHmwks}>
      All Hmwks
    </Link>
  </div>
);

export default Home;
