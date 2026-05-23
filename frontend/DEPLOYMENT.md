# Laara Innovations - Full Stack Deployment Guide

This project is a MERN stack application with a Next.js frontend and an Express/Node.js backend.

## 📁 Project Structure
- `/` - Next.js Frontend
- `/server` - Express Backend

---

## 🚀 Deployment Steps

### 1. Backend Deployment (Render / Railway / Heroku)
The backend is ready to be deployed on platforms like **Render.com** or **Railway.app**.

1. Create a new Web Service and point it to the `/server` directory.
2. Set the following Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A long random string for token signing.
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your deployed frontend URL (e.g., `https://your-site.vercel.app`).
3. The server uses `npm start` to run in production.

### 2. Frontend Deployment (Vercel)
The frontend is optimized for **Vercel**.

1. Connect your repository to Vercel.
2. Set the following Environment Variable in the Vercel Dashboard:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://laara-backend.onrender.com/api`).
3. Vercel will automatically detect the Next.js project and deploy it.

---

## 🛠️ Local Development
1. **Start Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```
2. **Start Frontend**:
   ```bash
   npm install
   npm run dev
   ```

## ✅ Pre-Hosting Checklist
- [ ] MongoDB Atlas cluster created and IP whitelisted.
- [ ] Environment variables set on hosting platforms.
- [ ] `NEXT_PUBLIC_API_URL` points to the *production* backend URL.
