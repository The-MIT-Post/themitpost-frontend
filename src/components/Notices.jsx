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

  const formatNoticeName = (name) => {
    const nameWithoutExt = name.replace(/\.[^/.]+$/, "");
    return nameWithoutExt.replace(/-/g, " ");
  };

  return (
    <>
      <RotatingCircle />
      <Navbar />
      <div className="notices-container">
        <h1>Notices</h1>

        {notices.length === 0 ? (
          <p>No notices yet</p>
        ) : (
          <div className="notices-list">
            {notices.map((notice, index) => (
              <div key={index} className="notice-item">
                <h4>{formatNoticeName(notice.name)}</h4>
                <iframe
                  src={`${notice.data}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={notice.name}
                  style={{
                    border: "1px solid #000000ff",
                    borderRadius: "0.2rem",
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <BackButton />
      <Footer />
    </>
  );
};

export default Notices;
