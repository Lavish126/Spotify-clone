# 🎵 Spotify Clone — Backend

I'm building a Spotify Clone as a hands-on project to improve my backend development skills and understand how a music streaming application works behind the scenes.

The main goal of this project is to learn how to build REST APIs, manage users and roles, handle authentication, upload music, and organize songs into albums.

## 🚀 Features

- **User Authentication** — User registration and login using JWT.
- **Password Security** — Passwords are hashed using bcrypt before being stored.
- **Role-Based Access Control** — Separate permissions for users and artists.
- **Music Upload** — Artists can upload music files.
- **Cloud Storage** — Music files are uploaded using ImageKit.
- **Album Management** — Artists can create albums and add music to them.
- **Fetch Music** — Retrieve uploaded songs along with artist details.
- **Album APIs** — Get all albums or fetch a specific album by its ID.
- **Logout** — Clear the authentication cookie.
- **Pagination** — Fetch music in smaller batches instead of loading everything at once.

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Backend framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **JWT** — Authentication
- **bcrypt** — Password hashing
- **Multer** — Handling file uploads
- **ImageKit** — Music file storage
- **Cookie-parser** — Reading authentication cookies
- **dotenv** — Managing environment variables

## 📁 Project Structure

```text
spotify-clone/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── db/
├── app.js
├── server.js
├── .env
├── .gitignore
└── package.json
```

*The exact folder structure may vary depending on the final project organization.*

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd spotify-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your own credentials:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

Make sure the variable names match those used in your code.

### 4. Start the server

```bash
npm run dev
```

If everything is configured correctly, the server should start on your configured port.

## 🔌 API Overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| POST | `/api/music/upload` | Upload music as an artist |
| POST | `/api/music/album` | Create an album |
| GET | `/api/music/allMusics?page=1&limit=10` | Fetch paginated music |
| GET | `/api/music/albums` | Fetch all albums |
| GET | `/api/music/albums/:id` | Fetch an album by ID |

*These endpoints assume your routes are mounted at `/api/auth` and `/api/music`. Update this table if your actual routes differ.*

## 🧪 Testing

I'm using Postman to test the APIs, check responses, verify authentication, and test music uploads and album creation.

## 📚 What I'm Learning

Through this project, I'm getting practical experience with:

- Designing REST APIs
- Working with MongoDB and Mongoose
- Authentication and authorization
- Middleware in Express.js
- Handling file uploads and cloud storage
- Connecting related database documents
- Building APIs that can handle larger collections through pagination

## 🔮 What's Next?

I plan to keep improving this project as I learn more about backend development and music streaming applications.

## 🤝 Feedback

This is a learning project, and I'm still improving it step by step. Suggestions, feedback, and ideas for improvement are always welcome.

Thanks for checking out my project! 🎧
