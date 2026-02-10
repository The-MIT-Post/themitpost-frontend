import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RotatingCircle from "./RotatingCircle";
import BackButton from "../components/BackButton";
import "./Notices.css";

const Notices = () => {
  const [notices, setNotices] = useState([]);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    const noticeFiles = import.meta.glob("/public/notices/*.pdf", {
      eager: true,
      as: "url",
    });

    const noticesArray = Object.keys(noticeFiles).map((path) => {
      const fileName = path.split("/").pop();
      return {
        name: fileName,
        url: noticeFiles[path],
      };
    });

    noticesArray.sort((a, b) => {
      const extractDate = (name) => {
        const match = name.match(/(\d{2})-(\d{2})-(\d{4})/);
        if (!match) return new Date(0);

        const [, dd, mm, yyyy] = match;
        return new Date(`${yyyy}-${mm}-${dd}`);
      };

      return extractDate(b.name) - extractDate(a.name);
    });

    setNotices(noticesArray);
  }, []);

  const formatNoticeName = (name) =>
    name
      .replace(/\.[^/.]+$/, "")
      .replace(/-\d{2}-\d{2}-\d{4}$/, "")
      .replace(/-/g, " ");

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
                {isMobile ? (
                  <a href={notice.url} target="_blank" className="mobile-notice-link">
                    {formatNoticeName(notice.name)}
                  </a>
                ) : (
                  <>
                    <h4>{formatNoticeName(notice.name)}</h4>
                    <iframe
                      src={`${notice.url}#view=FitH&navpanes=0`}
                      title={notice.name}
                      style={{
                        border: "1px solid black",
                        borderRadius: "0.2rem",
                        width: "100%",
                        height: "600px",
                      }}
                    />
                  </>
                )}
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
