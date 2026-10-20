import { usePlayer } from "../context/PlayerContext";
import { artistName, coverStyle } from "../utils";
import { PauseIcon, PlayIcon } from "./Icons";

export default function TrackList({ tracks }) {
  const { current, isPlaying, playQueue } = usePlayer();

  return (
    <ol className="tracklist">
      {tracks.map((track, i) => {
        const active = current?._id === track._id;
        return (
          <li key={track._id} className={active ? "track active" : "track"}>
            <button
              className="track-play"
              onClick={() => playQueue(tracks, i)}
              aria-label={active && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
            >
              <span className="track-num">{i + 1}</span>
              <span className="track-icon">{active && isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
            </button>
            <div className="cover cover-xs" style={coverStyle(track._id)} />
            <div className="track-meta">
              <strong>{track.title}</strong>
              <small>{artistName(track.artist)}</small>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
