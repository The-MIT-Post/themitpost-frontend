import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const categories = [
    "Campus",
    "Arts & Culture",
    "Science & Technology",
    "World",
    "Media",
    "FAQ",
  ];

  const years = [2024, 2023, 2022];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsSidebarOpen(false);
  };

  const sidebarItemsCount = document.querySelectorAll(".sidebar-item").length;
  const [openStates, setOpenStates] = useState(
    new Array(sidebarItemsCount).fill(false)
  );

  const toggleItem = (index) => {
    const newStates = [...openStates];
    newStates[index] = !newStates[index];
    setOpenStates(newStates);
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
              className={`hamburger ${isSidebarOpen ? "hamburger-open" : ""}`}
            >
              <path
                className="hamburger-line hamburger-line-top"
                d="M 20,30 H 80"
              />
              <path
                className="hamburger-line hamburger-line-middle"
                d="M 20,50 H 80"
              />
              <path
                className="hamburger-line hamburger-line-bottom"
                d="M 20,70 H 80"
              />
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
                <button className="search-btn" onClick={toggleSearch}>
                  {/* Search SVG */}
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 0 122.879 119.799"
                  >
                    <g>
                      <path
                        d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </button>

                <div className={`search-column ${isSearchOpen ? "open" : ""}`}>
                  <input
                    type="text"
                    placeholder="Search Article..."
                    className="search-input"
                  />
                  <button className="submit-btn">→</button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          <div className="sidebar">
            <div className="sidebar-items-container">
              <ul className="sidebar-items">
                {/* Categories */}
                <li
                  className={`sidebar-item ${
                    openStates[0] ? "ddown-visible" : ""
                  }`}
                >
                  <div
                    className="sidebar-category"
                    onClick={() => toggleItem(0)}
                  >
                    Categories &#9662;
                  </div>
                  <ul className="sidebar-ddown">
                    {categories.map((category) => {
                      const params = new URLSearchParams();
                      params.set("category", category);
                      return (
                        <li key={category} className="sidebar-link">
                          <Link
                            to={`/?${params.toString()}`}
                            onClick={() => setIsSidebarOpen(false)}
                          >
                            {category}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                {/* About */}
                <li
                  className={`sidebar-item ${
                    openStates[1] ? "ddown-visible" : ""
                  }`}
                >
                  <div
                    className="sidebar-category"
                    onClick={() => toggleItem(1)}
                  >
                    About &#9662;
                  </div>
                  <ul className="sidebar-ddown">
                    <li className="sidebar-link">
                      <Link to="/aboutUs">About Us</Link>
                    </li>
                    <li className="sidebar-link">
                      <Link to="/board">The Board of 2025-26</Link>
                    </li>
                    <li className="sidebar-link">
                      <Link to="/fromTheEditorsDesk">
                        From the Editor's Desk
                      </Link>
                    </li>
                  </ul>
                </li>

                <li
                  className={`sidebar-item ${
                    openStates[2] ? "ddown-visible" : ""
                  }`}
                >
                  <div
                    className="sidebar-category"
                    onClick={() => toggleItem(2)}
                  >
                    Resources &#9662;
                  </div>
                  <ul className="sidebar-ddown">
                    <li className="sidebar-link">
                      <Link to="/notices">Notices (Upcoming)</Link>
                    </li>
                    <li className="sidebar-link">
                      <a
                        href="/resources/academic_calender.pdf"
                        target="_blank"
                      >
                        Academic Calender 25-26
                      </a>
                    </li>
                    <li className="sidebar-link">
                      <a
                        href="/resources/academic_handbook.pdf"
                        target="_blank"
                      >
                        Academic Handbook 25-26
                      </a>
                    </li>
                    <li className="sidebar-link">
                      <a
                        href="https://teams.microsoft.com/l/channel/19%3ATL33jeLE7fX2AMyd610G_9_LOEWe2fNZ4TBIrHlo8_Q1%40thread.tacv2/General?groupId=ea86aefe-31d7-41c4-ba6b-512594ff6c2a&tenantId=29bebd42-f1ff-4c3d-9688-067e3460dc1f"
                        target="_blank"
                      >
                        Manipal OSF
                      </a>
                    </li>
                    <li className="sidebar-link">
                      <a
                        href="https://mitmpllibportal.manipal.edu/"
                        target="_blank"
                      >
                        Library Portal
                      </a>
                    </li>
                    <li className="sidebar-link">
                      <a
                        href="https://www.manipal.edu/mit.html"
                        target="_blank"
                      >
                        MIT Website
                      </a>
                    </li>
                  </ul>
                </li>

                {/* Newsletters */}
                <li
                  className={`sidebar-item ${
                    openStates[3] ? "ddown-visible" : ""
                  }`}
                >
                  <div
                    className="sidebar-category"
                    onClick={() => toggleItem(3)}
                  >
                    Newsletters &#9662;
                  </div>
                  <ul className="sidebar-ddown">
                    <li className="sidebar-link">
                      Weekly Editorials (Upcoming)
                    </li>
                    <li className="sidebar-link">
                      Monthly Editorials (Upcoming)
                    </li>
                    <li className="sidebar-link">
                      <Link
                        to={`/?category=${encodeURIComponent("Revels")}`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        Revels
                      </Link>
                    </li>
                    <li className="sidebar-link">
                      <Link
                        to={`/?category=${encodeURIComponent("TechTatva")}`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        Tech Tatva
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Archives */}
                <li
                  className={`sidebar-item ${
                    openStates[4] ? "ddown-visible" : ""
                  }`}
                >
                  <div
                    className="sidebar-category"
                    onClick={() => toggleItem(4)}
                  >
                    Archives &#9662;
                  </div>
                  <ul className="sidebar-ddown">
                    {years.map((year) => {
                      const params = new URLSearchParams();
                      params.set("year", year);

                      return (
                        <li key={year}>
                          <Link
                            to={`/?${params.toString()}`}
                            className="sidebar-link"
                          >
                            {year}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="darken-bg" onClick={toggleSidebar}></div>
        </>
      )}
    </>
  );
};

export default Navbar;
