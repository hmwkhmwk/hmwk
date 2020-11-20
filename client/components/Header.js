import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <div className="header">
      <div className="headerLogo">
        <img src="../../public/hmwk_logo_v1.png" alt="hmwk logo" />
      </div>
      <h1>
        <Link to="/home">Ms. Stacy's Math Class</Link>
      </h1>
      <h3>6. Multiplication Homework</h3>
    </div>
  </div>
);

export default Header;
