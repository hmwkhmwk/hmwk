import React from "react";
import { Link } from "react-router-dom";

function Review() {
  return (
    <div id="body">
      <div className="greeting">
        <img
          src="https://content.mycutegraphics.com/graphics/star/yellow-rounded-corner-star.png"
          alt="hmwk star"
        />
      </div>
      <div className="prompt">
        <h1> Well done Tommy! </h1>
        <h3> You submitted your homework</h3>
      </div>
      <div className="imagePreview">
        {/* Here we will post the preview image(s) of the hmwk submission */}
      </div>
      <Link to="/upload">
        <button
          type="button"
          className="buttonCTA"
          onClick={() => changeHwmk()}
        >
          Change it
        </button>
      </Link>
      <Link to="/allHmwks">
        <div className="cornerButton">See All</div>
      </Link>
    </div>
  );
}

export default Review;
