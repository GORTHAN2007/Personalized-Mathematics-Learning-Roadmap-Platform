# DBMS Major Project Viva Video Script: MathPath AI

This guide contains complete, high-scoring answers to all 5 DBMS Viva questions, tailored specifically to **MathPath AI**. 

Follow the **"What to Say"** spoken script and **"What to Show on Screen"** visual cues for each question to ensure you satisfy every evaluation criteria.

---

## 📋 Quick Setup Before Recording
Keep these tabs and windows ready on your screen:
1. **VS Code**: Open `backend/prisma/schema.prisma` and `docs/ER-diagram.md`.
2. **Neon Console / Prisma Studio**: Run `npx prisma studio` in `backend/` or keep Neon Console SQL editor open.
3. **Live Web App**: `http://localhost:5173` or your Vercel deployment.
4. **Terminal**: For running Prisma queries or checking live database records.

---

# Question 1: Why did you choose this database?

### 🗣️ What to Say:
> *"For our project, **MathPath AI**, we chose **PostgreSQL** (hosted serverless on **Neon**) as our primary database engine, paired with **Prisma ORM**.*
>
> *1. **Data Structure**: Our application domain model is **highly structured and relational**. A personalized mathematics platform fundamentally relies on strict structural dependencies: a Subject has multiple Topics, a Topic belongs to an ordered sequence inside a User's personalized Roadmap, and each User has discrete, stateful progress tracking across those topics. Entities have strict referential integrity requirements.*
>
> *2. **Read/Write Patterns & Volume**:*
> *- **Read-heavy**: Approximately 80% reads and 20% writes. On page loads, students constantly fetch structured subject hierarchies, roadmap milestone trees, and curated notes.*
> *- **Writes**: Progress completions, quiz results, student notes updates, and roadmap fork generations.*
> *- **Expected Volume**: We anticipate tens of thousands of registered students generating ~50,000 progress records and hundreds of thousands of assessment answers. PostgreSQL handles this volume effortlessly with B-Tree indexing on foreign keys.*
>
> *3. **Consistency & ACID Transactions**: We require **strong consistency**. For example, when a student creates a personalized roadmap, we need atomic transactions to guarantee that the `Roadmap` and all associated `RoadmapNode` milestone entries persist together. Partial writes would leave a broken, unusable roadmap tree.*
>
> *4. **Alternative Considered & Why Rejected**:*
> *We evaluated **MongoDB (Document store)**. While Mongo is flexible for unstructured data, it was rejected because:*
> *- Enforcing relational constraints across Subjects, Topics, and Progress in MongoDB requires complex manual application logic or redundant embedded subdocuments.*
> *- Embedding progress within user documents would cause unbounded document growth as students complete hundreds of topics, eventually degrading performance.*
> *- PostgreSQL gives us strict referential integrity, atomic multi-table transactions, and ACID compliance, while still offering native `JSONB` support (which we use for Question choices and Assessment results)."*

### 🖥️ What to Show on Screen:
1. **Show Neon Console or Prisma Studio**: Open the `User`, `Subject`, and `Topic` tables to show clean, structured tabular data.
2. **Show Code/Queries**:
   - `prisma.user.findUnique({ where: { email } })`
   - `prisma.note.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } })`
   - `prisma.subject.findMany({ include: { topics: true } })`

---

# Question 2: Walk us through your schema or data model

### 🗣️ What to Say:
> *"Our database model consists of **11 core relational tables** mapped cleanly using Prisma.*
>
> *1. **Core Entities & Keys**:*
> *- **User**: Primary key `id` (UUID). Stores email, hashed password, role (`STUDENT`, `EDUCATOR`, `ADMIN`).*
> *- **Subject & Topic**: Subject has primary key `id` (UUID) with unique `slug`. Topic has primary key `id`, referencing `subjectId` (Foreign Key).*
> *- **Note**: Primary key `id`, referencing `userId` (Foreign Key). Holds persistent workbook entries.*
> *- **Assessment & Question**: Question references `assessmentId` with options stored in a structured JSON column.*
>
> *2. **Relationships**:*
> *- **1:1 / 1:N**: `User` to `Note` (1:N), `Subject` to `Topic` (1:N), `Assessment` to `Question` (1:N).*
> *- **M:N (Many-to-Many) Relationships & Resolution**:*
> *We have two classic M:N relationships that we resolved using **explicit join/junction tables**:*
> *a. **Roadmap and Topics**: A Roadmap contains many Topics, and a Topic appears in many Roadmaps. We resolved this via the **`RoadmapNode`** junction table, which contains composite uniqueness on `[roadmapId, topicId]` along with stateful attributes like `status` (`LOCKED`, `IN_PROGRESS`, `COMPLETED`) and layout coordinates `(positionX, positionY)`.*
> *b. **User and Topics (Progress)**: A User tracks many Topics, and a Topic is tracked by many Users. We resolved this via **`TopicProgress`** with a composite unique constraint on `[userId, topicId]` and timestamps.*
> *c. **User and Posts (Voting)**: Resolved via the **`Vote`** junction table with `[postId, userId]` unique constraint so a student can only vote once per post.*
>
> *Let's look at a join query across these relationships."*

