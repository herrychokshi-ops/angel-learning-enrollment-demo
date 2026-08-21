import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function Header() {
  const { resetDemo } = useEnrollment();

  return (
    <header className="topbar">
      <a
        href="#home"
        className="brand"
        data-nav="home"
        aria-label="Angel Learning Center"
      >
        <img
          className="brand-logo"
          src="assets/logo.png"
          alt="Angel Learning Center"
        />
      </a>
      <nav className="top-nav">
        <a href="#home" data-nav="home">Home</a>
        <a href="#packet" data-nav="packet">Forms</a>
        <a href="#staff" data-nav="staff">Staff</a>
        <a href="mockups.html">Email flow</a>
        <button type="button" className="btn btn-ghost" id="resetDemo" onClick={resetDemo}>
          Reset packet
        </button>
      </nav>
    </header>
  );
}

export default Header;
