import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SingleHmwk() {
  const hash = useSelector((state) => state.hash);

  return (
    <div>
      <div className="headerSubtitle">
        {/* <h1>{hash.hmwkTitle}</h1> */}
        <h1>Draw your favorite animal!</h1>
      </div>
      <img className="sticker" src="./stickers/hmwk_banana.png" alt="Sticker" />
      <div className="commentSection">
        <h3>Comments:</h3>
        {/* <p>{hash.comment}</p> */}
        <p>
          {" "}
          Good work! Loved your submission I hope you also love the banana
          sticker I'm sending you :)
        </p>
      </div>
      <div>
        <Link to="/allHmwks">
          <button type="button" className="buttonWhite">
            <img src="./svg/home.svg" alt="Upload icon" />
            See All Hmwk
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleHmwk;
