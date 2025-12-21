# 🚀 Interview Question Generator API

A production-ready backend system built with **Node.js, Express, MongoDB, Redis, Cloudinary, and Google Gemini AI** that enables users to securely upload resumes and generate AI-powered interview questions based strictly on resume content.

## ✨ Features

- **🔐 Secure Authentication**: JWT-based auth with HTTP-only cookies
- **📄 Resume Processing**: PDF upload and parsing with Cloudinary storage
- **🤖 AI-Powered Questions**: Generate interview questions using Google Gemini AI
- **⚡ Performance**: Redis caching for rate limiting and token blacklisting
- **🛡️ Security**: Rate limiting, input validation, and token revocation
- **📁 Structured Architecture**: Clean, modular folder structure

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | Backend framework (ESM modules) |
| **MongoDB + Mongoose** | Database and ODM |
| **Redis** | Rate limiting + Token blacklist |
| **JWT + Cookies** | Authentication |
| **Google Gemini AI** | AI question generation |
| **Cloudinary** | File storage (resumes) |
| **Zod** | Input validation |
| **Multer + pdf-parse** | File upload and PDF processing |
| **bcrypt** | Password hashing |

## 📁 Project Structure
PROJECT/
├── controllers/ # Business logic
│ ├── interview.controller.js
│ ├── userRegister.controller.js
│ ├── userlogin.controller.js
│ ├── userlogout.controller.js
│ └── userResumes.controller.js
├── DB/ # Database connections
│ ├── dbConnection.js
│ └── redisConnection.js
├── middleware/ # Express middleware
│ ├── ratelimted.js
│ └── UserAuth.js
├── Models/ # Mongoose schemas
│ ├── user.schema.js
│ └── userResume.schema.js
├── Routes/ # API routes
│ ├── auth.routes.js
│ ├── interview.route.js
│ ├── upload.route.js
│ └── user.route.js
├── utils/ # Utility functions
│ ├── cloudinary.js
│ ├── googleGemini.js
│ ├── multer.js
│ └── systemCongfig1.js
├── Validation/ # Zod validation schemas
│ ├── UserRegister.validation.js
│ ├── UserLogin.validation.js
│ └── UserProfile.Validation.js
├── files/ # Temporary file storage
├── index.js # Application entry point
├── package.json
└── .env # Environment variables


## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Redis instance (local or cloud)
- Cloudinary account
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd interview-question-generator

npm install

Create a .env file in the root directory:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
REDIS_URL=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

# Development mode
npm run dev

# Production mode
npm run server



## 🛡️ Middleware

### Rate Limiter (`ratelimted.js`)
- **20 requests per IP** per 120 seconds
- Implemented using Redis `INCR` and `EXPIRE`
- Prevents API abuse and DoS attacks

### User Authentication (`UserAuth.js`)
- Validates JWT from cookies
- Checks Redis blacklist for revoked tokens
- Attaches `req.user_id` to authenticated requests

## 📚 API Documentation

### Base URL
http://localhost:5000/



### 🔑 Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "username": "john123",
  "email": "john@gmail.com",
  "password": "securePassword123"
}

### Login User
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@gmail.com",
  "password": "securePassword123"
}

GET /api/logout

POST /resumes/upload
Content-Type: multipart/form-data
Cookie: token=JWT_TOKEN

file: resume.pdf

