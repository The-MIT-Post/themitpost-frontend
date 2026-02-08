import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Tiptap = lazy(() => import("../rich_editor/Tiptap"));
import "./AdminDashboard.css";

function getNewSummary(text, max = 350) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}

function updatePostName(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getPlainText(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.innerText || "";
}

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [article, setArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    // creator: "",
    // creator_name: "",
    post_date: "",
    category: "",
    tags: [],
    content: "",
    content_text: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`);
        if (!response.ok) throw new Error("Failed to fetch article");

        const data = await response.json();
        setArticle(data);

        setFormData({
          title: data.title,
          // creator: data.creator,
          // creator_name: data.creator_name || "",
          post_date: new Date(data.post_date).toISOString().split("T")[0],
          category: data.category,
          tags: data.tags || [],
          content: data.content,
          content_text: data.content_text || getPlainText(data.content),
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
    setFormData((prev) => ({
      ...prev,
      content,
      content_text: getPlainText(content),
    }));
    setIsChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const summary = getNewSummary(formData.content_text, 350);
    const post_name = updatePostName(formData.title);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({
          ...article,
          ...formData,
          summary,
          post_name,
          post_date: new Date(formData.post_date).toISOString(),
          post_modified: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to update article");

      navigate("/admin/new");
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div className="notification">Loading article...</div>;
  if (error) return <div className="notification error">Error: {error}</div>;
  if (!article) return <div className="notification error">Article not found</div>;

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

          {/* <div className="formGroup">
            <label>Author Username</label>
            <input
              className="input"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
              required
            />
          </div> */}

          {/* <div className="formGroup">
            <label>Author Name</label>
            <input
              className="input"
              name="creator_name"
              value={formData.creator_name}
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="formGroup">
            <label>Post Date</label>
            <input
              className="input"
              type="date"
              name="post_date"
              value={formData.post_date}
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
              onChange={handleChange}>
              <option>Campus</option>
              <option>Campus → Revels</option>
              <option>Campus → TechTatva</option>
              <option>Campus → Freshers Corner</option>
              <option>Campus → FAQ</option>
              <option>Arts & Culture</option>
              <option>Science & Technology</option>
              <option>World</option>
              <option>World → Travel</option>
              <option>News</option>
              <option>Media</option>
              <option>Media → Interviews</option>
            </select>
          </div>

          <div className="formGroup">
            <label>Tags (comma separated)</label>
            <input
              className="input"
              value={formData.tags.join(", ")}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                }));
                setIsChanged(true);
              }}
            />
          </div>

          <div className="formGroup">
            <label>Content</label>
            <Suspense fallback={<div>Loading editor…</div>}>
              <Tiptap content={formData.content} setContent={handleContentChange} />
            </Suspense>
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
