// components/ArticleDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import RotatingCircle from "./RotatingCircle";
import BackButton from "./BackButton";
import "./ArticleDetail.css";

const ArticleDetail = ({ articles }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [suggestedArticles, setSuggestedArticles] = useState([]);
  const fallbackImage = "/test.jpg";
  const fallback2 = "/test_2.jpg"; // Fallback for content images

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
        const data = await response.json();
        setArticle(data);

        const views_res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}/views`, {
          method: "POST",
        });

        if (!views_res.ok) throw new Error("Failed to update views");

        if (articles.length > 0) {
          const filtered = articles.filter((a) => a._id !== id);
          const randomArticles = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
          setSuggestedArticles(randomArticles);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, articles]);

  // Function to replace <img> tags with fallback2
  const replaceImages = (node) => {
    if (node.name === "img") {
      return (
        <img
          src={fallback2} // Replace with fallback2
          alt={node.attribs.alt || "Fallback Image"}
          className="article-image"
        />
      );
    }
  };

  if (!article) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <RotatingCircle />
      <div className="app-container">
        <div className="article-detail">
          <div className="article-header">
            <h1 className="article-title">{article.title}</h1>
            <div className="article-meta">
              <span className="article-date">{new Date(article.pubDate).toLocaleDateString()}</span>
              <span className="article-views">
                {article.views}
                <svg
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 122.88 68.18"
                  width="20px"
                  height="20px">
                  <title>view</title>
                  <path
                    class="cls-1"
                    d="M61.44,13.81a20.31,20.31,0,1,1-14.34,6,20.24,20.24,0,0,1,14.34-6ZM1.05,31.31A106.72,106.72,0,0,1,11.37,20.43C25.74,7.35,42.08.36,59,0s34.09,5.92,50.35,19.32a121.91,121.91,0,0,1,12.54,12,4,4,0,0,1,.25,5,79.88,79.88,0,0,1-15.38,16.41A69.53,69.53,0,0,1,63.43,68.18,76,76,0,0,1,19.17,53.82,89.35,89.35,0,0,1,.86,36.44a3.94,3.94,0,0,1,.19-5.13Zm15.63-5A99.4,99.4,0,0,0,9.09,34,80.86,80.86,0,0,0,23.71,47.37,68.26,68.26,0,0,0,63.4,60.3a61.69,61.69,0,0,0,38.41-13.72,70.84,70.84,0,0,0,12-12.3,110.45,110.45,0,0,0-9.5-8.86C89.56,13.26,74.08,7.58,59.11,7.89S29.63,14.48,16.68,26.27Zm39.69-7.79a7.87,7.87,0,1,1-7.87,7.87,7.86,7.86,0,0,1,7.87-7.87Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="article-author">By {article.creator}</span>
            </div>
          </div>
          <div className="article-content">
            {/* Parse the content and replace images with fallback2 */}
            {parse(article.content, { replace: replaceImages })}
          </div>
        </div>

        <div className="suggested-articles">
          <h2 className="section-title">Suggested Articles</h2>
          <div className="famous-articles-grid">
            {suggestedArticles.map((article) => (
              <div key={article._id} className="card">
                <img src={fallbackImage} alt={article.title} className="card-image" />
                <div className="card__content">
                  <p className="card__title">{article.title}</p>
                  <p className="card__description">{article.summary}</p>
                  <Link to={`/articles/${article._id}`} className="read-more-button">
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BackButton />
      </div>
      <Footer />
    </>
  );
};

export default ArticleDetail;
