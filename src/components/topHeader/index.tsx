import React from "react";
import Image from "next/image";
import "./styles.css";

const TopHeader = () => {
  return (
    <nav className="navbar bg-green">
      <a className="navbar-brand" href="/">
        <Image
          src="/positival-logo.svg"
          width="200"
          height="65"
          alt="Positival brand logo"
        />
      </a>
    </nav>
  );
};

export default TopHeader;
