import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>RyZenSports</h1>
      </div>
      <nav>
        <Link to="/admin" className="admin-link">Admin Login</Link>
      </nav>
    </header>
  );
};

export default Header;
