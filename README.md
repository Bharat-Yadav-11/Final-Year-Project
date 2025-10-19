# 🚗 SmartDrive – AI-Integrated Personal Cloud Storage System

**SmartDrive** is a secure, scalable, and intelligent cloud platform that lets users **upload, organize, and access** their files from anywhere.  
It integrates **Artificial Intelligence** to provide **automatic file categorization**, **semantic search**, and **smart recommendations**, offering an effortless and efficient file-management experience.

![Project Overview](./assets/overview.png)

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Detailed Workflow](#detailed-workflow)
- [AI Integration](#ai-integration)
- [Security](#security)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Author](#author)

---

## 🚀 Overview
**SmartDrive** provides a modern alternative to traditional cloud storage systems such as Google Drive or Dropbox.  
Built with **Next.js**, **Convex**, and **AI-powered modules**, it offers users a **smarter**, **context-aware**, and **high-performance** cloud experience.

### 🎯 Key Objectives
- Enable **secure and scalable** file storage  
- Provide **AI-powered automation** for tagging and organization  
- Support **semantic and voice-based search**  
- Offer **real-time synchronization** across devices  

---

## 🌟 Features
- 🔐 **Secure Authentication** – via Clerk (supports MFA & OAuth)  
- 🧠 **AI-Based File Tagging** – automatic classification and metadata generation  
- 🔍 **Semantic Search** – find files using natural language (e.g., “Find my April invoice”)  
- 🎙️ **Voice Search (Optional)** – powered by Whisper / Browser API  
- ☁️ **Cloud Storage** – backed by Supabase or AWS S3  
- ⚡ **Serverless Backend** – built with Convex for real-time state sync  
- 🧩 **Responsive UI** – crafted using Next.js (TypeScript), Tailwind CSS, and ShadCN  
- 🚀 **CI/CD Deployment** – hosted on Vercel with optional Docker support  

---

## 🧩 System Architecture
SmartDrive’s architecture is **modular**, **serverless**, and optimized for scalability and real-time interaction.

![System Architecture](./assets/architecture.png)

### Highlights
- Decoupled **frontend and backend** connected via Convex APIs  
- Real-time **state synchronization** and secure API handling  
- **Supabase/S3** for reliable file storage  
- **Convex Data Layer** stores metadata and AI tags  
- **OpenAI + Pinecone/FAISS** handle semantic and vector-based search  

---

## 🧱 Tech Stack

| Layer | Technology | Description |
|--------|-------------|-------------|
| **Frontend** | Next.js (TypeScript), Tailwind CSS, ShadCN | Interactive, modern, and responsive UI |
| **Backend** | Convex (Serverless), TypeScript | Real-time API and business logic |
| **Database** | Convex Data Layer | Metadata and AI tag storage |
| **Storage** | Supabase / AWS S3 | Cloud object storage |
| **AI / ML** | OpenAI Embeddings, TensorFlow/Keras, Pinecone/FAISS | AI tagging & semantic search |
| **Authentication** | Clerk, JWT (optional) | Secure login and access control |
| **Deployment** | Vercel, Docker (optional) | CI/CD and cloud scalability |

---

## 🔄 Detailed Workflow (Improved Methodology)

### 1️⃣ User Authentication
- User logs in securely through **Clerk** (supports social login & MFA).
- Session data is validated, and tokens (JWT) manage secure access.

### 2️⃣ File Upload & Storage
- User uploads files through the web interface.
- The file is validated by **Convex API** and stored in **Supabase/S3**.
- Metadata and initial tags are stored in **Convex Data Layer**.

### 3️⃣ AI Processing
- **OpenAI Embeddings** extract semantic meaning from file content.
- **TensorFlow/Keras** auto-classify images and documents.
- Generated AI tags are saved for organization and search.

### 4️⃣ Intelligent Search
- Users can search with **natural language or voice**.
- **Pinecone/FAISS** performs vector-similarity search on embeddings.
- Relevant results are returned instantly.

### 5️⃣ Real-Time Updates
- Convex automatically syncs file changes (upload/edit/delete) across connected clients.

### 6️⃣ Deployment & Delivery
- Frontend and backend are deployed on **Vercel** with integrated CI/CD.
- **Docker containers** provide consistent builds across environments.

---

## 🧠 AI Integration

| Feature | Tool / Model | Description |
|----------|---------------|-------------|
| **Semantic Search** | OpenAI Embeddings | Finds contextually similar files |
| **Vector Database** | Pinecone / FAISS | Stores and queries vector data |
| **Image Classification** | TensorFlow / Keras | Auto-labels uploaded images |
| **Voice Search** | Whisper / Browser Speech API | Converts speech to text for search |

---

## 🔐 Security
- **Clerk Authentication** ensures safe and encrypted sign-in  
- **MFA & OAuth** support for extra security  
- **JWT-based Access Control (optional)**  
- Private file access policies and secure HTTPS communication  

---

## ⚙️ Deployment
- Deployed seamlessly on **Vercel**  
- **CI/CD pipelines** for automatic build and deploy  
- Optional **Docker** setup for containerized environments  
- Edge network optimization for minimal latency  

---

## 🚧 Future Enhancements
- 🧾 **Document Summarization** using advanced LLMs  
- 📂 **Collaborative File Sharing** and multi-user access  
- 📜 **File Version Control** and history tracking  
- ☁️ **Third-party Integrations** (Google Drive / Dropbox)  
- 🗣️ **Multilingual Voice Support** for accessibility  

---

## 🧾 License
This project is licensed under the **MIT License** —  
Free for personal, academic, and open-source use.

---

## 👨‍💻 Author
**Mohit Sharma**
**Bharat Bhushan**
Final Year Project – *SmartDrive*  
📬 [GitHub Profile](https://github.com/MohiTSh4rmA)
📬 [GitHub Profile]((https://github.com/Bharat-Yadav-11))
🌐 Project Repository: [SmartDrive on GitHub](https://github.com/MohiTSh4rmA/Final-Year-Project)

---

### 🖼️ Note
Place your diagrams in a folder named `assets/` in your repository:
