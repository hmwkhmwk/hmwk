import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getHmwkTrackingDataThunk } from "../store/hash";

function Home() {
  console.log(window.location.href);
  const url = window.location.href;
  console.log("url", url);
  const token = new URLSearchParams(url.split("?")[1].split("#")[0]).get(
    "token"
  );
  console.log("token", token);

  const hash = useSelector((state) => state.hash);
  const dispatch = useDispatch();
  const loadHmwkTrackingData = () => {
    dispatch(getHmwkTrackingDataThunk(token));
  };

  useEffect(() => {
    loadHmwkTrackingData(token);
  }, []);

  const upload = () => {
    console.log("upload/take photo homework");
  };

  return (
    <div id="home">
      <div className="greeting">
        <h2> Hi {hash.name} </h2>
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
