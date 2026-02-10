# CSTech - Admin Dashboard & Task Distribution System

A full-stack MERN application designed for managing agents and efficiently distributing tasks via CSV uploads.

## 🚀 Features

- **Admin Authentication**: Secure login system for administrators.
- **Agent Management**: Add, view, and manage agents with details like name, email, mobile, and password.
- **Task Distribution**: Upload CSV/Excel files to automatically distribute tasks equally among registered agents.
- **Visualization**: Interactive dashboard to view distributed tasks and agent assignments.
- **Responsive Design**: Built with React and TailwindCSS for a seamless experience across devices.

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository_url>
cd CSTech
```

### 2. Backend Setup
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:
```bash
npm start
```
*Server will run on http://localhost:5000*

### 3. Database Seeding & Scripts

Before logging in, you must verify/seed the admin user.

**Seed Admin User (Required for initial login):**
```bash
node scripts/seedAdmin.js
```
This script checks for an admin user. If none exists, it creates one with:
- **Email**: `admin@example.com`
- **Password**: `admin123`

> **Note**: Use these credentials to log in to the Admin Dashboard.

**Other Utility Scripts:**
- `node scripts/seedAgents.js`: Populates the database with dummy agents for testing purposes.
- `node scripts/countAgentTasks.js`: A utility to quickly view task distribution counts per agent in the console.

### 4. Frontend Setup
Open a new terminal, navigate to the `frontend` directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the development server:
```bash
npm run dev
```
*Application will run on http://localhost:5173*

### 5. Frontend Environment Variables
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📸 Screenshots

<img width="1439" height="734" alt="Screenshot 2026-02-09 101920" src="https://github.com/user-attachments/assets/4b6a55cb-a36a-485c-8f70-7e54ad1a2a2f" />

## 📂 Project Structure

```
CSTech/
├── backend/            # Express.js API
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   └── scripts/        # Utility scripts (seeders, etc.)
└── frontend/           # React Application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Application pages
    │   └── context/    # State management
    └── public/         # Static assets
```

## 🛡️ License

This project is licensed under the MIT License.