### 🖥️ What to Show on Screen:
1. **Open `docs/ER-diagram.md`**: Walk through the Mermaid diagram showing `USER -> NOTE`, `SUBJECT -> TOPIC`, and junction tables `ROADMAP_NODE` & `TOPIC_PROGRESS`.
2. **Open `backend/prisma/schema.prisma`**: Highlight lines showing `RoadmapNode` and `TopicProgress`:
   ```prisma
   model RoadmapNode {
     id        String     @id @default(uuid())
     roadmapId String
     roadmap   Roadmap    @relation(fields: [roadmapId], references: [id], onDelete: Cascade)
     topicId   String
     topic     Topic      @relation(fields: [topicId], references: [id], onDelete: Cascade)
     status    NodeStatus @default(LOCKED)
     @@unique([roadmapId, topicId])
   }
   ```
3. **Show Query Output**: Run a join query in Prisma Studio or terminal demonstrating a fetch of `Subject` including all child `Topic` records.

---

# Question 3: What normal form is your design in, and where did you deliberately break it?

### 🗣️ What to Say:
> *"Our relational database schema reaches **Third Normal Form (3NF)** across all primary transaction tables, with selective, deliberate denormalization for performance.*
>
> *1. **First Normal Form (1NF)**: Every table has a primary key (UUID), and all columns hold atomic attributes. We have no repeating groups across rows.*
> *2. **Second Normal Form (2NF)**: The schema is in 1NF, and all non-key attributes are fully functionally dependent on the entire primary key. In our composite-key junction tables like `RoadmapNode` and `TopicProgress`, attributes like `status` and `completedAt` depend strictly on the pair `(userId, topicId)`.*
> *3. **Third Normal Form (3NF)**: The schema is in 2NF, and there are no **transitive functional dependencies** (no non-key attribute depends on another non-key attribute).*
> *- For example, in `Topic`, we store `subjectId`. We deliberately do NOT store `subjectTitle` or `subjectCategory` inside `Topic`. If we did, `Topic -> subjectId -> subjectTitle` would be a transitive dependency causing update anomalies. By separating `Subject` into its own table, we achieve clean 3NF.*
>
> *4. **Deliberate Denormalization / Semi-Structured Storage**:*
> *We deliberately broke pure 3NF in two specific instances:*
> *- **Question Options (`Question.options`)**: Stored as a **`Json`** column rather than creating a separate `Option` table with rows for options A, B, C, D. Because quiz options are always fetched together and never queried or filtered independently, storing them as a JSON array eliminates an unnecessary SQL `JOIN` on every quiz fetch.*
> *- **Assessment Result Details (`AssessmentResult.details`)**: Stored as a `Json` snapshot so historical quiz attempts capture the exact question state at the moment of submission, even if the question is modified later."*

### 🖥️ What to Show on Screen:
1. **Show `Question` model in `schema.prisma`**: Point out:
   ```prisma
   options       Json
   correctAnswer String
   ```
2. **Show `Topic` vs `Subject` separation**: Point out that `Topic` references `subjectId` without duplicating `Subject.title` or `Subject.description`.

---

# Question 4: How does your database protect data correctness?

### 🗣️ What to Say:
> *"We maintain data correctness using a layered defense combining **database-level integrity constraints**, **ACID transactions**, and **concurrency isolation**.*
>
> *1. **Database Constraints (Enforced by PostgreSQL)**:*
> *- **PRIMARY KEY (UUID)**: Enforces entity integrity on every table.*
> *- **UNIQUE Constraints**:*
>   * `User.email`: Prevents duplicate student registrations.*
>   * `Subject.slug` & `Topic.slug`: Prevents collision in routing.*
>   * `@@unique([roadmapId, topicId])`: Guarantees a topic cannot be inserted twice into the same roadmap.*
>   * `@@unique([userId, topicId])`: Guarantees single-state progress per student.*
>   * `@@unique([postId, userId])`: Enforces one vote per student on community posts.*
> *- **FOREIGN KEYS with `onDelete: Cascade`**: Guarantees referential integrity. Deleting a `User` cascades to delete their notes, progress, and roadmap nodes, preventing dangling or orphaned records.*
> *- **NOT NULL & ENUMs**: Enforced via PostgreSQL enums (`Role`, `Difficulty`, `NodeStatus`). Invalid statuses are rejected at the database level.*
>
> *2. **Transactions (Atomicity)**:*
> *When generating or saving a personalized roadmap, we insert the master `Roadmap` and batch-insert child `RoadmapNode` records. Using Prisma's transaction API (`prisma.$transaction`), all inserts execute in a single atomic database transaction. If any milestone fails to insert, the entire operation rolls back automatically, preventing partial roadmaps.*
>
> *3. **Concurrency & Isolation**:*
> *PostgreSQL uses **Multi-Version Concurrency Control (MVCC)** with **Read Committed** as the default isolation level. If two requests attempt to update the same note or insert identical topic progress simultaneously, the database's unique index locks the index leaf, immediately raising a unique constraint violation error (`P2002` in Prisma), preventing race-condition duplicates."*

