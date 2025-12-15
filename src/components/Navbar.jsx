import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import Sidebar from "./Sidebar";
import Search from "./Search";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-links">
          <button onClick={toggleSidebar} className="hamburger-btn">
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              className={`hamburger ${isSidebarOpen ? "hamburger-open" : ""}`}>
              <path className="hamburger-line hamburger-line-top" d="M 20,30 H 80" />
              <path className="hamburger-line hamburger-line-middle" d="M 20,50 H 80" />
              <path className="hamburger-line hamburger-line-bottom" d="M 20,70 H 80" />
            </svg>
          </button>
        </div>

        <div className="navbar-brand">
          <Link to="/" className="navbar-brand-link">
            <img src="/mit-post-logo-new.png" alt="The MIT Post" />
          </Link>
        </div>

        <ul className="navbar-links">
          <li>
            {currentUser ? (
              <Link to="/admin/new" className="navbar-link">
                Admin Dashboard
              </Link>
            ) : (
              <div className="search-wrapper">
                <Search toggleSearch={toggleSearch} isSearchOpen={isSearchOpen} />
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
    </>
  );
};

export default Navbar;
