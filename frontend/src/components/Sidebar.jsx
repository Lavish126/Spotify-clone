import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { APP_NAME } from "../utils";
import { AlbumIcon, HomeIcon, LogoIcon, StudioIcon } from "./Icons";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout().catch(() => {});
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <LogoIcon width={26} height={26} />
        <span>{APP_NAME}</span>
      </div>

      <nav className="nav">
        <NavLink to="/" end><HomeIcon /> <span>Home</span></NavLink>
        <NavLink to="/albums"><AlbumIcon /> <span>Albums</span></NavLink>
        {user?.role === "artist" && (
          <NavLink to="/studio"><StudioIcon /> <span>Studio</span></NavLink>
        )}
      </nav>

      <div className="account">
        <div className="avatar">{user?.userName?.[0]?.toUpperCase()}</div>
        <div className="account-info">
          <strong>{user?.userName}</strong>
          <small>{user?.role === "artist" ? "Artist" : "Listener"}</small>
        </div>
        <button className="btn-ghost" onClick={handleLogout}>Log out</button>
      </div>
    </aside>
  );
}
