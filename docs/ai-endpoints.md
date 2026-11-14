# AI Endpoints

Base URL: `http://localhost:5050/api/v1` (configure via `VITE_API_URL` on the frontend or `API_URL` in the smoke test).

---

## POST `/ai/explain`

Returns a plain-text explanation for a student's question about a mathematical topic.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `topic` | string | ✅ | Non-empty, max 100 characters |
| `question` | string | ✅ | Non-empty, max 500 characters |
| `level` | string | ❌ | Passed to the AI prompt; defaults to `"beginner"` inside the service |

### Example request

```bash
curl -X POST http://localhost:5050/api/v1/ai/explain \
  -H "Content-Type: application/json" \
  -d '{"topic":"Linear Algebra","question":"What is a basis?"}'
```

### Example response — 200 OK

```json
{
  "explanation": "A basis for a vector space is the smallest possible set of vectors that can generate any vector in that space through linear combinations, with no redundancy. For the 2-D plane the standard basis is {(1,0),(0,1)}."
}
```

### Error responses

| Status | Body | Cause |
|---|---|---|
| 400 | `{"error":"topic and question are required"}` | `topic` or `question` missing or blank |
| 400 | `{"error":"topic must be at most 100 characters"}` | `topic` exceeds 100 chars |
| 400 | `{"error":"question must be at most 500 characters"}` | `question` exceeds 500 chars |
| 502 | `{"error":"AI service failed, try again"}` | Gemini call failed after up to 1 retry |

---

## POST `/ai/practice-questions`

Returns multiple-choice practice questions with per-question explanations. The service retries once automatically if Gemini returns malformed JSON.

### Request body

| Field | Type | Required | Validation |
|---|---|---|---|
| `topic` | string | ✅ | Non-empty, max 100 characters |
| `difficulty` | string | ❌ | `"easy"` (default), `"medium"`, or `"hard"` |
| `count` | number | ❌ | Clamped to 1–10 by the service; defaults to 5 |

### Example request

```bash
curl -X POST http://localhost:5050/api/v1/ai/practice-questions \
  -H "Content-Type: application/json" \
  -d '{"topic":"Eigenvalues","difficulty":"easy","count":3}'
```

### Example response — 200 OK

```json
{
  "questions": [
    {
      "question": "Which equation is used to find the eigenvalues λ of a square matrix A?",
      "options": [
        "Ax = λ",
        "det(A) = λ",
        "A + λI = 0",
        "det(A - λI) = 0"
      ],
      "correctIndex": 3,
      "explanation": "The characteristic equation det(A - λI) = 0 gives the eigenvalues. For non-trivial solutions the matrix (A - λI) must be singular, so its determinant is zero."
    }
  ]
}
```

> **Note:** options are shuffled on the server before being returned, so `correctIndex` reflects the shuffled order — not the original order Gemini produced.

### Error responses

| Status | Body | Cause |
|---|---|---|
| 400 | `{"error":"topic is required"}` | `topic` missing or blank |
| 400 | `{"error":"topic must be at most 100 characters"}` | `topic` exceeds 100 chars |
| 400 | `{"error":"difficulty must be easy, medium, or hard"}` | Invalid `difficulty` value |
| 502 | `{"error":"AI service failed, try again"}` | Both Gemini attempts returned malformed output |

---

## Running the smoke test

```bash
cd backend
npm run test:ai
# or with a custom base URL:
API_URL=http://localhost:5050/api/v1 npm run test:ai
```

Prints `OK` for each passing endpoint and exits with code 1 if either call fails.
