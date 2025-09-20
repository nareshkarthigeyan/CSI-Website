import React from 'react';
import { Link } from 'react-router-dom';
import './CSILogo.css';

interface CSILogoProps {
  className?: string;
}

const CSILogo: React.FC<CSILogoProps> = ({ className = '' }) => {
  return (
    <Link to="/" className={`csi-logo ${className}`}>
      <div className="csi-logo-icon">
        CSI
      </div>
      <div>
        <span className="csi-logo-text">CSI</span>
        <span className="csi-logo-year">2025</span>
      </div>
    </Link>
  );
};

export default CSILogo;