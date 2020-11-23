import React from "react";

function Home() {
  const upload = () => {
    console.log("upload/take photo homework");
  };

  return (
    <div id="home">
      <div className="greeting">
        <h2> Hi Tommy! </h2>
      </div>
      <div className="prompt">
        <h3> Are you ready to share?</h3>
      </div>
      <button type="button" className="submitButton" onClick={() => upload()}>
        Upload
      </button>
    </div>
  );
}

export default Home;
