import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <div className="header">
      <h1>
        <Link to="/home">Ms. Stacy's Math Class</Link>
      </h1>
      <h3>6. Multiplication Homework</h3>
    </div>
  </div>
);

export default Header;
