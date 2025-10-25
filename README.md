# SmartDrive: AI-Powered Secure Cloud Storage Platform

<p align="center">
  <img src="https://raw.githubusercontent.com/Bharat-Yadav-11/Final-Year-Project/main/public/logo.png" alt="SmartDrive">
</p>

<p align="center">
  <strong>An enterprise-grade cloud storage platform that combines AI intelligence, secure file management, and organization-based collaboration.</strong>
</p>

---

<div align="center">
  <a href="#overview">Overview</a><br>
  <a href="#key-features">Key Features</a><br>
  <a href="#tech-stack">Tech Stack</a><br>
  <a href="#system-architecture">System Architecture</a><br>
  <a href="#future-enhancements">Roadmap</a><br>
  <a href="#getting-started">Getting Started</a><br>
  <a href="#deployment">Deployment</a><br>
  <a href="#security">Security</a><br>
  <a href="#license">License</a>
</div>

---

## Overview

SmartDrive is a modern, enterprise-grade cloud storage platform designed for individuals, teams, and developers seeking a secure, scalable, and intelligent file management experience. It allows users to store personal files or share data seamlessly within their organization, with intelligent role-based access control powered by Clerk and a real-time backend handled by Convex.

Whether you're a developer looking for a cutting-edge storage solution or a business in need of a collaborative file-sharing environment, SmartDrive provides the foundation for next-generation cloud storage.

---

## Key Features

- **🔒 Secure Cloud Storage:** Robust file access control for both individual users and organizations, ensuring data privacy and security.
- **🏢 Organization Support:** Leverages Clerk’s built-in organization system with webhooks for real-time synchronization of user and role changes.
- **🔐 Role-Based Access Control:** Pre-defined "Admin" and "Member" roles to manage organization files, providing granular control over data access. Admins have full control, while members have restricted access.
- **🤖 AI-Powered Management (Upcoming):** Future-ready architecture for smart file categorization, semantic search, and intelligent, automated tagging.
- **📤 Personal & Organization Uploads:** Easily upload and manage files in a personal workspace or within a shared organization account.
- **⚡ Real-Time Sync:** Powered by Convex’s reactive data architecture, all file and state changes are reflected instantly across all clients.
- **✨ Modern UI:** A minimal, responsive, and intuitive user interface built with the latest web technologies, including ShadCN UI and Tailwind CSS.

---

## Tech Stack

The platform is built on a modern, serverless, and scalable technology stack.

| Layer                            | Technology                                        | Description                                                 |
| -------------------------------- | ------------------------------------------------- | ----------------------------------------------------------- |
| **Frontend**                     | [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/) | For a fast, server-rendered React application.              |
| **Styling**                      | [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/) | For a modern, utility-first, and accessible design system. |
| **Backend & Database**           | [Convex](https://www.convex.dev/)                 | Handles real-time backend logic, database, and file storage. |
| **Authentication & Org Mgmt** | [Clerk](https://clerk.com/)                       | Manages user authentication and organization structures.      |
| **Deployment**                   | [Vercel](https://vercel.com/)                     | For seamless, continuous deployment and hosting.            |

---

## System Architecture

The architecture is designed for simplicity, security, and real-time performance.

1.  **User Authentication & Context:** The user interacts with the frontend and is authenticated by **Clerk**, which also provides the organization context (ID, role).
2.  **Frontend Interface:** The **Next.js** and **ShadCN UI** frontend provides a responsive and interactive user experience.
3.  **Backend Logic:** All backend operations (file uploads, queries, mutations) are sent to **Convex**.
4.  **Real-Time Database & Storage:** **Convex** processes these operations, updates the database, stores files, and pushes real-time updates to all connected clients.

```mermaid
graph TD
    A[User] -- "Authenticates & gets org context" --> B[Clerk];
    A -- "Interacts with" --> C[Frontend (Next.js + ShadCN)];
    C -- "Sends requests" --> D[Convex (Backend, DB, Real-Time Logic)];
    B -- "Webhooks sync org data" --> D;
    D -- "Manages" --> E[File Storage];
```

- **Personal uploads** are stored with a `userId` reference.
- **Organization uploads** are stored with an `orgId` reference.
- **Clerk webhooks** are used to synchronize organization events (creation, user role changes) with the Convex backend in real time, ensuring data consistency.

---

## Future Enhancements

SmartDrive is an evolving platform. Our roadmap includes:

- **🧠 AI-Based File Tagging & Semantic Search:** Implement machine learning models to automatically tag files and enable natural language search.
- **📊 Dashboard Analytics:** Provide insights into storage usage, user activity, and file access patterns.
- **🔄 File Version Control:** Allow users to view and roll back to previous versions of a file.
- **📧 Email Notifications:** Use webhooks to trigger email alerts for new file uploads and shares.
- **📦 External Storage Integration:** Add support for S3, R2, or other object storage providers.
- **💳 Tier-Based Billing:** Integrate Stripe for subscription plans with different storage tiers.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- npm or a compatible package manager
- A Clerk account ([clerk.com](https://clerk.com/))
- A Convex account ([convex.dev](https://www.convex.dev/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/Bharat-Yadav-11/Final-Year-Project.git
cd smartdrive
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project and add the following keys. You can get these values from your Clerk and Convex dashboards.

```ini
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment
```

### Step 4: Run Convex Backend

In a separate terminal, start the Convex development server. This will sync your schema and functions.

```bash
npx convex dev
```

Follow the prompts to connect your project to your Convex account.

### Step 5: Start the Development Server

In your main terminal, start the Next.js frontend application.

```bash
npm run dev
```

Visit the app locally at [http://localhost:3000](http://localhost:3000).

---

## Deployment

SmartDrive is optimized for deployment on **Vercel**.

1.  Push your code to a Git repository (e.g., GitHub).
2.  Import the repository into your Vercel account.
3.  Configure the same environment variables from your `.env.local` file in **Vercel → Project Settings → Environment Variables**.
4.  Deploy! Vercel will automatically build and deploy your Next.js frontend. Your Convex backend functions run server-side and are already deployed.

---

## Security

Security is a top priority for SmartDrive.

- **Data Isolation:** All user and organization data are isolated using unique IDs (`userId`, `orgId`).
- **Server-Side Validation:** Access control is enforced via Clerk's authentication state and verified server-side in every Convex function to prevent unauthorized access.
- **Future Enhancements:** We plan to implement encryption-at-rest for files and metadata hashing to ensure data integrity.

---

## License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software with proper attribution. See the `LICENSE` file for more details.
