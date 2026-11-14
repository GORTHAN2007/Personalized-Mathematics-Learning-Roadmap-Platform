# MathPath REST API Documentation

Base URL:
- Local Development: `http://localhost:5001/api/v1`
- Production (Render): `https://<your-service>.onrender.com/api/v1`

---

## 🔒 Authentication Standard
Protected endpoints require an `Authorization` header containing a valid JSON Web Token (JWT):
```http
Authorization: Bearer <jwt_token>
```

---

## 1. Authentication Endpoints (`/auth`)

### `POST /auth/register`
Creates a new student account.

- **Request Body**:
  ```json
  {
    "email": "student@mathpath.ai",
    "password": "Password123!",
    "name": "Arju Srivastav",
    "role": "STUDENT"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "uuid-v4",
        "email": "student@mathpath.ai",
        "name": "Arju Srivastav",
        "role": "STUDENT"
      },
      "token": "eyJhbGciOi..."
    }
  }
  ```

### `POST /auth/login`
Authenticates existing users and returns a JWT.

- **Request Body**:
  ```json
  {
    "email": "student@mathpath.ai",
    "password": "Password123!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged in successfully",
    "data": {
      "user": { ... },
      "token": "eyJhbGciOi..."
    }
  }
  ```

### `GET /auth/me` *(Protected)*
Fetches the currently authenticated profile.

- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-v4",
      "email": "student@mathpath.ai",
      "name": "Arju Srivastav",
      "role": "STUDENT"
    }
  }
  ```

---

## 2. Interactive Notes Endpoints (`/notes`)

All notes endpoints are scoped strictly to the authenticated user.

### `GET /notes` *(Protected)*
Retrieves all notes created by the current user, ordered by most recently updated.

- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Notes retrieved successfully",
    "data": [
      {
        "id": "uuid-v4",
        "userId": "uuid-v4",
        "title": "Row Reduction Notes",
        "content": "Key insight: A matrix is in RREF when...",
        "tag": "Linear Algebra",
        "createdAt": "2026-11-14T18:51:35.421Z",
        "updatedAt": "2026-11-14T18:51:35.421Z"
      }
    ]
  }
  ```

### `POST /notes` *(Protected)*
Creates a new note for the authenticated user.

- **Request Body**:
  ```json
  {
    "title": "Eigenvalue Intuition",
    "content": "Av = λv where v is non-zero.",
    "tag": "Linear Algebra"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Note created",
    "data": { ... }
  }
  ```

### `PUT /notes/:id` *(Protected)*
Updates an existing note owned by the user.

- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content..."
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Note updated",
    "data": { ... }
  }
  ```

### `DELETE /notes/:id` *(Protected)*
Permanently deletes a note.

- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Note deleted",
    "data": null
  }
  ```

---

## 3. AI Module Endpoints (`/ai`)

Powered by Google Gemini.

### `POST /ai/explain`
Generates a conceptual explanation with a worked example under 250 words.

- **Request Body**:
  ```json
  {
    "topic": "Linear Algebra",
    "question": "What is an eigenvalue geometrically?",
    "level": "beginner"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "explanation": "An eigenvalue is a scalar that represents how much an eigenvector is stretched or squished..."
  }
  ```

### `POST /ai/practice-questions`
Generates 5 multiple choice questions with shuffled options and step-by-step explanations.

- **Request Body**:
  ```json
  {
    "topic": "Determinants",
    "difficulty": "medium",
    "count": 5
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "questions": [
      {
        "question": "If det(A) = 4 for a 2x2 matrix, what is det(2A)?",
        "options": ["8", "16", "4", "2"],
        "correctIndex": 1,
        "explanation": "For an n x n matrix, det(cA) = c^n det(A). Here 2^2 * 4 = 16."
      }
    ]
  }
  ```

### `POST /ai/suggest-roadmap`
Returns an AI-tailored study progression based on weak topics and target goals.

- **Request Body**:
  ```json
  {
    "weakTopics": ["Vector Spaces", "Eigenvalues"],
    "goal": "Machine Learning Foundations at a Steady pace"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "roadmap": [
      { "topic": "Basis and Dimension", "reason": "Essential prerequisite for projecting onto subspaces" },
      { "topic": "Orthogonal Projections", "reason": "Directly used in least squares optimization" }
    ]
  }
  ```

---

## 4. Subjects & Topics Endpoints (`/subjects`, `/topics`)

### `GET /subjects`
Returns all curriculum subjects with their associated units and difficulty.

### `GET /subjects/:slug`
Fetches a single subject by its slug identifier (e.g. `linear-algebra`).

### `GET /topics/subject/:subjectId`
Retrieves all topics linked to a given subject ID.

---

## 5. System Health Check (`/health`)

### `GET /api/health`
Returns operational health status.

- **Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "message": "MathPath AI Backend is running smoothly",
    "timestamp": "2026-11-15T02:24:00.000Z"
  }
  ```
