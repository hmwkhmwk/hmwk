// In the future, we might want a navbar so students can access their grading history
// To access that data, they would need to add their personal unique code (like a studentId)

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    <h1>HMWK</h1>
    <nav>
      <div>
        <Link to="/home">Home</Link>
      </div>
    </nav>
    <hr />
  </div>
);
