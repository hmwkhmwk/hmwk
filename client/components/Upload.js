import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Upload() {
  return (
    <div id="body">
      <div className="imagePreview">
        <img
          className="imagePreview"
          src="hmwk_logo.png"
          alt="Your homework preview"
        />
      </div>
      <div>
        <Link to="/upload">
          <button type="button" className="addMore">
            Add More
          </button>
        </Link>
      </div>
      {/* <div>
        <Link to="/review">
          <button type="button" className="buttonCTA">
            Submit
          </button>
        </Link>
      </div> */}
    </div>
  );
}

export default Upload;
