import React from "react";
import { useSelector } from "react-redux";

function Home() {
  const hash = useSelector((state) => state.hash);

  const upload = () => {
    console.log("upload/take photo homework");
  };

  return (
    <div id="home">
      <div className="headerSubtitle">
        <h1>{hash.hmwkTitle}</h1>
      </div>
      <div className="greeting">
        <h2> Hi {hash.studentName} </h2>
      </div>
      <div className="prompt">
        <h3> Are you ready to share?</h3>
      </div>
      <button type="button" className="submitButton" onClick={() => upload()}>
        Upload
      </button>
      <h4> Submit by {hash.dueDate} </h4>
    </div>
  );
}

export default Home;
