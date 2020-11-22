import React from "react";
import { Link } from "react-router-dom";
import HeaderAllHmwks from "./HeaderAllHmwks";

function AllHmwks() {
  const toSingleHmwk = () => {};

  return (
    <div>
      <div>
        <h3>Hi Tommy!</h3>
      </div>
      {/* should be using allHmwks.map() to render components later on after connecting the components with the store */}

      <Link to="/singleHmwk">
        <button>Homework 1</button>
      </Link>
      <Link to="/singleHmwk">
        <button>Homework 2</button>
      </Link>
      <Link to="/singleHmwk">
        <button>Homework 3</button>
      </Link>
      <Link to="/singleHmwk">
        <button>Homework 4</button>
      </Link>
    </div>
  );
}

export default AllHmwks;
