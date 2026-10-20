// Thin wrapper around the backend's REST API (proxied to localhost:3000 by Vite)

async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, { credentials: "include", ...options });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON response (e.g. Express default error page)
  }

  if (!res.ok) {
    // A missing/invalid cookie on a protected route means the session is gone
    if (res.status === 401 && !path.startsWith("/auth")) {
      window.dispatchEvent(new Event("auth:expired"));
    }
    const error = new Error(data?.message || `Request failed (${res.status})`);
    error.status = res.status;
    throw error;
  }
  return data;
}

const jsonBody = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const api = {
  register: (body) => request("/auth/register", jsonBody("POST", body)),
  login: (body) => request("/auth/login", jsonBody("POST", body)),
  logout: () => request("/auth/logout", { method: "POST" }),

  // params: { page, limit, artist }
  getMusics: (params = {}) => request(`/music/allMusics?${new URLSearchParams(params)}`),
  getAlbums: () => request("/music/albums"),
  getAlbum: (id) => request(`/music/albums/${id}`),

  uploadMusic: (title, file) => {
    const form = new FormData();
    form.append("title", title); // text fields before the file so multer sees them
    form.append("music", file);
    return request("/music/upload", { method: "POST", body: form });
  },
  createAlbum: (title, musics) => request("/music/album", jsonBody("POST", { title, musics })),
};
