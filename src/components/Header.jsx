import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      
      {/* LOGO IMAGE */}
      <div className="logo">
        <img
          src="/images/ryzen.png"
          alt="RyZenSports Logo"
          className="logo-img"
        />
      </div>

      <nav>
        <Link to="/admin" className="admin-link">
          <i className="bi bi-person-circle"></i>
        </Link>
      </nav>

    </header>
  );
};

export default Header;
