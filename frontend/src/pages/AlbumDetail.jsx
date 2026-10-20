import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { usePlayer } from "../context/PlayerContext";
import TrackList from "../components/TrackList";
import { PlayIcon } from "../components/Icons";
import { artistName, coverStyle } from "../utils";

export default function AlbumDetail() {
  const { albumId } = useParams();
  const { playQueue } = usePlayer();
  const [album, setAlbum] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setAlbum(null);
    setError("");
    api.getAlbum(albumId)
      .then((data) => setAlbum(data.album))
      .catch((err) => setError(err.message));
  }, [albumId]);

  if (error) {
    return (
      <section>
        <p className="error">{error}</p>
        <Link to="/albums">← Back to albums</Link>
      </section>
    );
  }
  if (!album) return <p className="muted">Loading album…</p>;

  // Songs inside an album don't have their artist populated, so use the album's artist
  const tracks = (album.musics || []).map((m) => ({ ...m, artist: album.artist }));

  return (
    <section>
      <Link to="/albums" className="back-link">← Albums</Link>
      <header className="album-hero">
        <div className="cover cover-xl" style={coverStyle(album._id)} />
        <div>
          <p className="eyebrow">Album</p>
          <h1>{album.albumTitle}</h1>
          <p className="muted">
            {artistName(album.artist)} · {tracks.length} {tracks.length === 1 ? "song" : "songs"}
          </p>
          {tracks.length > 0 && (
            <button className="btn btn-icon" onClick={() => playQueue(tracks, 0)}>
              <PlayIcon /> Play album
            </button>
          )}
        </div>
      </header>

      {tracks.length === 0 ? <p className="muted">This album has no songs yet.</p> : <TrackList tracks={tracks} />}
    </section>
  );
}
