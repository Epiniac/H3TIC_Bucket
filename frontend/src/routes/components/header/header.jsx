import React from "react";
import { Navbar } from "../nav/nav";
import "./header.css";
export const Header = () => {
  return (
    <div className="header">
      <Navbar />
      <div className="main">
        <p className="title">Welcome to our website</p>
        <p className="text">H3TIC BUCKET is a cloud storage and file-sharing solution designed specifically for the French market, and it offers several benefits that can make it more appealing than Amazon S3 or WeTransfer.</p>
        <a className="button" href="/connexion">GET STARTED</a>
      </div>
    </div>

  );
};
