import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminArticlesList.css";
import { useAuth } from "../context/AuthContext";

const AdminArticlesList = ({ articles, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const articlesPerPage = 10;
  const { currentUser } = useAuth();

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    setDeletingId(id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete article");

      alert("Article deleted successfully");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <h1>Manage Articles</h1>

      <div className="tableContainer">
        <table className="articlesTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.map((article) => (
              <tr key={article._id}>
                <td>
                  <Link
                    to={`/articles/${article._id}`}
                    className="articleTitle"
                  >
                    {article.title}
                  </Link>
                </td>
                <td>{article.category}</td>
                <td>{new Date(article.pubDate).toLocaleDateString()}</td>
                <td className="actions">
                  <Link
                    to={`/admin/edit/${article._id}`}
                    className="editButton"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    disabled={deletingId === article._id}
                    className="deleteButton"
                  >
                    {deletingId === article._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="noArticles">
            <p>No articles found</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default AdminArticlesList;
