import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Tiptap from "../rich_editor/Tiptap";
import "./AdminDashboard.css";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [article, setArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    creator: "",
    pubDate: "",
    category: "Technology",
    content: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch article");

        const data = await response.json();
        setArticle(data);
        setFormData({
          title: data.title,
          creator: data.creator,
          pubDate: new Date(data.pubDate).toISOString().split("T")[0],
          category: data.category,
          content: data.content,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
          body: JSON.stringify({
            ...article,
            ...formData,
            pubDate: new Date(formData.pubDate).toISOString(),
            post_modified: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update article");

      navigate("/admin/articles");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="notification">Loading article...</div>;
  if (error) return <div className="notification error">Error: {error}</div>;
  if (!article)
    return <div className="notification error">Article not found</div>;

  return (
    <div>
      <div className="formCard">
        <h1>Edit Article</h1>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Title</label>
            <input
              className="input"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Author</label>
            <input
              className="input"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Publishing Date</label>
            <input
              className="input"
              type="date"
              name="pubDate"
              value={formData.pubDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Category</label>
            <select
              className="input"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Technology</option>
              <option>Business</option>
              <option>Health</option>
              <option>Science</option>
              <option>Entertainment</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Content</label>
            <Tiptap
              content={formData.content}
              setContent={handleContentChange}
            />
          </div>

          <button type="submit" disabled={!isChanged} className="submitButton">
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
