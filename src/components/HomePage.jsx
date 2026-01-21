import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import DabbaLeft from "./DabbaLeft";
import DabbaRight from "./DabbaRight";
import ArticlesList from "./ArticlesList";
import Footer from "./Footer";
import RotatingCircle from "./RotatingCircle";

const HomePage = ({ articles, total }) => {
  return (
    <>
      <RotatingCircle />
      <Navbar />
      <div className="app-container">
        <Hero />
        <Categories />
        <div className="not-hero">
          <div className="dabba-left-parent">
            <DabbaLeft />
          </div>
          <ArticlesList articles={articles} total={total} />
          <div className="dabba-right-parent">
            <DabbaRight />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
