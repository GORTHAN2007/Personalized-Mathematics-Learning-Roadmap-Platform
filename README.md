# Personalized Mathematics Learning Roadmap Platform

An interactive web platform that generates personalised mathematics learning roadmaps, provides structured subject discovery, and integrates an AI tutor powered by Google Gemini so students can get instant explanations and practice questions for any topic.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express (CommonJS) |
| Database | PostgreSQL on [Neon](https://neon.tech) via Prisma ORM |
| AI | Google Gemini API (`@google/generative-ai`) |

---

## Team

| Name | Role |
|---|---|
| Aayush | AI integration (frontend & backend AI module) |
| Arju Srivastav | Backend & database |
| Mohd Kaif | Frontend |

---

## Repository Structure

```
/
├── frontend/        # React + Vite app
├── backend/         # Node/Express API
└── README.md
```

---

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env` with the variables listed below, then:

```bash
npx prisma generate
npx prisma migrate deploy   # or: npx prisma db push
npm run dev                 # starts on PORT (default 5050)
```

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` with the variable listed below, then:

```bash
npm run dev    # Vite reads .env only on startup — restart after any .env change
```

> **Note:** Browsers block port 6000 (Chrome/Edge treat it as an unsafe port). Port 5000 may be claimed by macOS AirPlay Receiver. Use a different port such as **5050**.

---

## Environment Variables

### Backend — `backend/.env`

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (e.g. `5050`) |
| `DATABASE_URL` | Neon PostgreSQL connection string (e.g. `postgresql://user:pass@host/db?sslmode=require`) |
| `GEMINI_API_KEY` | Your Google Gemini API key |
| `GEMINI_MODEL` | Gemini model name (e.g. `gemini-1.5-flash`) |
| `JWT_SECRET` | Secret used to sign JWT authentication tokens |
| `NODE_ENV` | Runtime environment (`development` / `production`) |

### Frontend — `frontend/.env`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API (e.g. `http://localhost:5050/api/v1`) |

> **Never commit `.env` files or real secret values.**

---

## AI Endpoints

All routes are prefixed with `/api/v1`.

### `POST /api/v1/ai/explain`

Returns a plain-text explanation for a question about a mathematical topic.

**Request**

```json
{
  "topic": "Linear Algebra",
  "question": "What is a basis?",
  "level": "beginner"
}
```

`level` is optional.

**Response**

```json
{
  "explanation": "A basis for a vector space is the smallest set of vectors that spans the space and is linearly independent …"
}
```

---

### `POST /api/v1/ai/practice-questions`

Returns multiple-choice practice questions with answers and per-question explanations.

**Request**

```json
{
  "topic": "Eigenvalues",
  "difficulty": "easy",
  "count": 3
}
```

`difficulty` defaults to `"easy"`; `count` defaults to `5`.

**Response**

```json
{
  "questions": [
    {
      "question": "Which equation is used to find eigenvalues λ of matrix A?",
      "options": [
        "Ax = λ",
        "det(A) = λ",
        "A + λI = 0",
        "det(A - λI) = 0"
      ],
      "correctIndex": 3,
      "explanation": "The characteristic equation det(A - λI) = 0 gives the eigenvalues …"
    }
  ]
}
```

`correctIndex` is a zero-based index into the `options` array.

---

## Running in Development

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend (restart whenever you edit .env)
cd frontend && npm run dev
```

Open `http://localhost:5173` (or whichever port Vite reports) in your browser.
Navigate to the **Subject Discovery** page to see the AI Tutor panel.
