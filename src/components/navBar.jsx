import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Main Page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/information">Information</Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
