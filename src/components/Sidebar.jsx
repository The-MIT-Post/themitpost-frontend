import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Sidebar = ({ toggleSidebar }) => {
  const sidebarItemsCount = document.querySelectorAll(".sidebar-item").length;
  const [openStates, setOpenStates] = useState(new Array(sidebarItemsCount).fill(false));

  const toggleItem = (index) => {
    const newStates = [...openStates];
    newStates[index] = !newStates[index];
    setOpenStates(newStates);
  };

  const categories = ["Campus", "Arts & Culture", "Science & Technology", "World", "Media", "FAQ"];

  const years = [2024, 2023, 2022];

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-items-container">
          <ul className="sidebar-items">
            {/* Categories */}
            <li className={`sidebar-item ${openStates[0] ? "ddown-visible" : ""}`}>
              <div className="sidebar-category" onClick={() => toggleItem(0)}>
                Categories &#9662;
              </div>
              <ul className="sidebar-ddown">
                {categories.map((category) => {
                  const params = new URLSearchParams();
                  params.set("category", category);
                  return (
                    <li key={category} className="sidebar-link">
                      <Link to={`/?${params.toString()}`} onClick={() => setIsSidebarOpen(false)}>
                        {category}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            {/* About */}
            <li className={`sidebar-item ${openStates[1] ? "ddown-visible" : ""}`}>
              <div className="sidebar-category" onClick={() => toggleItem(1)}>
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
                  <Link to="/fromTheEditorsDesk">From the Editor's Desk</Link>
                </li>
              </ul>
            </li>

            <li className={`sidebar-item ${openStates[2] ? "ddown-visible" : ""}`}>
              <div className="sidebar-category" onClick={() => toggleItem(2)}>
                Resources &#9662;
              </div>
              <ul className="sidebar-ddown">
                <li className="sidebar-link">
                  <Link to="/notices">Notices (Upcoming)</Link>
                </li>
                <li className="sidebar-link">
                  <a href="/resources/academic_calender.pdf" target="_blank">
                    Academic Calender 25-26
                  </a>
                </li>
                <li className="sidebar-link">
                  <a href="/resources/academic_handbook.pdf" target="_blank">
                    Academic Handbook 25-26
                  </a>
                </li>
                <li className="sidebar-link">
                  <a
                    href="https://teams.microsoft.com/l/channel/19%3ATL33jeLE7fX2AMyd610G_9_LOEWe2fNZ4TBIrHlo8_Q1%40thread.tacv2/General?groupId=ea86aefe-31d7-41c4-ba6b-512594ff6c2a&tenantId=29bebd42-f1ff-4c3d-9688-067e3460dc1f"
                    target="_blank">
                    Manipal OSF
                  </a>
                </li>
                <li className="sidebar-link">
                  <a href="https://mitmpllibportal.manipal.edu/" target="_blank">
                    Library Portal
                  </a>
                </li>
                <li className="sidebar-link">
                  <a href="https://www.manipal.edu/mit.html" target="_blank">
                    MIT Website
                  </a>
                </li>
              </ul>
            </li>

            {/* Newsletters */}
            <li className={`sidebar-item ${openStates[3] ? "ddown-visible" : ""}`}>
              <div className="sidebar-category" onClick={() => toggleItem(3)}>
                Newsletters &#9662;
              </div>
              <ul className="sidebar-ddown">
                <li className="sidebar-link">Weekly Editorials (Upcoming)</li>
                <li className="sidebar-link">Monthly Editorials (Upcoming)</li>
                <li className="sidebar-link">
                  <Link
                    to={`/?category=${encodeURIComponent("Revels")}`}
                    onClick={() => setIsSidebarOpen(false)}>
                    Revels
                  </Link>
                </li>
                <li className="sidebar-link">
                  <Link
                    to={`/?category=${encodeURIComponent("TechTatva")}`}
                    onClick={() => setIsSidebarOpen(false)}>
                    Tech Tatva
                  </Link>
                </li>
              </ul>
            </li>

            {/* Archives */}
            <li className={`sidebar-item ${openStates[4] ? "ddown-visible" : ""}`}>
              <div className="sidebar-category" onClick={() => toggleItem(4)}>
                Archives &#9662;
              </div>
              <ul className="sidebar-ddown">
                {years.map((year) => {
                  const params = new URLSearchParams();
                  params.set("year", year);

                  return (
                    <li key={year}>
                      <Link to={`/?${params.toString()}`} className="sidebar-link">
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
  );
};

export default Sidebar;
