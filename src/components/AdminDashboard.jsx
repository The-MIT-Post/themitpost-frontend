import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Tiptap from "../rich_editor/Tiptap";
import "./AdminDashboard.css";
import { h1 } from "framer-motion/client";

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const [articleData, setArticleData] = useState({
    title: "",
    link: "",
    pubDate: new Date().toISOString().split("T")[0],
    creator: "",
    guid: "",
    content: "",
    post_id: "",
    post_date: new Date().toISOString().split("T")[0],
    post_modified: new Date().toISOString().split("T")[0],
    post_name: "",
    category: "Technology",
    views: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setArticleData((prev) => ({ ...prev, content }));
  };

  const generateGuid = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const handleGenerateFields = () => {
    const slug = articleData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setArticleData((prev) => ({
      ...prev,
      guid: generateGuid(),
      post_id: Date.now().toString(),
      post_name: slug,
      link: `${window.location.origin}/articles/${slug}`,
      creator: currentUser?.username || "admin",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/articles`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            ...articleData,
            pubDate: new Date(articleData.pubDate).toISOString(),
            post_date: new Date(articleData.post_date).toISOString(),
            post_modified: new Date(articleData.post_modified).toISOString(),
            views: 0,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to publish article");

      setSubmitMessage("Article published successfully!");
    } catch (err) {
      setSubmitMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>Create Article</h1>
      <div className="formCard">
        {submitMessage && (
          <div
            className={`notification ${
              submitMessage.includes("success") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="formGroup">
              <label>Title*</label>
              <input
                className="input"
                name="title"
                value={articleData.title}
                onChange={handleChange}
              />
            </div>

            <div className="formGroup">
              <label>Category*</label>
              <select
                className="input"
                name="category"
                value={articleData.category}
                onChange={handleChange}
              >
                <option>Campus</option>
                <option>Arts & Culture</option>
                <option>Science & Technology</option>
                <option>News</option>
                <option>Interviews</option>
                <option>Notices</option>
                <option>Media</option>
              </select>
            </div>
          </div>

          <div className="formGroup">
            <label>Content*</label>
            <Tiptap
              content={articleData.content}
              setContent={handleContentChange}
            />
          </div>

          <button
            type="button"
            className="generateButton"
            onClick={handleGenerateFields}
          >
            Generate Missing Fields
          </button>

          <button
            type="submit"
            className="submitButton"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminDashboard;
