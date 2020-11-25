import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HeaderAllHmwks from "./HeaderAllHmwks";

function SingleHmwk() {
  const hash = useSelector((state) => state.hash);

  return (
    <div>
      <div className="headerSubtitle">
        <h1>{hash.hmwkTitle}</h1>
      </div>
      <div>
        <h3>Your homework grade: {hash.grade}</h3>
      </div>
      <h3>Comments:</h3>
      <p>{hash.comment}</p>
      <div>
        <Link to="/allHmwks">
          <button className="buttonCTA">See All</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleHmwk;
