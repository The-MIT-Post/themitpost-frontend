import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RotatingCircle from "./RotatingCircle";
import BackButton from "./BackButton";
import "./Notices.css";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const savedNotices = localStorage.getItem("uploadedFiles");
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    }
  }, []);

  return (
    <>
      <RotatingCircle />
      <Navbar />
      <div className="notices-container">
        <h1>Notices</h1>

        {notices.length === 0 ? (
          <p>No notices yet</p>
        ) : (
          <ul className="notices-list">
            {notices.map((notice, index) => (
              <li key={index} className="notice-item">
                <a href={notice.data} target="_blank">
                  {notice.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <BackButton />
      <Footer />
    </>
  );
};

export default Notices;
