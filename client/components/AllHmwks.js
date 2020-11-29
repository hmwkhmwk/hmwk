import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import HeaderAllHmwks from "./HeaderAllHmwks";

function AllHmwks() {
  const hash = useSelector((state) => state.hash);

  const toSingleHmwk = () => {};

  return (
    <div>
      <div>
        <h1>Hi {hash.studentName}!</h1>
        <h3> Here you can access all your homework submissions thus far!</h3>
        <h3> If you can't find it, you can try "Accio!" on it! :D</h3>
      </div>
      {/* should be using allHmwks.map() to render components later on after 
      connecting the components with the store */}

      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_apple.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_banana.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_pear.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_orange.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_peach.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_blueberry.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_kiwi.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_lemon.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
      <Link to="/singleHmwk">
        <button className="buttonCTA">
          <img
            className="sticker"
            src="./stickers/hmwk_pineapple.png"
            alt="Upload Sticker"
            width="80"
            height="80"
          />
        </button>
      </Link>
    </div>
  );
}

export default AllHmwks;
