import React from "react";
import { Link } from "react-router-dom";
import "./CSILogo.css";

interface CSILogoProps {
  className?: string;
  alt?: string;
}

const CSILogo: React.FC<CSILogoProps> = ({
  className = "",
  alt = "Computer Society of India logo",
}) => {
  return (
    <div>
      <Link
        to="/"
        className={`csi-logo ${className}`}
        aria-label="Computer Society of India"
      >
        {/* Only show the official logo image in the navbar */}
        <img
          src="/csi-official.png"
          alt={alt}
          className="csi-logo-img navbar-only"
        />

        <span>Computer Society of India - CIT </span>
      </Link>
    </div>
  );
};

export default CSILogo;
