import React from "react";

const Review = () => (
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
    <div className="buttonCTA">
      <p>Change it</p>
    </div>
    <div className="cornerButton">See All</div>
  </div>
);

export default Review;
