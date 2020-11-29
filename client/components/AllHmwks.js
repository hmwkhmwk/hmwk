import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Sticker } from "./styles-allHmwk";
function AllHmwks() {
  const hash = useSelector((state) => state.hash);

  const toSingleHmwk = () => {};

  return (
    <div className="subheaderAllHmwk">
      <h1>My Homework</h1>

      {/* should be using allHmwks.map() to render components later on after 
      connecting the components with the store */}

      <div className="stickersRow">
        {/* Sticker from hmwk #1 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_apple.png" />
          </div>
        </Link>
        {/* Sticker from hmwk #2 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_banana.png" />
          </div>
        </Link>
        {/* Sticker from hmwk #3 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_pear.png" />
          </div>
        </Link>
      </div>

      <div className="stickersRow">
        {/* Sticker from hmwk #4 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_cherry.png" />
          </div>
        </Link>
        {/* Sticker from hmwk #5 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_blueberry.png" />
          </div>
        </Link>
        {/* Sticker from hmwk #6 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_kiwi.png" />
          </div>
        </Link>
      </div>

      <div className="stickersRow">
        {/* Sticker from hmwk #7 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_pineapple.png" />
          </div>
        </Link>
        {/* Sticker from hmwk #8 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_melon.png" />
          </div>
        </Link>
        {/* Sticker from hmwk #9 */}
        <Link to="/singleHmwk">
          <div className="circle">
            <Sticker url="stickers/hmwk_grape.png" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AllHmwks;
