import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SingleSticker } from "./styles-singleHmwk";

function SingleHmwk() {
  const hash = useSelector((state) => state.hash);

  return (
    <div>
      <div className="headerSubtitle">
        <h1>{hash.hmwkTitle}</h1>
      </div>
      <div className="bigCircle">
        <SingleSticker url="stickers/hmwk_banana.png" />
        <div className="bigGrade">A+</div>
      </div>
      <div className="commentSection">
        <h3>Comments:</h3>
        <p>{hash.comment}</p>
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
