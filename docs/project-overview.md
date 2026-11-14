# Project Overview: MathPath AI

**MathPath AI** is a full-stack, community-driven, personalized mathematics learning platform designed to help students master core mathematical disciplines—ranging from foundational Linear Algebra to advanced Cryptography and Stochastic Processes—through personalized learning paths, interactive workbooks, dynamic visual simulations, and an integrated AI tutor.

---

## 🎯 Problem Statement
Mathematics education at the collegiate and self-taught level often suffers from:
1. **Disconnected Concepts**: Students struggle to see how abstract formulas (e.g., matrices or gradients) connect to real-world applications like computer vision, machine learning, and game physics.
2. **One-Size-Fits-All Pacing**: Traditional syllabi do not adapt to individual background levels, weekly availability, or specific career goals.
3. **Passive Consumption**: Most math websites present static text rather than interactive workbooks, visual simulations, and on-demand problem explanations.

---

## 💡 Solution: MathPath Platform Architecture

MathPath bridges conceptual theory, geometric intuition, and practical application with four core pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MathPath Platform                               │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
┌──────────────┐            ┌──────────────┐             ┌──────────────┐
│  Curriculum  │            │ Interactive  │             │   AI Tutor   │
│  & Roadmaps  │            │  Workspaces  │             │  & Feedback  │
└──────────────┘            └──────────────┘             └──────────────┘
│ • Linear Algebra          │ • Notes Workbook           │ • Concept Explain
│ • Multivariable Calc      │ • Formula Cheatsheet       │ • Practice Quizzes
│ • Probability Theory      │ • Visual Simulations       │ • Tailored Roadmap
│ • Statistics              │ • Topic Study Modals       │   Recommendations
│ • Number Theory           │                            │
│ • Discrete Math           │                            │
```

---

## 🚀 Key Features

### 1. Personalized Roadmap Generator
- **Multi-Factor Input**: Students select their interest (e.g., *Data Science*, *Cryptography*, *Competitive Programming*), existing knowledge level (*Beginner*, *Intermediate*, *Advanced*), primary goal, and weekly pace (*Casual*, *Steady*, *Intensive*).
- **AI-Powered Recommendations**: Connects to the backend Gemini AI service to construct personalized, multi-phase milestone paths with suggested hands-on projects and study rationale.

### 2. Subject Discovery & Interactive Course Outlines
- Curated curriculum across 6 primary mathematical domains.
- Floating sticky course outline sidebar tracking overall unit progress and topic completion in real time.
- Expandable topic accordions with subtopic details, duration estimates, and type tags (*Interactive Lecture*, *Visual Simulation*, *Theory & Practice*, *Applied Problem*).

### 3. Subject-Specific Formula Cheatsheets
- Fast-access theorem banks for every subject.
- Formatted equations covering matrix operations, vector calculus, Bayes' rule, MLE regression, Euler's totient, and graph theory.
- One-click copy functionality for LaTeX and equations.

### 4. Course-Specific Visual Simulations
- Embedded YouTube video lectures and interactive simulations directly inside the learning dashboard.
- Features acclaimed creators including 3Blue1Brown, Gilbert Strang (MIT OpenCourseWare), StatQuest, Numberphile, and Computerphile.
- Tailored to each course's subject context.

### 5. Persistent Interactive Workbook
- Dedicated notebook workspace for guided proofs, exercise scratchpad, and personal notes.
- Automatic local caching for immediate offline writing and zero input latency.
- Full cloud synchronization to PostgreSQL via Prisma ORM under authenticated user profiles.

### 6. Gemini-Powered AI Mathematics Tutor
- **Instant Concept Explanations**: Plain-English answers with small worked examples under 250 words.
- **Dynamic Quiz Generator**: Automatically creates 5-question multiple-choice quizzes with shuffled options and per-question explanations.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend UI** | React 18, Vite, Lucide Icons, CSS3 Custom Properties |
| **Backend API** | Node.js, Express.js (REST architecture), JWT Authentication, Bcrypt |
| **Database & ORM** | Neon Serverless PostgreSQL, Prisma ORM (v6) |
| **Artificial Intelligence** | Google Gemini API (`@google/genai` / `@google/generative-ai`) |
| **Hosting & Cloud** | Vercel (Frontend Client), Render (Backend Service), Neon (Cloud Database) |
