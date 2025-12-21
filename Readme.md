
# 🚀 Interview Question Generator API

A production-ready backend system built with **Node.js, Express, MongoDB, Redis, Cloudinary, and Google Gemini AI** that enables users to securely upload resumes and generate AI-powered interview questions strictly based on resume content.

---

## ✨ Features

- 🔐 **Secure Authentication** – JWT-based auth with HTTP-only cookies  
- 📄 **Resume Processing** – PDF upload with Cloudinary storage  
- 🤖 **AI-Powered Questions** – Resume-based interview questions using Google Gemini  
- ⚡ **High Performance** – Redis for rate limiting & token blacklisting  
- 🛡️ **Security** – Input validation, token revocation, rate limiting  
- 📁 **Clean Architecture** – Modular & scalable folder structure  

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---------|---------|
| Node.js + Express | Backend framework (ESM) |
| MongoDB + Mongoose | Database & ODM |
| Redis | Rate limiting & token blacklist |
| JWT + Cookies | Authentication |
| Google Gemini AI | AI question generation |
| Cloudinary | Resume file storage |
| Zod | Input validation |
| Multer | File upload handling |
| bcrypt | Password hashing |

---

## 📁 Project Structure

```

PROJECT/
├── controllers/
│   ├── interview.controller.js
│   ├── userRegister.controller.js
│   ├── userlogin.controller.js
│   ├── userlogout.controller.js
│   └── userResumes.controller.js
│
├── DB/
│   ├── dbConnection.js
│   └── redisConnection.js
│
├── middleware/
│   ├── ratelimted.js
│   └── UserAuth.js
│
├── Models/
│   ├── user.schema.js
│   └── userResume.schema.js
│
├── Routes/
│   ├── auth.routes.js
│   ├── interview.route.js
│   ├── upload.route.js
│   └── user.route.js
│
├── utils/
│   ├── cloudinary.js
│   ├── googleGemini.js
│   ├── multer.js
│   └── systemCongfig1.js
│
├── Validation/
│   ├── UserRegister.validation.js
│   ├── UserLogin.validation.js
│   └── UserProfile.Validation.js
│
├── files/              # Temporary uploaded files
├── index.js            # App entry point
├── package.json
└── .env

````

---

## 🚀 Quick Start

### ✅ Prerequisites

- Node.js **v18+**
- MongoDB (Atlas or local)
- Redis (local or cloud)
- Cloudinary account
- Google Gemini API key

---

## 📦 Installation

### 1️⃣ Clone repository
```bash
git clone <repository-url>
cd interview-question-generator
````

### 2️⃣ Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_PASS=your_jwt_secret

# Redis
REDIS_USER_NAME=default
REDIS_PASSWORD=your_redis_password
SOCKET_HOST=localhost
SOCKET_PORT=6379

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Gemini
GOOGLE_GENAI_KEY=your_gemini_api_key
```

---

## ▶️ Running the Project

### Development

```bash
npm run server
```

Server will run at:

```
http://localhost:5000
```

---

## 🔐 Authentication Flow

* JWT stored in **HTTP-only cookies**
* Protected routes use **UserAuth middleware**
* Logout **blacklists JWT in Redis**
* Rate limiting: **20 requests / 2 minutes per IP**

---

## 🛡️ Middleware

### 🚦 Rate Limiter (`ratelimted.js`)

* 20 requests per IP per 120 seconds
* Uses Redis `INCR` + `EXPIRE`

### 🔑 UserAuth (`UserAuth.js`)

* Reads JWT from cookies
* Checks Redis blacklist
* Attaches `req.user_id`

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000
```

---

### 🔑 Authentication Routes (`/api`)

#### Register

```http
POST /api/register
Content-Type: application/json

{
  "username": "john123",
  "email": "john@gmail.com",
  "password": "12345"
}
```

---

#### Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "john@gmail.com",
  "password": "12345"
}
```

✔ Sets JWT in cookies

---

#### Logout (Protected)

```http
GET /api/logout
```

✔ Clears cookie
✔ Blacklists token in Redis

---

### 📄 Resume Upload (`/resumes`)

```http
POST /resumes/upload
Content-Type: multipart/form-data
Cookie: token=JWT_TOKEN
```

Form-Data:

```
file: resume.pdf
```

✔ Stored in Cloudinary
✔ Resume URL saved in DB

---

### 🤖 AI Interview Questions (`/start`)

```http
POST /start/interview
Cookie: token=JWT_TOKEN
Content-Type: application/json
```

Body:

```json
{
  "instruction": "Focus on backend and Node.js",
  "difficulty": "medium",
  "no_of_Q": 10
}
```

Response:

```json
{
  "questions": [
    "Explain how you handled authentication in your Node.js project.",
    "What challenges did you face while using MongoDB indexes?"
  ]
}
```

⚠️ Resume upload required before this step

---

## 🧠 AI Logic

* Resume PDF sent to **Google Gemini**
* Questions generated from:

  * Resume skills
  * Projects
  * User preferences
* Output is **STRICT JSON**
* ❌ No answers
* ❌ No numbering
* ❌ No markdown

---

## 📦 Security Features

* bcrypt password hashing
* JWT expiry (1 day)
* Redis token revocation
* Rate limiting
* Zod validation
* HTTP-only cookies

---

## ❗ Future Improvements

* Role-based access (Admin/User)
* Refresh token support
* Swagger API docs
* Logging with Winston
* File size & MIME validation

---

## 👨‍💻 Author Notes

This project showcases **real-world backend engineering concepts**:

* Authentication & Security
* Redis usage
* AI integration
* File handling
* Clean, scalable architecture

🎯 **Ideal for interviews, portfolios, and production learning**

```

---

If you want, I can next:
- ✅ Add **Swagger/OpenAPI**
- ✅ Create **Postman collection**
- ✅ Write **deployment guide (Vercel / AWS / Docker)**
```
