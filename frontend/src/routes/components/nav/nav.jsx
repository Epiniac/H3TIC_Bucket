import React from "react";
import "./nav.css";

export const Navbar = () => {
  return (
    <div>
      <div id="main-navbar" className="navbar">
        <a className="title" href="/">
          <h3>H3TIC BUCKET</h3>
        </a>
        <nav className="navigation">
          <ul>
            <li>
              <a className="button" href="/connexion">SIGN IN</a>
            </li>
            <li>
              <a className="button" href="/register">SIGN UP</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};