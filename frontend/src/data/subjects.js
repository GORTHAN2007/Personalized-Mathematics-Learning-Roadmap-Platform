export const subjects = [
  {
    id: "linear-algebra",
    code: "MATH-201",
    title: "Linear Algebra & Matrix Methods",
    category: "Foundational Mathematics",
    description: "Master vector spaces, matrix factorizations, eigenvalues, and linear transformations that power modern 3D graphics, data science, and machine learning.",
    totalUnits: 7,
    totalTopics: 38,
    estimatedHours: 28,
    difficulty: "Intermediate",
    color: "#6366f1",
    icon: "Grid",
    popularApplications: ["Computer Vision", "Machine Learning", "Quantum Computing", "Game Physics"],
    units: [
      { id: 1, title: "Solving Linear Systems", topicsCount: 5, status: "completed" },
      { id: 2, title: "Vector Spaces and Subspaces", topicsCount: 6, status: "completed" },
      { id: 3, title: "Orthogonality and Least Squares", topicsCount: 5, status: "in-progress" },
      { id: 4, title: "Determinants", topicsCount: 4, status: "not-started" },
      { id: 5, title: "Eigenvalues and Dynamics", topicsCount: 6, status: "not-started" },
      { id: 6, title: "Symmetric Matrices and SVD", topicsCount: 6, status: "not-started" },
      { id: 7, title: "Linear Transformations and Applications", topicsCount: 6, status: "not-started" }
    ]
  },
  {
    id: "calculus",
    code: "MATH-102",
    title: "Multivariable Calculus & Vector Fields",
    category: "Continuous Mathematics",
    description: "Explore partial derivatives, gradients, multiple integrals, Stokes' Theorem, and vector calculus applied to optimization and physical dynamics.",
    totalUnits: 6,
    totalTopics: 32,
    estimatedHours: 26,
    difficulty: "Intermediate",
    color: "#06b6d4",
    icon: "Activity",
    popularApplications: ["Gradient Descent", "Robotics", "Fluid Simulation", "Economic Modeling"],
    units: [
      { id: 1, title: "Vectors and the Geometry of Space", topicsCount: 5, status: "not-started" },
      { id: 2, title: "Partial Derivatives & Gradients", topicsCount: 6, status: "not-started" },
      { id: 3, title: "Multivariable Optimization & Lagrange Multipliers", topicsCount: 5, status: "not-started" },
      { id: 4, title: "Multiple Integrals in Polar & Cylindrical", topicsCount: 5, status: "not-started" },
      { id: 5, title: "Vector Calculus & Line Integrals", topicsCount: 5, status: "not-started" },
      { id: 6, title: "Green's, Stokes', & Divergence Theorems", topicsCount: 6, status: "not-started" }
    ]
  },
  {
    id: "probability",
    code: "MATH-301",
    title: "Probability Theory & Stochastic Processes",
    category: "Analytical Mathematics",
    description: "Understand random variables, continuous probability distributions, Markov chains, Bayes' theorem, and conditional expectation for predictive modeling.",
    totalUnits: 6,
    totalTopics: 30,
    estimatedHours: 24,
    difficulty: "Intermediate",
    color: "#f59e0b",
    icon: "PieChart",
    popularApplications: ["Risk Analysis", "A/B Testing", "Algorithmic Trading", "Reinforcement Learning"],
    units: [
      { id: 1, title: "Combinatorics and Axiomatic Probability", topicsCount: 5, status: "not-started" },
      { id: 2, title: "Conditional Probability & Bayes' Rule", topicsCount: 5, status: "not-started" },
      { id: 3, title: "Discrete and Continuous Random Variables", topicsCount: 6, status: "not-started" },
      { id: 4, title: "Joint Distributions and Covariance", topicsCount: 5, status: "not-started" },
      { id: 5, title: "Limit Theorems: LLN and Central Limit Theorem", topicsCount: 4, status: "not-started" },
      { id: 6, title: "Markov Chains and Transition Matrices", topicsCount: 5, status: "not-started" }
    ]
  },
  {
    id: "statistics",
    code: "MATH-302",
    title: "Inferential Statistics & Data Modeling",
    category: "Applied Mathematics",
    description: "Learn hypothesis testing, confidence intervals, maximum likelihood estimation, regression modeling, and non-parametric statistical methods.",
    totalUnits: 5,
    totalTopics: 28,
    estimatedHours: 22,
    difficulty: "Beginner-Intermediate",
    color: "#10b981",
    icon: "BarChart3",
    popularApplications: ["Data Science", "Clinical Trials", "Marketing Analytics", "Predictive Forecasting"],
    units: [
      { id: 1, title: "Descriptive Statistics and Exploratory Analysis", topicsCount: 5, status: "not-started" },
      { id: 2, title: "Point Estimation & Maximum Likelihood", topicsCount: 5, status: "not-started" },
      { id: 3, title: "Confidence Intervals & Margin of Error", topicsCount: 6, status: "not-started" },
      { id: 4, title: "Hypothesis Testing: t-tests, ANOVA, Chi-Square", topicsCount: 6, status: "not-started" },
      { id: 5, title: "Linear and Logistic Regression Models", topicsCount: 6, status: "not-started" }
    ]
  },
  {
    id: "number-theory",
    code: "MATH-401",
    title: "Elementary & Computational Number Theory",
    category: "Pure Mathematics",
    description: "Dive into modular arithmetic, prime factorization, Diophantine equations, Euler's totient function, and cryptographic systems like RSA.",
    totalUnits: 5,
    totalTopics: 25,
    estimatedHours: 20,
    difficulty: "Advanced",
    color: "#8b5cf6",
    icon: "Hash",
    popularApplications: ["Cryptography & RSA", "Blockchain", "Hashing Algorithms", "Security Protocols"],
    units: [
      { id: 1, title: "Divisibility and the Euclidean Algorithm", topicsCount: 5, status: "not-started" },
      { id: 2, title: "Prime Numbers and Fundamental Theorem of Arithmetic", topicsCount: 5, status: "not-started" },
      { id: 3, title: "Congruences and Modular Arithmetic", topicsCount: 5, status: "not-started" },
      { id: 4, title: "Fermat's Little Theorem and Euler's Totient", topicsCount: 5, status: "not-started" },
      { id: 5, title: "Public Key Cryptography & RSA Algorithm", topicsCount: 5, status: "not-started" }
    ]
  },
  {
    id: "discrete-math",
    code: "MATH-205",
    title: "Discrete Mathematics & Graph Theory",
    category: "Computational Mathematics",
    description: "Explore mathematical logic, set theory, induction, relations, recurrences, and graph theory essential for computer science algorithms.",
    totalUnits: 6,
    totalTopics: 34,
    estimatedHours: 25,
    difficulty: "Beginner-Intermediate",
    color: "#ec4899",
    icon: "Network",
    popularApplications: ["Algorithm Design", "Social Networks", "Compiler Logic", "Database Query Planning"],
    units: [
      { id: 1, title: "Propositional and Predicate Logic", topicsCount: 6, status: "not-started" },
      { id: 2, title: "Set Theory, Functions, and Relations", topicsCount: 5, status: "not-started" },
      { id: 3, title: "Mathematical Induction and Recursion", topicsCount: 5, status: "not-started" },
      { id: 4, title: "Graph Fundamentals: Trees, Paths, & Cycles", topicsCount: 6, status: "not-started" },
      { id: 5, title: "Graph Algorithms: Shortest Paths and Coloring", topicsCount: 6, status: "not-started" },
      { id: 6, title: "Boolean Algebra & Combinatorial Circuits", topicsCount: 6, status: "not-started" }
    ]
  }
];
