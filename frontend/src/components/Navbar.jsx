import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const navLinkClass = ({ isActive }) =>
  "block px-3 py-2 rounded hover:bg-gray-200 " + (isActive ? "bg-gray-300 font-semibold" : "");

function Navbar() {
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          JobPortal
        </Link>
        <div className="hidden md:flex items-center space-x-2">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
          <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
          <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          {!token && <NavLink to="/login" className={navLinkClass}>Login</NavLink>}
          {token && (
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
        <button
          className="md:hidden block text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/jobs" className={navLinkClass} onClick={() => setMenuOpen(false)}>Jobs</NavLink>
          <NavLink to="/profile" className={navLinkClass} onClick={() => setMenuOpen(false)}>Profile</NavLink>
          <NavLink to="/admin" className={navLinkClass} onClick={() => setMenuOpen(false)}>Admin</NavLink>
          {!token && <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>Login</NavLink>}
          {token && (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
