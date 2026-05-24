# Laara Innovations - Full Stack Deployment Guide

This project is a MERN stack application set up as an npm workspace containing a Vite-based React frontend and an Express/Node.js backend.

## 📁 Project Structure
- `frontend/` - React frontend powered by Vite
- `backend/` - Node.js + Express API server

---

## 🚀 Deployment Steps

### 1. Backend Deployment (Render / Railway / Heroku / CapRover / VPS)
The backend is ready to be deployed on server hosts.

1. Connect your repository and configure the deployment to use the `backend` subdirectory as the root (or deploy from the project root and specify `backend/index.js` as the entrypoint).
2. Set the following Environment Variables on the hosting platform:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `PORT`: The port for the server (usually assigned dynamically, e.g., `5001` or `8080`).
   - `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://laara-innovations.vercel.app`) to allow CORS request handling.
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (must match the frontend).
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
   - `ADMIN_EMAILS`: Comma-separated list of administrator emails (e.g., `admin@laarainnovations.com,laarainnovations26@gmail.com`).
3. The server uses `npm start` (defined as `node index.js`) in production.

### 2. Frontend Deployment (Vercel / Netlify / Cloudflare Pages)
The Vite-based React frontend is optimized for static hosting platforms.

1. Connect your repository to your hosting provider (e.g., Vercel).
2. In the build settings, set:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
3. Set the following Environment Variables in the provider's dashboard:
   - `VITE_API_URL`: Your deployed backend production URL (e.g., `https://laara-backend.onrender.com` — do NOT add a trailing slash or `/api` since the Axios client automatically appends `/api`).
   - `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
   - `VITE_ADMIN_EMAILS`: Comma-separated list of administrator emails (e.g., `admin@laarainnovations.com,laarainnovations26@gmail.com`).
4. Trigger the build and deploy.

---

## 🛠️ Local Development
To run both backend and frontend concurrently from the root directory:
```bash
npm run dev
```

To run them individually:
1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```
2. **Start Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## ✅ Pre-Hosting Checklist
- [ ] MongoDB Atlas database created and network access configured (allow `0.0.0.0/0` or whitelist deployment IPs).
- [ ] Environment variables set correctly on the deployment dashboards.
- [ ] Google Cloud Console Authorized Redirect URIs and Javascript Origins updated with your production domain names.
- [ ] `VITE_API_URL` points to the *production* backend URL without a trailing slash.
- [ ] `FRONTEND_URL` on the backend points to the *production* frontend URL.
