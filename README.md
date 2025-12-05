# 🩺 MedGuide AI

> AI-powered clinical workflow assistant delivering structured symptom analysis, triage assistance, and patient guidance for dental, surgical, and orthopaedic practices.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?logo=flask)](https://flask.palletsprojects.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**MedGuide AI** is an enterprise-grade healthcare platform that transforms chaotic patient intake into structured, trackable workflows. Built for dentists, surgeons, orthopaedic specialists, and multi-specialty hospitals, it provides:

- **Structured Symptom Analysis**: AI-guided conversations that organize patient symptoms into clinician-ready summaries
- **Intelligent Triage**: Priority-based case management using structured decision-support tools
- **HIPAA-Aligned Security**: Enterprise-grade encryption with audit-ready conversation history
- **US Healthcare Compliant**: Safe, compliant copy and features designed for the US healthcare market

### The Problem We Solve

Healthcare practitioners aren't short of expertise—they're short of **time**. MedGuide AI addresses:

- ❌ Unstructured patient intake (WhatsApp, calls, vague notes)
- ❌ Manual triage with buried high-risk cases
- ❌ Repetitive post-op follow-ups
- ❌ Scattered booking systems
- ❌ No centralized dashboard for patient queries

### Our Solution

✅ **Structured intake & triage** with specialty-aware AI questions  
✅ **Audit-ready history** with compliant conversation trails  
✅ **Source-aware guidance** constrained to approved medical documents  
✅ **Chat-native booking** (roadmap)  
✅ **Admin dashboard** for real-time monitoring (roadmap)

---

## ✨ Features

### 🎯 Core Features

- **AI-Powered Chat Interface**
  - Real-time medical conversation with context awareness
  - Specialty-specific question flows (Dental, Surgery, Orthopaedics)
  - Multi-turn conversation with memory

- **Advanced Symptom Analysis**
  - Structured symptom extraction and organization
  - Urgency-based triage recommendations
  - Clinical context summarization

- **User Management**
  - Secure authentication with JWT tokens + Google OAuth
  - Role-based access control (Patient, Clinician, Admin)
  - Conversation history per user

- **Conversation Storage**
  - MongoDB-based chat history
  - Audit trail for compliance
  - Searchable patient interactions

### 🚀 **NEW: Lead Generation & Client Acquisition**

- **Landing Page Chatbot Widget** 🤖
  - Floating chat button with interactive qualification bot
  - Smart lead qualification with specialty detection
  - Conversational pitch for service offerings
  - Lead capture form after 2-3 message exchanges
  - LocalStorage persistence for conversation continuity
  - Source tracking: `landing_chatbot`

- **Functional Contact Form** 📝
  - Full contact form with specialty dropdown
  - API integration with lead capture system
  - Success/error feedback with validation
  - Auto-reset after successful submission
  - Source tracking: `contact_form`

- **Booking Modal System** 📅
  - Beautiful modal popup for consultation bookings
  - Comprehensive form (name, email, phone, specialty, date, notes)
  - Integrated across landing page and chat interface
  - Smooth animations with responsive design
  - Source tracking: `booking_modal`

- **Email Notification System** 📧
  - Automated admin alerts for new leads
  - Welcome emails to captured leads
  - Conversation history in notifications
  - Specialty extraction and metadata
  - Powered by Nodemailer with Gmail integration

- **Lead Management API**
  - MongoDB Lead model with full tracking
  - Source-based analytics (chatbot/form/booking)
  - Status management (new/contacted/qualified/converted)
  - Admin endpoints for lead viewing and updates
  - Metadata capture (specialty, practice size, etc.)

### 🎨 Frontend Features

- **Modern Landing Page**
  - Animated rotating specialty text (10 medical fields)
  - Responsive design with Framer Motion animations
  - SEO-optimized with structured data
  - US healthcare compliance messaging

- **Modular Component Architecture**
  - 17+ reusable landing components (including new booking/chat widgets)
  - Consistent design system
  - Easy to maintain and extend

- **Interactive UI**
  - FAQ accordion
  - Functional contact form with API integration
  - Success stories
  - Solutions showcase
  - **NEW:** Floating chatbot widget
  - **NEW:** Booking modal

### 🔒 Security & Compliance

- HIPAA-style security architecture
- Enterprise-grade encryption (AES-256)
- Secure authentication (JWT with HTTP-only cookies + Google OAuth)
- CORS protection
- Rate limiting
- Input sanitization
- **NEW:** Lead data privacy and secure storage

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **SEO**: React Helmet Async

### Backend
- **Framework**: Node.js + Express
- **Database**: MongoDB (Mongoose ODM)
- **AI/ML**: 
  - Google Generative AI (Gemini)
  - LangChain for conversation chains
  - FAISS for vector search
  - Sentence Transformers for embeddings
- **Authentication**: 
  - JWT (jsonwebtoken)
  - Google OAuth 2.0 (google-auth-library)
- **Email**: Nodemailer (Gmail integration)
- **API**: RESTful architecture
- **CORS**: cors middleware
- **Security**: Helmet, rate-limit

### DevOps & Tools
- **Version Control**: Git
- **Package Management**: npm (frontend), pip (backend)
- **Environment**: dotenv for configuration
- **Development**: Hot reload with Vite and Flask debug mode

---

## 🏗 Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Port 5173)   │
└────────┬────────┘
         │ HTTP/REST
         ▼
┌─────────────────┐
│  Flask Backend  │
│   (Port 5000)   │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬──────────┐
    ▼         ▼          ▼          ▼
┌────────┐ ┌─────┐ ┌─────────┐ ┌──────┐
│MongoDB │ │ JWT │ │ Gemini  │ │FAISS │
│  DB    │ │Auth │ │   AI    │ │Vector│
└────────┘ └─────┘ └─────────┘ └──────┘
```

### Component Architecture (Frontend)

```
src/
├── pages/
│   └── Landing.jsx (Main orchestrator - 76 lines)
├── components/
│   ├── landing/
│   │   ├── Navigation.jsx
│   │   ├── HeroSection.jsx
│   │   ├── StatsSection.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── SpecialtiesSection.jsx
│   │   ├── WhyWorkWithUs.jsx
│   │   ├── InnovationSection.jsx
│   │   ├── ProblemSolutionSection.jsx
│   │   ├── CTABanner.jsx
│   │   ├── SolutionsSection.jsx
│   │   ├── SuccessStories.jsx
│   │   ├── FAQSection.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Icons.jsx
│   │   └── constants.js
│   └── SEO.jsx
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **MongoDB** (local or Atlas)
- **Google AI API Key** (for Gemini)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MedGuide-AI.git
cd MedGuide-AI
```

#### 2. Backend Setup

```bash
cd medical-bot-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start the server
python server.js
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd medical-bot-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### Quick Start with npm

```bash
# Terminal 1 - Backend
cd medical-bot-backend && npm run dev

# Terminal 2 - Frontend
cd medical-bot-frontend && npm run dev
```

---

## 📁 Project Structure

```
MedGuide-AI/
├── medical-bot-backend/          # Node.js/Express backend
│   ├── config/                   # Configuration files
│   ├── controllers/              # Route controllers
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── chatController.js
│   │   └── landingController.js  # NEW: Lead capture endpoints
│   ├── middleware/               # Auth & validation
│   ├── models/                   # MongoDB models
│   │   ├── User.js
│   │   ├── Lead.js               # NEW: Lead tracking model
│   │   └── Conversation.js
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── adminRoutes.js
│   │   └── landing.js            # NEW: Lead generation routes
│   ├── services/                 # Business logic
│   │   ├── geminiService.js
│   │   └── ragService.js
│   ├── utils/                    # Helper functions
│   │   ├── logger.js
│   │   └── emailNotifier.js      # NEW: Email notification system
│   ├── data/                     # Medical knowledge base
│   ├── .env.example
│   ├── EMAIL_SETUP.md            # NEW: Email configuration guide
│   ├── package.json
│   └── server.js
│
├── medical-bot-frontend/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/          # Landing page components
│   │   │   │   ├── Navigation.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── ContactForm.jsx        # UPDATED: API integration
│   │   │   │   ├── CTABanner.jsx          # UPDATED: Booking modal
│   │   │   │   ├── LandingChatWidget.jsx  # NEW: Chatbot widget
│   │   │   │   ├── BookingModal.jsx       # NEW: Booking modal
│   │   │   │   └── ...
│   │   │   ├── ChatInput.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── SEO.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Landing.jsx        # UPDATED: Widget integration
│   │   │   ├── Chat.jsx           # UPDATED: Booking modal
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── README.md
├── legal_bot_pitch_strategy.md
└── legal_setup_guide.md
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request:**
```json
{
  "email": "doctor@clinic.com",
  "password": "SecurePassword123",
  "name": "Dr. Smith",
  "role": "clinician"
}
```

**Response:**
```json
{
  "success": true,
  "user": { "id": "...", "email": "...", "name": "..." },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/login`
Authenticate user.

#### POST `/api/auth/google`
Authenticate with Google OAuth.

**Request:**
```json
{
  "idToken": "google_id_token_here"
}
```

### **NEW: Lead Generation Endpoints**

#### POST `/api/landing/lead`
Capture lead information from landing page (chatbot, contact form, or booking modal).

**Request:**
```json
{
  "name": "Dr. John Smith",
  "email": "john@practice.com",
  "phone": "+91-9140585097",
  "conversation": [
    { "role": "user", "content": "Message content" }
  ],
  "source": "landing_chatbot|contact_form|booking_modal",
  "metadata": {
    "specialty": "Dental",
    "preferredDate": "2025-12-10",
    "formMessage": "Additional notes"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead captured successfully",
  "leadId": "lead_12345"
}
```

#### GET `/api/landing/leads`
Get all captured leads (admin only).

**Query Parameters:**
- `status`: Filter by status (new/contacted/qualified/converted)
- `source`: Filter by source (landing_chatbot/contact_form/booking_modal)
- `limit`: Results per page (default: 50)
- `skip`: Pagination offset

**Response:**
```json
{
  "success": true,
  "leads": [...],
  "total": 42
}
```

#### PATCH `/api/landing/leads/:leadId`
Update lead status and add notes (admin only).

### Chat Endpoints

#### POST `/api/chat/message`
Send a message to the AI assistant.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request:**
```json
{
  "message": "I have pain in my lower back",
  "conversationId": "optional_conversation_id"
}
```

**Response:**
```json
{
  "response": "AI generated response",
  "conversationId": "conv_12345",
  "timestamp": "2025-11-25T08:00:00Z"
}
```

#### GET `/api/chat/history`
Get user's conversation history.

### User Endpoints

#### GET `/api/user/profile`
Get current user profile.

#### PUT `/api/user/profile`
Update user profile.

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/medguide-ai
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/medguide

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Google AI
GOOGLE_API_KEY=your_google_gemini_api_key

# Google OAuth
GOOGLE_CLIENT_IDS=your-client-id.apps.googleusercontent.com

# Email Notifications (Optional)
ENABLE_EMAIL_NOTIFICATIONS=true
ADMIN_EMAIL=ashishsharmastudio@gmail.com
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password

# CORS
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=MedGuide AI
```

---

## 🌐 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
cd medical-bot-frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Render/Railway/Heroku)

```bash
cd medical-bot-backend
# Configure environment variables in platform
# Platform will run: python server.js
```

### Docker (Optional)

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- **Frontend**: ESLint + Prettier
- **Backend**: PEP 8 (Python)
- Use meaningful commit messages
- Write tests for new features

### Development Workflow

1. Check existing issues or create a new one
2. Discuss the approach before major changes
3. Keep PRs focused and atomic
4. Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for natural language processing
- **LangChain** for conversation management
- **Framer Motion** for beautiful animations
- **Tailwind CSS** for utility-first styling
- Healthcare professionals who provided domain expertise

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/MedGuide-AI/issues)
- **Email**: support@medguide-ai.com
- **Website**: [https://medguide-ai.com](https://medguide-ai.com)

---

## 🗺 Roadmap

### ✅ Completed
- [x] Landing page chatbot widget for lead generation
- [x] Functional contact form with API integration
- [x] Booking modal system across the platform
- [x] Email notification system (admin alerts + lead welcome emails)
- [x] Lead management API with MongoDB storage
- [x] Google OAuth authentication
- [x] Multi-client ID support for OAuth

### 🚀 In Progress
- [ ] Lead management dashboard (admin UI)
- [ ] Advanced analytics for lead conversion tracking
- [ ] Calendar integration (Calendly embed in booking modal)

### 📋 Planned
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Mobile applications (iOS/Android)
- [ ] Integration with EHR systems
- [ ] Telehealth video consultation
- [ ] WhatsApp Business API integration
- [ ] SMS notifications for appointments
- [ ] Advanced reporting with charts and metrics

---

<div align="center">

**Built with ❤️ for healthcare professionals**

[⭐ Star us on GitHub](https://github.com/yourusername/MedGuide-AI) • [🐛 Report Bug](https://github.com/yourusername/MedGuide-AI/issues) • [✨ Request Feature](https://github.com/yourusername/MedGuide-AI/issues)

</div>
