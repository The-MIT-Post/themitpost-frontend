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
          <li className="category">About Us</li>
          <li className="category">
            <Link to="/board">The Board of 2025-26</Link>
          </li>
          <li className="category">From the Editor's Desk</li>
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
          <li className="category">MIT Information Brochure</li>
          <li className="category">Academic Calendar</li>
          <li className="category">All Branches Syllabus</li>
          <li className="category">CGPA Conversion Factor</li>
        </ul>
      </section>
    </nav>
  );
};

export default DabbaRight;