### 🖥️ What to Show on Screen:
1. **Show Schema Constraints**: Highlight `@@unique([roadmapId, topicId])` and `onDelete: Cascade` in `schema.prisma`.
2. **Demonstrate Constraint Rejection (Extra Credit)**:
   - Run a quick command or query attempting to insert a duplicate email or duplicate `(userId, topicId)`:
   - Show PostgreSQL/Prisma returning: `Unique constraint failed on the fields: (email)`.

---

# Question 5: How did you make your database usage efficient?

### 🗣️ What to Say:
> *"To ensure optimal performance and low latency, we applied several engineering optimizations:*
>
> *1. **Indexes & Query Support**:*
> *- **Primary Key Indexes**: PostgreSQL automatically builds B-Tree indexes on `id` (UUID) for all 11 tables.*
> *- **Unique Indexes**: Created on `User(email)`, `Subject(slug)`, `Topic(slug)`.*
> *- **Composite B-Tree Indexes**: Created via `@@unique([roadmapId, topicId])` and `@@unique([userId, topicId])`. This supports fast $O(\log N)$ point lookups when checking whether a student has completed a specific topic (`WHERE userId = ? AND topicId = ?`).*
>
> *2. **Index Trade-offs Considered**:*
> *We evaluated adding an index on `Note.content` (Full-Text Search). We decided against it because student workbook notes have frequent write and auto-save updates. A full inverted search index would introduce heavy write amplification on every note auto-save. Instead, indexing `(userId, updatedAt DESC)` delivers sub-millisecond retrieval of student notes without write penalty.*
>
> *3. **Connection Pooling & Architecture**:*
> *Because serverless environments can exhaust database connection pools rapidly, we utilize **Neon's connection pooler** via PgBouncer (`DATABASE_URL` with connection pooling, and direct unpooled connection for migrations). On the application layer, we use field projection (`select: { id: true, title: true }`) to avoid over-fetching large text columns.*
>
> *4. **What breaks if user base grows 100x?**:*
> *- **Bottleneck 1: Database Connection Saturation & Read Contention on Roadmaps**:*
>   * *Solution*: Introduce an in-memory **Redis Cache** in front of PostgreSQL for static curriculum data (`Subjects`, `Topics`, and `Formulas`), which rarely changes.*
> *- **Bottleneck 2: High write volume on `TopicProgress` & `AssessmentResult`**:*
>   * *Solution*: Apply **horizontal table partitioning** by `userId` or range-partition assessment logs by `createdAt` (e.g. monthly partitions), alongside database read-replicas for analytics queries.*"

### 🖥️ What to Show on Screen:
1. **Show `schema.prisma` lines 10-12**: Show the Neon pooled connection URL:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DATABASE_URL_UNPOOLED")
   }
   ```
2. **Show indexes**: Point out the composite unique indexes in `TopicProgress` and `RoadmapNode`.
3. **Show Query Execution**: Show terminal output querying notes with an `orderBy: { updatedAt: 'desc' }`.

---

## ⏱️ Video Recording Timing Breakdown (Target: 7–9 Minutes)

| Question | Recommended Time | Core Focus |
|---|---|---|
| **Q1: Database Choice** | 1.5 mins | PostgreSQL on Neon, relational requirements, MongoDB rejection |
| **Q2: Schema Walkthrough** | 2.0 mins | ER diagram, 1:N relations, junction tables for M:N |
| **Q3: Normal Forms** | 1.5 mins | 3NF justification, removing transitive dependencies, JSON denormalization |
| **Q4: Data Correctness** | 1.5 mins | Unique constraints, Cascade deletes, Prisma transactions, MVCC |
| **Q5: Efficiency & Scaling** | 1.5 mins | B-Tree composite indexes, PgBouncer pooling, Redis caching plan |
