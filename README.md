# ⚡️ ResumeIQ Hub

### Next-Gen AI-Powered Resume Management & Semantic Search Engine
![ResumeIQ Banner](https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop)

ResumeIQ Hub is a world-class talent acquisition platform built on a state-of-the-art RAG (Retrieval-Augmented Generation) pipeline. It transforms static resume repositories into dynamic, searchable intelligence centers using Google Gemini embeddings and advanced vector processing.

---

## 🚀 Core Capabilities

*   **🧠 Semantic Intelligence**: Search by intent, not just keywords. Find "Software Engineers with Cloud experience" even if the resume only says "AWS Infrastructure Developer".
*   **📡 Real-time Ingestion**: Drag-and-drop PDF ingestion with automated LLM-powered skill extraction and vector indexing.
*   **📊 Executive Dashboard**: High-fidelity analytics featuring Recharts visualizations for talent pipeline health, skill heatmaps, and velocity tracking.
*   **🔦 Precision Highlighting**: Instant visual feedback in search results using intelligent `<mark>` tagging for context-aware match displays.
*   **🌓 Adaptive UI**: premium dark and light mode support with fluid Framer Motion transitions and standardized design tokens.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Framer Motion, Lucide Icons |
| **Backend** | Node.js (ESM), Express.js, MongoDB + Mongoose |
| **AI/ML** | Google Gemini (Embeddings), Vector Similarity Processing |
| **Workflow** | Inngest (Async Background Jobs), Cloudinary (PDF Storage) |
| **Charts** | Recharts (Area, Bar, Pie) |

---

## 📦 Getting Started

### 1. Prerequisites
- MongoDB Atlas Cluster (or local instance)
- Google Cloud Project with Gemini API Key
- Cloudinary Account (for asset storage)

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file with:
# PORT=8000
# MONGO_URI=your_mongodb_uri
# GEMINI_API_KEY=your_gemini_key
# CLOUDINARY_CLOUD_NAME=xxx
# CLOUDINARY_API_KEY=xxx
# CLOUDINARY_API_SECRET=xxx
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create a .env file with:
# VITE_BACKEND_URL=http://localhost:8000
npm run dev
```

---

## 🎨 UI Showcase

The project features a **Premium Design System**:
- **Borders**: Standardized `2xl` / `3xl` radii for a soft, modern feel.
- **Color Palette**: Sophisticated Indigo, Emerald, and Slate tones.
- **Glassmorphism**: Backdrop blurs and translucent overlays in the dashboard and navigation.

---

## 🛡 Security & Best Practices
- **Debounced Search**: 300ms logic to optimize API calls.
- **Skeleton States**: Animated placeholders for zero-latency user experience.
- **Role-Based Access**: Secure login flow with persistent JWT-ready architecture.

---

Built with ❤️ for **Advanced Agentic Coding** by Antigravity.
