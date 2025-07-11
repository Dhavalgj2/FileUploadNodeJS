import React, { useEffect, useRef, useState } from "react";

const Files = () => {
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);
  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch("http://localhost:3000/getFiles");
        const data = await res.json();
        setUploadedFiles(data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    }
    fetchFiles();
  }, [updatePage]);

  const fileDownloadHandler = (fileName) => {
    const link = document.createElement("a");
    link.href = `http://localhost:3000/downloadFile/${fileName}`;
    link.download = fileName; // This triggers download instead of opening in new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/uploadFiles", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // Append new file to list
      setUploadedFiles((prev) => [...prev, { name: result.filename }]);
      setUpdatePage(true);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Uploaded Files</h2>
      <ul className="file-list">
        {uploadedFiles.map((file, index) => (
          <li key={index}>
            <a
              href={`http://localhost:3000/uploads/${file.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.name}
            </a>
            <span
              onClick={() => fileDownloadHandler(file.name)}
              style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
            >
              Download
            </span>
          </li>
        ))}
      </ul>

      <form onSubmit={uploadFileHandler} className="upload-form">
        <input type="file" ref={fileInputRef} name="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Files;
