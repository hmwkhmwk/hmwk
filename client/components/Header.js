import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const hash = useSelector((state) => state.hash);
  return (
    <div>
      <div className="header">
        <img className="logo" src="svg/hmwk_wide_logo.svg" alt="hmwk logo" />
        <div className="headerTitle">
          <h1>
            <Link to="/home">Ms. Stacy's Art Class</Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
