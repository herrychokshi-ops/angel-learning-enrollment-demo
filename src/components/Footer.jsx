import React from "react";
import { useEnrollment } from "../context/EnrollmentContext";

export function Footer() {
  const { activeLocation } = useEnrollment();

  const name = activeLocation?.legalName || activeLocation?.name || "Angel Learning Center · multi-location";
  const contact = activeLocation?.address
    ? `${activeLocation.address} · ${activeLocation.phone}${activeLocation.hours ? " · " + activeLocation.hours : ""}`
    : "Select a center to show address · phone · hours";

  return (
    <footer className="site-footer">
      <img src="assets/logo.png" alt="" />
      <div id="footerName">{name}</div>
      <div id="footerContact">{contact}</div>
    </footer>
  );
}

export default Footer;
