import React from "react";
// import logo from "";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <div className="header">
      <img className="logo" src="hmwk_logo.png" alt="hmwk logo" />
      <div className="headerTitle">
        <h1>
          <Link to="/home">Ms. Stacy's Math Class</Link>
        </h1>
      </div>
      <div className="headerSubtitle">
        <h3>6. Multiplication Homework</h3>
      </div>
    </div>
  </div>
);

export default Header;
