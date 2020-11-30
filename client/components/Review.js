import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Review() {
  const hash = useSelector((state) => state.hash);

  return (
    <div id="body">
      <div className="headerSubtitle">
        <h1>{hash.hmwkTitle}</h1>
      </div>
      <div className="greeting">
        <img
          className="sticker"
          src="./stickers/hmwk_grape.png"
          alt="Sticker"
        />
      </div>
      <div className="prompt">
        <h1> Well done {hash.name}! </h1>
        <h3> You submitted your homework</h3>
      </div>

      {/* Here we will post the preview image(s) of the hmwk submission
      <div className="imagePreview"></div> */}

      <Link to="/home">
        <button type="button" className="buttonCTA">
          Change it
        </button>
      </Link>
      <Link to="/allHmwks">
        <button type="button" className="buttonWhite">
          <img src="./svg/home.svg" alt="Upload icon" />
          See All Hmwk
        </button>
      </Link>
    </div>
  );
}

export default Review;
