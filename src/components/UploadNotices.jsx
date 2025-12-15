import React, { useState, useEffect } from "react";
import "./UploadNotices.css";

const UploadNotices = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
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

      const updatedFiles = [newFile, ...uploadedFiles];

      setUploadedFiles(updatedFiles);
      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));

      setTitle("");
      setFile(null);
      setMessage(`Notice "${renamedName}" uploaded successfully!`);
    } catch (error) {
      console.error("Error converting file to Base64:", error);
      setMessage("Error uploading the file.");
    }
  };

  const handleDelete = (indexToDelete) => {
    const updatedFiles = uploadedFiles.filter(
      (_, index) => index !== indexToDelete
    );
    setUploadedFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
    setMessage("Notice deleted successfully!");
  };

  return (
    <div className="upload-notice-container">
      <h1>Upload Notice</h1>
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
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
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
              <li key={index} className="notice-item">
                <a href={f.data} target="_blank">
                  {f.name}
                </a>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadNotices;
