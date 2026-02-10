import React, { useState, lazy, Suspense } from "react";
const RichEditor = lazy(() => import("../rich_editor/RichEditor"));
import "./AdminDashboard.css";
import { useAuth } from "../context/AuthContext";

function getContentText(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.innerText || "";
}

function getSummary(text, max = 350) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}

function makePostName(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  const [articleData, setArticleData] = useState({
    title: "",
    // creator: "",
    creator_name: "",
    category: "",
    content: "",
    content_text: "",
  });

  const [tagsInput, setTagsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title") {
        updated.post_name = makePostName(value);
      }
      return updated;
    });
  };

  const handleContentChange = (content) => {
    setArticleData((prev) => ({
      ...prev,
      content,
      content_text: getContentText(content),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const now = new Date().toISOString();
    const summary = getSummary(articleData.content_text, 350);
    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          ...articleData,
          tags: tagsArray,
          summary: summary,
          createdAt: now,
          updatedAt: now,
          views: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create article");
      }

      setSubmitMessage("Article created successfully!");
      setArticleData({
        title: "",
        // creator: "",
        creator_name: "",
        category: "",
        content: "",
        content_text: "",
      });
      setTagsInput("");
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
            className={`notification ${submitMessage.includes("success") ? "success" : "error"}`}>
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
                required
              />
            </div>

            <div className="formGroup">
              <label>Category*</label>
              <select
                className="input"
                name="category"
                value={articleData.category}
                onChange={handleChange}
                required>
                <option value="">Select category</option>
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
          </div>

          <div className="grid-2">
            {/* <div className="formGroup">
              <label>Author Username*</label>
              <input
                className="input"
                name="creator"
                value={articleData.creator}
                onChange={handleChange}
                required
              />
            </div> */}

            <div className="formGroup">
              <label>Author Name*</label>
              <input
                className="input"
                name="creator_name"
                value={articleData.creator_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <label>Tags (comma separated)*</label>
            <input
              className="input"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g., Tech, AI, Campus"
              required
            />
          </div>

          <div className="formGroup">
            <label>Content*</label>
            <Suspense fallback={<div>Loading editor…</div>}>
              <RichEditor content={articleData.content} setContent={handleContentChange} />
            </Suspense>
          </div>

          <button type="submit" className="submitButton" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Article"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminDashboard;
