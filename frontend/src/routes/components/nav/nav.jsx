import React from "react";
import "./nav.css";

export const Navbar = () => {
  return (
    <div>
      <div id="main-navbar" className="navbar">
        <h2 className="title">HETIC</h2>
        <nav className="navigation">
          <ul>
            <li>
              <a href="/home">Sign In</a>
            </li>
            <li>
              <a href="/home">Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};