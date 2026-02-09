import React, { useState, useEffect } from "react";
import "./UploadNotices.css";

const UploadNotices = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const files = import.meta.glob("/public/notices/*.pdf", {
      eager: true,
      as: "url",
    });

    const fileList = Object.keys(files).map((path) => ({
      name: path.split("/").pop(),
      url: files[path],
    }));

    fileList.sort((a, b) => {
      const extractDate = (name) => {
        const match = name.match(/(\d{2})-(\d{2})-(\d{4})/);
        if (!match) return new Date(0);

        const [, dd, mm, yyyy] = match;
        return new Date(`${yyyy}-${mm}-${dd}`);
      };

      return extractDate(b.name) - extractDate(a.name);
    });

    setUploadedFiles(fileList);
  }, []);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      setMessage("Please provide a title and select a file");
      return;
    }

    const extension = file.name.split(".").pop();
    const renamedName = `${title.replace(/\s+/g, "-")}.${extension}`;

    try {
      const base64Data = await fileToBase64(file);

      const newFile = { name: renamedName, data: base64Data };

      setMessage(`Notice "${renamedName}" uploaded (feature will be enabled later)`);

      setTitle("");
      setFile(null);
    } catch (error) {
      console.error("Error converting file:", error);
      setMessage("Error uploading the file.");
    }
  };

  return (
    <div className="upload-notice-container">
      <h1>Upload Notice (Feature not yet available)</h1>

      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="upload-notice-form">
        <div className="form-group">
          <label htmlFor="title">Notice Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Select File:</label>
          <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} required />
        </div>

        <button type="submit" className="btn-submit">
          Upload Notice
        </button>
      </form>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h3>Uploaded Notices:</h3>
          <ul>
            {uploadedFiles.map((f, index) => (
              <li key={index} className="admin-notice-item">
                <a href={f.url} target="_blank">
                  {f.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/-\d{2}-\d{2}-\d{4}$/, "")
                    .replace(/-/g, " ")}
                </a>

                <button className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadNotices;
