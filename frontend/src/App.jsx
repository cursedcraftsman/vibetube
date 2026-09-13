import { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp3");
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    if (!url.trim()) {
      setMessage("Paste a media URL first.");
      return;
    }

    try {
      setMessage("Starting download... ⏳");

      const response = await fetch("/api/metube/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          download_type: format === "mp3" ? "audio" : "video",
          quality: "best",
          format: format,
          auto_start: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      setMessage(
        format === "mp3"
          ? "Download started! 🎵 Check the downloads folder."
          : "Download started! 🎬 Check the downloads folder."
      );

      setUrl("");
    } catch (error) {
      console.error(error);
      setMessage("Download failed. Check Docker/MeTube.");
    }
  };

  return (
    <div className="app">
      <main className="main">
        <header className="header">
          <div className="logo">
            🎧 VibeTube
          </div>
        </header>

        <section className="hero">
          <p>VIBETUBE</p>

          <h1>Download something you love 👋</h1>

          <div className="download-box">
            <h2>Paste a media URL</h2>

            <p>
              Choose MP3 or MP4 and download it directly
              to your local downloads folder.
            </p>

            <div className="download-controls">
              <input
                value={url}
                onChange={(event) =>
                  setUrl(event.target.value)
                }
                placeholder="Paste URL here..."
              />

              <select
                value={format}
                onChange={(event) =>
                  setFormat(event.target.value)
                }
              >
                <option value="mp3">MP3</option>
                <option value="mp4">MP4</option>
              </select>

              <button onClick={handleDownload}>
                ⚡ Download
              </button>
            </div>

            {message && (
              <div className="message">
                {message}
              </div>
            )}
          </div>

          
        </section>
      </main>
    </div>
  );
}

export default App;