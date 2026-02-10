// components/BoardPage.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RotatingCircle from "./RotatingCircle";
import BoardMembers from "./BoardMembers";
import SubboardMembers from "./SubboardMembers";
import BackButton from "../components/BackButton";
import "./BoardPage.css";

const BoardPage = () => {
  return (
    <>
      <RotatingCircle />
      <Navbar />

      <div className="app-container board-page">
        <h2>The Board of 2025-26</h2>
        <h3>Board Members</h3>
        <BoardMembers />
        <h3>Subboard Members</h3>
        <SubboardMembers />
      </div>
      <div className="page-container">
        <BackButton />
      </div>
      <Footer />
    </>
  );
};

export default BoardPage;
