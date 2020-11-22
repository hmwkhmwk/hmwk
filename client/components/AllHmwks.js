import React from "react";
import HeaderAllHmwks from "./HeaderAllHmwks";

function AllHmwks() {
  const toSingleHmwk = () => {
    console.log(
      "toSingleHmwk() should take in hmwk id and student info as arguments"
    );
  };

  return (
    <div>
      <div>
        <h3>Hi Tommy!</h3>
      </div>
      {/* should be using allHmwks.map() to render components later on after connecting the components with the store */}
      <button type="button" onClick={() => toSingleHmwk()}>
        Homework 1
      </button>
      <button type="button" onClick={() => toSingleHmwk()}>
        Homework 2
      </button>
      <button type="button" onClick={() => toSingleHmwk()}>
        Homework 3
      </button>
      <button type="button" onClick={() => toSingleHmwk()}>
        Homework 4
      </button>
    </div>
  );
}

export default AllHmwks;
