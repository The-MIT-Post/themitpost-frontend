// components/ArticlesList.js
import { Link } from "react-router-dom";
import { decode } from "html-entities";
import ResetFilter from "./ResetFilter";
import Pagination from "./Pagination";

const ArticlesList = ({ articles, total }) => {
  const fallbackImage = "/test.jpg";

  return (
    <section id="all-articles" className="articles-list">
      <ResetFilter />

      {articles.map((article) => (
        <div key={article._id} className="articles-list-card">
          <img
            src={fallbackImage}
            alt={decode(article.title)}
            onError={(e) => (e.target.src = fallbackImage)}
            className="articles-list-image"
          />

          <div className="articles-list-content">
            <h3>{decode(article.title)}</h3>
            <div className="articles-list-sample">{decode(article.summary)}</div>

            <div className="bottom-container">
              <p className="articles-list-meta">
                By {decode(article.creator_name)} |{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </p>

              <Link to={`/articles/${article._id}`} className="read-more-button">
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}

      <Pagination total={total} />
    </section>
  );
};

export default ArticlesList;
