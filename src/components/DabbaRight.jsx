// components/DabbaRight.js
import React from "react";
import { Link } from "react-router-dom";
import "./Dabba.css";

const DabbaRight = () => {
  return (
    <nav className="dabba dabba-right">
      <section className="dabba-content">
        <h2>About</h2>
        <ul>
          <li className="category">
            <Link to="/aboutUs">About Us</Link>
          </li>
          <li className="category">
            <Link to="/board">The Board of 2025-26</Link>
          </li>
          <li className="category">
            <Link to="/fromTheEditorsDesk">From the Editor's Desk</Link>
          </li>
        </ul>
      </section>
      <section className="social-media">
        <a
          className="icon instagram"
          target="_blank"
          href="https://www.instagram.com/mit.post/?next=%2F&hl=en"
        ></a>
        <a
          className="icon linkedin"
          target="_blank"
          href="https://www.linkedin.com/company/themitpost/"
        ></a>
        <a
          className="icon spotify"
          target="_blank"
          href="https://open.spotify.com/user/lu00lx0xzwbjohh4ye9h4nfsz?si=1c6dc1763fa94dfa"
        ></a>
        <a
          className="icon facebook"
          target="_blank"
          href="https://www.facebook.com/themitpost/"
        ></a>
      </section>

      <section className="dabba-content">
        <h2>Resources</h2>
        <ul>
          <li className="category">
            <Link to="/notices">Notices (Upcoming)</Link>
          </li>
          <li className="category">
            <a href="/resources/academic_calender.pdf" target="_blank">
              Academic Calender 25-26
            </a>
          </li>
          <li className="category">
            <a href="/resources/academic_handbook.pdf" target="_blank">
              Academic Handbook 25-26
            </a>
          </li>
          <li className="category">
            <a
              href="https://teams.microsoft.com/l/channel/19%3ATL33jeLE7fX2AMyd610G_9_LOEWe2fNZ4TBIrHlo8_Q1%40thread.tacv2/General?groupId=ea86aefe-31d7-41c4-ba6b-512594ff6c2a&tenantId=29bebd42-f1ff-4c3d-9688-067e3460dc1f"
              target="_blank"
            >
              Manipal OSF
            </a>
          </li>
          <li className="category">
            <a href="https://mitmpllibportal.manipal.edu/" target="_blank">
              Library Portal
            </a>
          </li>
          <li className="category">
            <a href="https://www.manipal.edu/mit.html" target="_blank">
              MIT Website
            </a>
          </li>
        </ul>
      </section>
    </nav>
  );
};

export default DabbaRight;
