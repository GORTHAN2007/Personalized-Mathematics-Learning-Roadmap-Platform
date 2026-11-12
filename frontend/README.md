# Community-Driven Personalized Mathematics Learning Roadmap Platform

> **Frontend Module** — Built with React.js, Vite, and Modern CSS.  
> Designed strictly following the two reference layouts (Course Dashboard & Dark Icon Authentication UI).

---

## 1. Project Overview & Scope

This project implements the **frontend interface** for a community-driven, personalized mathematics roadmap platform. It organizes complex, scattered mathematical resources into clear, structured, milestone-driven curriculums tailored to student goals (Machine Learning, Cryptography, Competitive Programming, or Pure Mathematics).

### Scope Adherence
- **Strictly Frontend**: Zero backend dependencies, databases, or external APIs.
- **Client-Side State**: Uses React functional components (`useState`) for interactive accordion expansions, unit completion tracking, dynamic curriculum generation, and optimistic community submissions.
- **Modular Data Architecture**: All subject definitions, roadmap units, subtopics, and resources are stored in modular JavaScript files (`subjects.js`, `roadmapData.js`, `resources.js`).

---

## 2. Design Reference Adherence

### Reference 1: Main Dashboard Layout
- **Top Navigation Bar**: Platform brand (`MathPath`), subject switcher, language selection dropdown (`EN (US)`), theme mode toggle (`Dark`), and user profile pill.
- **Left Course Sidebar**: Sticky, scrollable course outline showing numbered units (`01` to `07`), titles, topic counts, completion percentage bar, and toggleable circular checkmarks.
- **Course Header**: Subject badges (`MATH-201`, `Foundational Mathematics`, `7 Units • 38 Topics`), large heading, descriptive overview, and 4 workbook/resource action cards (*Interactive Workbook*, *Formula Cheatsheet*, *Visual Simulations*, *Discussion*).
- **Expandable Roadmap Units**:
  1. *Solving Linear Systems*
  2. *Vector Spaces and Subspaces*
  3. *Orthogonality and Least Squares*
  4. *Determinants*
  5. *Eigenvalues and Dynamics*
  6. *Symmetric Matrices and SVD*
  7. *Linear Transformations and Applications*

### Reference 2: Authentication Modal & UI Elements
- **Atmospheric Aesthetic**: Pitch black theme with soft ambient light beam radiating from the top center.
- **Leftmost Vertical Icon Sidebar**: Fixed narrow bar with quick action buttons (`+` Contribute, Compass Explore, Grid Dashboard, Trending Planner, Book Resources, Message Community, and User Avatar).
- **Authentication Card**:
  - Centered heading: *"Sign up below to unlock the full potential of MathPath"*
  - Privacy policy disclaimer
  - High-contrast white buttons: **Continue with Apple** and **Continue with Google**
  - Dark-styled email input with icon (`enter your mail`) and dark **Continue with email** button
  - Client-side validation and modal dismissal
- **Floating Bottom Action Banner**: Rounded white banner floating at the bottom with quick CTA (*Start a Personalized Roadmap*) and dismiss control.

---

## 3. Included Features & Pages

1. **Dashboard (`/`)**: Main Linear Algebra course roadmap with expandable unit accordions, topic completion checkboxes, and progress calculation.
2. **Subject Discovery Page**: Browse all 6 core mathematical domains:
   - *Linear Algebra*
   - *Multivariable Calculus*
   - *Probability Theory*
   - *Inferential Statistics*
   - *Number Theory & Cryptography*
   - *Discrete Mathematics & Graph Theory*
3. **Personalized Roadmap Planner**: Interactive form where learners input their interests, background level, primary goal, and weekly pace to generate custom multi-phase roadmaps with practical milestone projects.
4. **Learning Resources Hub**: Filterable gallery across 6 content types: *Videos, Articles, Simulations, Games, Practice Problems, and Practical Applications*.
5. **Community Exchange**:
   - Community contributions feed with upvote/like toggles.
   - Interactive submission modal to contribute new resources.
   - Problem bank submission form to post challenges and hints (instantly prepends to state).

---

## 4. Project File Structure

```
frontend/
├── index.html               # Main HTML entry with font preconnections
├── package.json             # React 18, Vite, and Lucide icons
├── vite.config.js           # Vite build configuration
├── src/
│   ├── main.jsx             # React DOM root render
│   ├── App.jsx              # Main application coordinator & state manager
│   ├── index.css            # Dark theme design system & responsive styling
│   ├── components/
│   │   ├── Navbar.jsx           # Top header bar (brand, language, theme, auth)
│   │   ├── Sidebar.jsx          # Left course units outline & progress bar
│   │   ├── VerticalIconBar.jsx  # Leftmost icon sidebar (Ref 2)
│   │   ├── CourseHeader.jsx     # Badges, title, description, workbook cards
│   │   ├── RoadmapSection.jsx   # Accordion units & subtopic checkboxes
│   │   ├── ResourceSection.jsx  # Resource card grid & like counters
│   │   ├── AuthModal.jsx        # Login/Signup modal (Ref 2)
│   │   └── FloatingBanner.jsx   # Floating bottom action banner (Ref 2)
│   ├── pages/
│   │   ├── Dashboard.jsx        # Course dashboard view
│   │   ├── SubjectPage.jsx      # Subject exploration view
│   │   ├── RoadmapPage.jsx      # Personalized roadmap generator
│   │   ├── CommunityPage.jsx    # Community forum, add resource/problem
│   │   ├── Login.jsx            # Standalone login page
│   │   └── Signup.jsx           # Standalone signup page
│   └── data/
│       ├── subjects.js          # Core subjects & syllabus metadata
│       ├── roadmapData.js       # Units, topics, and personalized tracks
│       └── resources.js         # Curated resources & problem bank
```

---

## 5. How to Run Locally

```bash
# Navigate to the frontend directory from the repository root
cd frontend

# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

---

## 6. Viva Presentation Guide (For College Evaluation)

When presenting this project:
1. **Explain Functional Components & Hooks**:
   - `useState` is used in `App.jsx` to hold the application's global navigation page, current subject, unit completion statuses, and community contribution items.
   - In `RoadmapSection.jsx`, `useState` manages an array of `expandedUnitIds` to smoothly collapse/expand accordions independently.
2. **Explain Data Separation**:
   - Highlight that zero content is hardcoded across JSX components. All mathematics curriculums live in `src/data/`, demonstrating clean code architecture.
3. **Explain Component Reusability & Props**:
   - Components like `ResourceSection.jsx` and `Sidebar.jsx` receive data and event handlers via props, enabling them to be reused for different subjects without rewriting code.
4. **Explain Frontend/Backend Boundary**:
   - Demonstrate how optimistic UI updates (e.g. submitting a community problem) immediately display in the list via React state, prepared with predictable JSON data shapes ready to connect to a REST or GraphQL API later.
