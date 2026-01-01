# 🎫 AI Ticket Assistant

<div align="center">

**An Intelligent AI-Powered Ticketing System**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-blue.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

*Automatically analyze, categorize, prioritize, and route support tickets using Google Gemini AI*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [User Roles](#-user-roles)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

**AI Ticket Assistant** is a full-stack web application that revolutionizes support ticket management through AI-powered automation. The system leverages **Google Gemini AI** to intelligently analyze incoming support tickets, automatically categorize them, determine priority levels, generate helpful notes, and intelligently route tickets to the most appropriate team members based on their skills.

### Key Capabilities

- 🤖 **AI-Powered Ticket Analysis**: Automatically summarizes and analyzes ticket content
- 🏷️ **Smart Categorization**: Identifies ticket types and technical domains
- ⚡ **Priority Detection**: Determines urgency levels (low, medium, high, urgent)
- 👥 **Intelligent Routing**: Matches tickets to moderators based on skills and expertise
- 📧 **Automated Notifications**: Sends email notifications when tickets are assigned
- 🔐 **Secure Authentication**: JWT-based authentication with role-based access control
- ⚙️ **Background Processing**: Uses Inngest for reliable, asynchronous ticket processing

---

## ✨ Features

### Core Features

#### 🎫 Ticket Management
- Create, view, update, and manage support tickets
- Real-time ticket status tracking (TODO, IN_PROGRESS, DONE)
- Detailed ticket information with AI-generated insights
- Ticket assignment to moderators and admins

#### 🤖 AI Analysis
- **Automatic Summarization**: Generates concise summaries of ticket content
- **Priority Detection**: Analyzes urgency and sets priority levels
- **Helpful Notes**: Provides actionable suggestions for ticket resolution
- **Skill Matching**: Identifies related technical skills for better routing

#### 👥 User Management
- User registration and authentication
- Role-based access control (User, Moderator, Admin)
- Skill-based user profiles for intelligent ticket assignment
- JWT-based secure session management

#### 📊 Dashboard
- Admin dashboard for ticket oversight
- User dashboard for personal ticket management
- Real-time ticket status updates
- Filtering and search capabilities

#### 🔄 Background Processing
- Asynchronous ticket processing using Inngest
- Event-driven architecture for scalable operations
- Retry mechanisms for failed operations
- Email notifications via Nodemailer

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React Frontend│         │  Express API    │         │   MongoDB       │
│   (Vite + React)│ ◄─────► │   (Node.js)     │ ◄─────► │   Database      │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     │
                                     │
                            ┌────────▼────────┐
                            │     Inngest     │
                            │  (Background    │
                            │   Processing)   │
                            └────────┬────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
            ┌───────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
            │  Gemini AI   │  │  Nodemailer │  │   JWT Auth  │
            │   (Analysis) │  │  (Emails)   │  │   (Security)│
            └──────────────┘  └─────────────┘  └─────────────┘
```

### Request Flow

1. **User submits ticket** → Frontend sends POST request to `/api/tickets`
2. **API creates ticket** → Ticket saved to MongoDB with initial status
3. **Inngest event triggered** → `ticket/created` event fired
4. **Background processing** → Inngest function processes ticket asynchronously
5. **AI analysis** → Gemini AI analyzes ticket content
6. **Ticket update** → Priority, notes, and skills updated in database
7. **Moderator assignment** → System finds matching moderator by skills
8. **Email notification** → Moderator receives assignment notification
9. **Response to user** → Frontend receives updated ticket data

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | Latest | NoSQL database for data storage |
| **Mongoose** | 8.17.0 | MongoDB object modeling tool |
| **Inngest** | 3.40.1 | Background job processing & event system |
| **@inngest/agent-kit** | Latest | AI agent framework for Inngest |
| **Google Gemini AI** | 1.5-flash | AI model for ticket analysis |
| **JWT (jsonwebtoken)** | 9.0.2 | Authentication token management |
| **bcrypt** | 6.0.0 | Password hashing |
| **Nodemailer** | 7.0.5 | Email sending service |
| **dotenv** | 17.2.1 | Environment variable management |
| **CORS** | 2.8.5 | Cross-origin resource sharing |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI library for building user interfaces |
| **Vite** | 7.0.4 | Build tool and development server |
| **React Router** | Included | Client-side routing (if used) |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Nodemon** | Auto-restart server during development |
| **ESLint** | Code linting and quality checks |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should show v18.x.x or higher
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **MongoDB** (local installation or MongoDB Atlas account)
   - Local: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)

### Required Accounts & API Keys

1. **Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy and store securely

2. **Inngest Account** (Optional for local dev, required for production)
   - Visit [Inngest](https://www.inngest.com/)
   - Sign up for free account
   - Set up your environment

3. **Email Service** (for notifications)
   - **Mailtrap** (development): [Mailtrap.io](https://mailtrap.io/) - Free account
   - **Production**: SMTP credentials from your email provider (Gmail, SendGrid, etc.)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd ai-ticket-assistant
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd "ai-ticket assistant"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   # Copy the sample env file
   cp ".env sample" .env
   ```

4. Configure environment variables (see [Configuration](#-configuration) section)

### Step 3: Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../ai-ticket-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `ai-ticket assistant` directory with the following variables:

```env
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/ai-ticket-assistant
# Or for MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/ai-ticket-assistant

# JWT Secret Key (use a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Application URL
APP_URL=http://localhost:3000

# Email Configuration (Mailtrap for development)
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_username
MAILTRAP_SMTP_PASS=your_mailtrap_password

# Inngest Configuration (optional for local development)
# INNGEST_EVENT_KEY=your_inngest_key
# INNGEST_SIGNING_KEY=your_signing_key
```

### Frontend Configuration

The frontend connects to the backend API. Update the API endpoint in your frontend code if needed (typically in a config file or environment variable).

---

## 🏃 Running the Application

### Development Mode

#### 1. Start MongoDB

**Local MongoDB:**
```bash
# Windows
net start MongoDB

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**MongoDB Atlas:**
- Ensure your connection string is correct in `.env`
- No local service needed

#### 2. Start Backend Server

```bash
cd "ai-ticket assistant"
npm start
```

For development with auto-reload (if nodemon is configured):
```bash
npm run dev
```

The backend server will start on `http://localhost:3000` (or the PORT specified in your `.env`)

#### 3. Start Inngest Dev Server (Optional)

In a separate terminal:
```bash
cd "ai-ticket assistant"
npm run inngest-dev
```

This runs the Inngest development server for background job processing.

#### 4. Start Frontend Development Server

Open a new terminal:
```bash
cd ai-ticket-frontend
npm run dev
```

The frontend will typically start on `http://localhost:5173` (Vite's default port)

### Production Build

#### Build Frontend

```bash
cd ai-ticket-frontend
npm run build
```

The built files will be in the `dist` directory.

#### Start Production Server

```bash
cd "ai-ticket assistant"
npm start
```

---

## 📚 API Documentation

### Authentication Endpoints

#### `POST /api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "user",
  "skills": ["ReactJS", "NodeJS", "MongoDB"]
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### `POST /api/auth/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### `GET /api/auth/user`
Get current authenticated user (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "role": "user",
  "skills": ["ReactJS", "NodeJS"]
}
```

#### `POST /api/auth/logout`
Logout user (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Ticket Endpoints

#### `GET /api/tickets`
Get all tickets (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "_id": "ticket_id",
    "title": "Login issue",
    "description": "Unable to login to the system",
    "status": "TODO",
    "priority": "high",
    "createdBy": "user_id",
    "assignedTo": "moderator_id",
    "helpfulNotes": "Check authentication credentials and session management",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

#### `GET /api/tickets/:id`
Get a specific ticket by ID (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### `POST /api/tickets`
Create a new ticket (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "title": "Feature request: Dark mode",
  "description": "Users are requesting a dark mode feature for better usability in low-light environments."
}
```

**Response:**
```json
{
  "_id": "ticket_id",
  "title": "Feature request: Dark mode",
  "description": "...",
  "status": "TODO",
  "priority": "medium",
  "createdBy": "user_id",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### `PUT /api/tickets/:id`
Update a ticket (requires authentication, typically admin/moderator only).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "assignedTo": "moderator_id"
}
```

### Inngest Endpoints

#### `POST /api/inngest`
Inngest webhook endpoint (handled automatically by Inngest SDK).

---

## 📁 Project Structure

```
ai-ticket-assistant/
│
├── ai-ticket assistant/          # Backend application
│   ├── controllers/              # Request handlers
│   │   ├── routes/              # Route definitions
│   │   │   ├── ticket.js        # Ticket routes
│   │   │   └── user.js          # User/auth routes
│   │   ├── ticket.js            # Ticket controller logic
│   │   └── user.js              # User controller logic
│   │
│   ├── inngest/                 # Inngest configuration
│   │   ├── client.js            # Inngest client setup
│   │   └── functions/           # Background functions
│   │       ├── on-signup.js     # User signup handler
│   │       └── on-ticket-create.js  # Ticket creation handler
│   │
│   ├── middlewares/             # Express middlewares
│   │   └── auth.js              # JWT authentication middleware
│   │
│   ├── models/                  # MongoDB models
│   │   ├── ticket.js            # Ticket schema
│   │   └── user.js              # User schema
│   │
│   ├── utils/                   # Utility functions
│   │   ├── ai.js                # Gemini AI integration
│   │   └── mailer.js            # Email sending utilities
│   │
│   ├── index.js                 # Application entry point
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables (create this)
│
├── ai-ticket-frontend/          # Frontend application
│   ├── src/
│   │   ├── assets/              # Static assets
│   │   ├── component/           # React components
│   │   │   ├── auth.jsx         # Authentication components
│   │   │   └── check-auth.jsx   # Auth check wrapper
│   │   ├── pages/               # Page components
│   │   │   ├── admin.jsx        # Admin dashboard
│   │   │   ├── login.jsx        # Login page
│   │   │   ├── signup.jsx       # Signup page
│   │   │   ├── ticket.jsx       # Individual ticket view
│   │   │   └── tickets.jsx      # Ticket list view
│   │   ├── index.css            # Global styles
│   │   └── main.jsx             # Application entry point
│   ├── public/                  # Public assets
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
│
└── README.md                    # This file
```

---

## 🔄 How It Works

### Ticket Processing Workflow

1. **Ticket Creation**
   - User submits a ticket through the frontend
   - Backend API creates a ticket document in MongoDB
   - Ticket initially has status "TODO" and basic information

2. **Event Triggering**
   - Creating a ticket triggers an Inngest event: `ticket/created`
   - The event includes the ticket ID and relevant data

3. **Background Processing**
   - Inngest function `onTicketCreated` is invoked asynchronously
   - Function runs in the background, allowing API to respond immediately

4. **AI Analysis**
   - Ticket title and description are sent to Google Gemini AI
   - AI agent analyzes the content using a specialized prompt
   - AI returns:
     - **Summary**: Concise overview of the issue
     - **Priority**: low, medium, high, or urgent
     - **Helpful Notes**: Actionable suggestions for resolution
     - **Related Skills**: Array of relevant technical skills

5. **Ticket Update**
   - AI analysis results are saved to the ticket document
   - Priority, helpful notes, and related skills are updated

6. **Moderator Assignment**
   - System searches for moderators with matching skills
   - Uses regex matching to find users whose skills overlap with ticket requirements
   - If no matching moderator found, assigns to admin
   - Updates ticket with `assignedTo` field

7. **Notification**
   - Email notification sent to assigned moderator
   - Email includes ticket ID and brief description
   - Moderator can log in to view full ticket details

8. **Response**
   - Frontend can fetch updated ticket data
   - Users see AI-generated insights and assignment status

### AI Prompt Engineering

The AI agent uses a carefully crafted system prompt that:
- Defines the agent's role as a ticket triage specialist
- Instructs it to summarize, prioritize, and provide notes
- Requests structured JSON output
- Ensures actionable, tailored responses

### Skill Matching Algorithm

The system uses MongoDB's `$elemMatch` operator with regex to:
- Match moderator skills against ticket-related skills
- Perform case-insensitive matching
- Find partial skill matches (e.g., "React" matches "ReactJS")
- Fallback to admin if no match found

---
