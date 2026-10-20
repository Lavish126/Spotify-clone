import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

function UploadSong({ onUploaded }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleFile = (e) => {
    const picked = e.target.files[0] || null;
    setFile(picked);
    // Suggest a title from the file name if none was typed
    if (picked && !title) setTitle(picked.name.replace(/\.[^.]+$/, ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus({ type: "loading", message: "Uploading…" });
    try {
      const data = await api.uploadMusic(title.trim(), file);
      onUploaded({ _id: data.id, title: data.title, uri: data.uri });
      setStatus({ type: "success", message: `"${data.title}" was uploaded.` });
      setTitle("");
      setFile(null);
      e.target.reset();
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>Upload a song</h2>
      <label className="dropzone">
        <input type="file" accept="audio/*" onChange={handleFile} required />
        <strong>{file ? file.name : "Choose an audio file"}</strong>
        <small className="muted">{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "MP3, WAV, M4A…"}</small>
      </label>
      <label>
        Song title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      {status.type === "error" && <p className="error">{status.message}</p>}
      {status.type === "success" && <p className="success">{status.message}</p>}
      <button className="btn" disabled={status.type === "loading" || !file}>
        {status.type === "loading" ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}

function CreateAlbum({ songs }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.createAlbum(title.trim(), selected);
      navigate(`/albums/${data.album.id}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>Create an album</h2>
      <label>
        Album title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <div className="picker">
        <span className="picker-label">Songs ({selected.length} selected)</span>
        {songs.length === 0 ? (
          <p className="muted">Upload a song first, then add it to an album.</p>
        ) : (
          songs.map((song) => (
            <label key={song._id} className="picker-row">
              <input type="checkbox" checked={selected.includes(song._id)} onChange={() => toggle(song._id)} />
              <span>{song.title}</span>
            </label>
          ))
        )}
      </div>

      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={loading}>{loading ? "Creating…" : "Create album"}</button>
    </form>
  );
}

export default function Studio() {
  const { user } = useAuth();
  const [mySongs, setMySongs] = useState([]);

  useEffect(() => {
    api.getMusics({ artist: user.id, limit: 50 })
      .then((data) => setMySongs((prev) => mergeSongs(prev, data.musics || [])))
      .catch(() => {});
  }, [user.id]);

  return (
    <section>
      <header className="page-header">
        <div>
          <p className="eyebrow">Artist studio</p>
          <h1>Share your music</h1>
        </div>
      </header>
      <div className="studio-grid">
        <UploadSong onUploaded={(song) => setMySongs((prev) => mergeSongs([song], prev))} />
        <CreateAlbum songs={mySongs} />
      </div>
    </section>
  );
}

function mergeSongs(a, b) {
  const seen = new Set();
  return [...a, ...b].filter((s) => (seen.has(s._id) ? false : seen.add(s._id)));
}
