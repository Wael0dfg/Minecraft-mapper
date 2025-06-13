import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith(".zip")) {
      setError("Please upload a valid .zip file");
      return;
    }

    setUploading(true);
    setError(null);
    setImageUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("version", "1.21.60");

    try {
      const response = await fetch("https://minecraft-mapper.onrender.com", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Upload failed");
      }

      const blob = await response.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    }

    setUploading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Minecraft Mapper</h1>
      <input type="file" accept=".zip" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading and processing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated Map:</h3>
          <img src={imageUrl} alt="Minecraft Map Result" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}

// 🔁 Mount the app
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
