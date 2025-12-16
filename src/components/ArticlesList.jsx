// components/ArticlesList.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import ResetFilter from "./ResetFilter";
import "./ArticlesList.css";

const ArticlesList = ({ articles }) => {
  const fallbackImage = "/test.jpg";

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const reversedArticles = articles;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = reversedArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(reversedArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generatePaginationNumbers = (totalpages) => {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <section id="all-articles" className="articles-list">
      <ResetFilter />
      {currentArticles.map((article) => (
        <div key={article._id} className="articles-list-card">
          <img
            src={fallbackImage}
            alt={article.title}
            onError={(e) => (e.target.src = fallbackImage)}
            className="articles-list-image"
          />
          <div className="articles-list-content">
            <h3>{article.title}</h3>
            <div className="articles-list-sample">{article.summary}</div>
            <div className="bottom-container">
              <p className="articles-list-meta">
                By {article.creator} |{" "}
                {new Date(article.pubDate).toLocaleDateString()}
              </p>
              <Link
                to={`/articles/${article._id}`}
                className="read-more-button"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="pagination-bar">
        {generatePaginationNumbers().map((pageNumber, index) =>
          typeof pageNumber === "number" ? (
            <button
              key={index}
              className={`pagination-button ${
                currentPage === pageNumber ? "active" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ) : (
            <span key={index} className="pagination-ellipsis">
              {pageNumber}
            </span>
          )
        )}
      </div>
    </section>
  );
};

export default ArticlesList;
