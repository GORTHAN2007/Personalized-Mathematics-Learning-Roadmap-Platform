# MathPath AI - Complete API Documentation

Base URL: `http://localhost:5001/api/v1` (or production host)

All responses follow the unified format:
```json
{
  "success": true,
  "message": "Descriptive message",
  "data": { ... }
}
```

---

## 1. Authentication (`/api/v1/auth`)

### Register User
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/register`
- **Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Password123!",
    "role": "STUDENT" // optional: STUDENT, EDUCATOR, ADMIN
  }
  ```
- **Response**: `201 Created` with `{ user, token }`

### Login User
- **Method**: `POST`
- **Endpoint**: `/api/v1/auth/login`
- **Body**:
  ```json
  {
    "email": "jane@example.com",
    "password": "Password123!"
  }
  ```
- **Response**: `200 OK` with `{ user, token }`

### Get Current User Profile
- **Method**: `GET`
- **Endpoint**: `/api/v1/auth/me`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response**: `200 OK` with user details and counts (`roadmaps`, `progress`, `results`).

---

## 2. Subjects (`/api/v1/subjects`)

### Get All Subjects
- **Method**: `GET`
- **Endpoint**: `/api/v1/subjects`
- **Response**: List of subjects with topic counts.

### Get Subject by Slug
- **Method**: `GET`
- **Endpoint**: `/api/v1/subjects/:slug` (e.g. `/api/v1/subjects/algebra`)
- **Response**: Subject details with all its ordered topics.

### Create Subject (Admin/Educator)
- **Method**: `POST`
- **Endpoint**: `/api/v1/subjects`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**: `{ "title": "Calculus", "slug": "calculus", "description": "...", "icon": "Activity" }`

---

## 3. Topics (`/api/v1/topics`)

### Get Topics
- **Method**: `GET`
- **Endpoint**: `/api/v1/topics`
- **Query Params**:
  - `subjectId`: filter by subject UUID
  - `difficulty`: `BEGINNER`, `INTERMEDIATE`, `ADVANCED`

### Get Topic by Slug
- **Method**: `GET`
- **Endpoint**: `/api/v1/topics/:slug`
- **Response**: Topic details, parent subject, and associated questions.

---

## 4. Personalized Roadmap Engine (`/api/v1/roadmap`)

### Generate Personalized Roadmap
- **Method**: `POST`
- **Endpoint**: `/api/v1/roadmap/generate`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "title": "Algebra Fast-Track",
    "subjectId": "<SUBJECT_UUID>",
    "difficulty": "BEGINNER"
  }
  ```
- **Behavior**: Generates node graph. Sets starting node to `IN_PROGRESS` and remaining to `LOCKED`.

### Get My Roadmaps
- **Method**: `GET`
- **Endpoint**: `/api/v1/roadmap/my-roadmaps`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Response**: List of all user's generated roadmaps with complete node statuses.

### Get Roadmap by ID
- **Method**: `GET`
- **Endpoint**: `/api/v1/roadmap/:id`
- **Headers**: `Authorization: Bearer <TOKEN>`

### Update Node Progress
- **Method**: `PATCH`
- **Endpoint**: `/api/v1/roadmap/nodes/:nodeId/status`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**: `{ "status": "COMPLETED" }` // `LOCKED`, `IN_PROGRESS`, `COMPLETED`
- **Behavior**: Marks node status and automatically updates overall `TopicProgress`.

---

## 5. Assessments & Quizzes (`/api/v1/assessment`)

### Get All Assessments
- **Method**: `GET`
- **Endpoint**: `/api/v1/assessment`

### Get Assessment Details
- **Method**: `GET`
- **Endpoint**: `/api/v1/assessment/:id`
- **Response**: Quiz questions and choices (without exposing answers).

### Submit Assessment Answers
- **Method**: `POST`
- **Endpoint**: `/api/v1/assessment/:id/submit`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "answers": {
      "<QUESTION_ID_1>": "4",
      "<QUESTION_ID_2>": "(x + 3)(x - 3)"
    }
  }
  ```
- **Response**: Graded score (`score`, `totalQuestions`, `correctCount`, `passed`, `details`).

### Get My Quiz Results
- **Method**: `GET`
- **Endpoint**: `/api/v1/assessment/my-results`
- **Headers**: `Authorization: Bearer <TOKEN>`

---

## 6. Community Forum (`/api/v1/community`)

### Get Discussion Posts
- **Method**: `GET`
- **Endpoint**: `/api/v1/community/posts`
- **Query Params**:
  - `tag`: filter by topic tag (e.g. `algebra`, `calculus`)
  - `search`: search keywords in title or content
  - `page`: page number (default 1)
  - `limit`: results per page (default 10)
- **Response**: List of posts with author details, `score` (upvotes - downvotes), and comment counts.

### Get Post Thread
- **Method**: `GET`
- **Endpoint**: `/api/v1/community/posts/:id`
- **Response**: Full post with discussion thread and comments.

### Create Post
- **Method**: `POST`
- **Endpoint**: `/api/v1/community/posts`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  ```json
  {
    "title": "Intuitive explanation of limits?",
    "content": "Can anyone explain delta-epsilon intuitively?",
    "tags": ["calculus", "limits"]
  }
  ```

### Add Comment
- **Method**: `POST`
- **Endpoint**: `/api/v1/community/posts/:id/comments`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**: `{ "content": "Think of it as an interactive challenge game..." }`

### Vote on Post
- **Method**: `POST`
- **Endpoint**: `/api/v1/community/posts/:id/vote`
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Body**:
  - `{ "value": 1 }` (Upvote)
  - `{ "value": -1 }` (Downvote)
  - `{ "value": 0 }` (Remove vote)
