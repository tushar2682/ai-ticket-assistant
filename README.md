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

