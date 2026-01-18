// components/ArticlesList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResetFilter from "./ResetFilter";
import "./ArticlesList.css";

const ArticlesList = ({ articles }) => {
  const fallbackImage = "/test.jpg";

  const articlesPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [gotoPage, setGotoPage] = useState("");

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const getPaginationItems = () => {
    const items = [];

    const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
      (p) => p >= 1 && p <= totalPages
    );

    const firstPages = [1, 2].filter((p) => p <= totalPages);
    const lastPages = [totalPages - 1, totalPages].filter((p) => p >= 1);

    const hasLeftEllipsis =
      middlePages[0] > firstPages[firstPages.length - 1] + 1;

    const hasRightEllipsis =
      middlePages[middlePages.length - 1] < lastPages[0] - 1;

    if (middlePages[0] > 2) {
      items.push(...firstPages);
    }

    if (hasLeftEllipsis) {
      items.push("left-ellipsis");
    }

    items.push(...middlePages);

    if (hasRightEllipsis) {
      items.push("right-ellipsis");
    }

    if (middlePages[middlePages.length - 1] < totalPages - 1) {
      items.push(...lastPages);
    }

    return [...new Set(items)];
  };

  const goToSpecificPage = () => {
    let page = parseInt(gotoPage, 10);
    if (isNaN(page)) return;

    page = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(page);
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
                By {article.creator_name} |{" "}
                {new Date(article.createdAt).toLocaleDateString()}
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
        {getPaginationItems().map((item, index) =>
          typeof item === "number" ? (
            <button
              key={item}
              className={`pagination-button ${
                currentPage === item ? "active" : ""
              }`}
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </button>
          ) : (
            <span key={item + index} className="pagination-ellipsis">
              . . .
            </span>
          )
        )}
      </div>

      <div className="pagination-goto">
        <span>Go to page </span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={gotoPage}
          onChange={(e) => setGotoPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && goToSpecificPage()}
        />
        <span>/ {totalPages}</span>
      </div>
    </section>
  );
};

export default ArticlesList;
