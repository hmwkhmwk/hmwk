import React from "react";
import { Link } from "react-router-dom";

function SingleHmwk() {
  return (
    <div>
      <div>
        <h3>Your homework grade: B</h3>
      </div>
      <h3>Comments:</h3>
      <p>
        Good job Tommy! Don't forget to add the minus sign to answers below 0
      </p>
      <div>
        <Link to="/allHmwks">
          <button>See All</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleHmwk;
