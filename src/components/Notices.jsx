// components/Notices.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RotatingCircle from "./RotatingCircle";
import BackButton from "./BackButton";

const AboutUs = () => {
  return (
    <>
      <RotatingCircle />
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        Notices (Coming soon!)
      </h1>

      <BackButton />

      {/* <div className="app-container">
        <h2>Notices (Coming soon!)</h2>
      </div>
      <div className="page-container">
       
      </div>
      <Footer /> */}
    </>
  );
};

export default AboutUs;
