export const linearAlgebraRoadmap = [
  {
    id: 1,
    unitNumber: "01",
    title: "Solving Linear Systems",
    description: "Understand matrix equations, augmented matrices, row reductions, and systematic methods to solve systems of linear equations.",
    topicsCount: 4,
    duration: "3.5 hrs",
    completed: true,
    topics: [
      {
        id: "1.1",
        title: "Systems of Linear Equations & Row Operations",
        type: "Interactive Lecture",
        duration: "35 min",
        completed: true,
        summary: "Introduction to linear combinations, coefficient matrices, and elementary row operations."
      },
      {
        id: "1.2",
        title: "Gaussian Elimination & Reduced Row Echelon Form (RREF)",
        type: "Algorithm & Simulation",
        duration: "45 min",
        completed: true,
        summary: "Step-by-step pivoting, consistency criteria, free variables, and parametric vector form."
      },
      {
        id: "1.3",
        title: "Matrix Equation Ax = b and Invertible Matrices",
        type: "Theory & Practice",
        duration: "40 min",
        completed: true,
        summary: "Mapping linear systems to matrix-vector multiplication and computing inverses via Gauss-Jordan."
      },
      {
        id: "1.4",
        title: "LU Factorization & Computational Efficiency",
        type: "Applied Problem",
        duration: "50 min",
        completed: true,
        summary: "Factoring square matrices into lower and upper triangular components for rapid system solving."
      }
    ]
  },
  {
    id: 2,
    unitNumber: "02",
    title: "Vector Spaces and Subspaces",
    description: "Explore the abstract foundations of mathematical spaces, linear combinations, spanning sets, and dimension theory.",
    topicsCount: 4,
    duration: "4.0 hrs",
    completed: true,
    topics: [
      {
        id: "2.1",
        title: "Vectors in R^n and the 10 Vector Space Axioms",
        type: "Interactive Lecture",
        duration: "40 min",
        completed: true,
        summary: "Generalizing Euclidean geometry to function spaces, polynomial spaces, and matrix spaces."
      },
      {
        id: "2.2",
        title: "Vector Subspaces, Null Space (Kernel), & Column Space",
        type: "Visual Simulation",
        duration: "55 min",
        completed: true,
        summary: "Geometric exploration of closure under addition and scalar multiplication for Nul(A) and Col(A)."
      },
      {
        id: "2.3",
        title: "Linear Independence, Span, and Basis",
        type: "Practice Problems",
        duration: "45 min",
        completed: true,
        summary: "Minimal generating sets, identifying redundant vectors, and standard coordinate systems."
      },
      {
        id: "2.4",
        title: "Dimension, Rank, and the Fundamental Rank-Nullity Theorem",
        type: "Proof & Application",
        duration: "60 min",
        completed: true,
        summary: "How dim(Col A) + dim(Nul A) = n governs the degrees of freedom of linear systems."
      }
    ]
  },
  {
    id: 3,
    unitNumber: "03",
    title: "Orthogonality and Least Squares",
    description: "Connect geometric intuition of perpendicularity with optimization, projections, and least squares data fitting.",
    topicsCount: 4,
    duration: "4.5 hrs",
    completed: false,
    topics: [
      {
        id: "3.1",
        title: "Inner Product, Norm, Distance, and Orthogonality",
        type: "Interactive Lecture",
        duration: "40 min",
        completed: true,
        summary: "The algebraic dot product, Cauchy-Schwarz inequality, angles in n-dimensional spaces."
      },
      {
        id: "3.2",
        title: "Orthogonal Complements and Vector Projections",
        type: "Visual Simulation",
        duration: "50 min",
        completed: true,
        summary: "Projecting arbitrary vectors onto subspaces and calculating orthogonal decomposition."
      },
      {
        id: "3.3",
        title: "The Gram-Schmidt Orthogonalization Process & QR Factorization",
        type: "Algorithm Walkthrough",
        duration: "55 min",
        completed: false,
        summary: "Transforming any basis into an orthonormal basis; expressing A as product Q * R."
      },
      {
        id: "3.4",
        title: "Least-Squares Solutions and Curve Fitting",
        type: "Hands-on Project",
        duration: "65 min",
        completed: false,
        summary: "Finding best-fit hyperplanes for overdetermined systems when exact solutions do not exist."
      }
    ]
  },
  {
    id: 4,
    unitNumber: "04",
    title: "Determinants",
    description: "Discover the volume-scaling factor of transformations, recursive cofactors, and algebraic properties of determinants.",
    topicsCount: 3,
    duration: "3.0 hrs",
    completed: false,
    topics: [
      {
        id: "4.1",
        title: "Introduction to Determinants & Cofactor Expansion",
        type: "Interactive Lecture",
        duration: "45 min",
        completed: false,
        summary: "Laplace expansion, 2x2 and 3x3 geometric volume, recursive algebraic formula."
      },
      {
        id: "4.2",
        title: "Algebraic Properties & Invertibility Tests",
        type: "Problem Set",
        duration: "45 min",
        completed: false,
        summary: "How row operations alter determinants; det(AB) = det(A)det(B); invertibility criterion."
      },
      {
        id: "4.3",
        title: "Cramer's Rule, Inverse Formula, and Area Transformations",
        type: "Visual Demo",
        duration: "50 min",
        completed: false,
        summary: "Geometric interpretation of determinants as scaling factors of n-dimensional volumes."
      }
    ]
  },
  {
    id: 5,
    unitNumber: "05",
    title: "Eigenvalues and Dynamics",
    description: "Unlock directions where transformations act purely as scalar stretch factors, and analyze dynamic equilibrium systems.",
    topicsCount: 4,
    duration: "4.5 hrs",
    completed: false,
    topics: [
      {
        id: "5.1",
        title: "The Eigenvalue Problem: Av = λv",
        type: "Visual Simulation",
        duration: "45 min",
        completed: false,
        summary: "Geometric vectors that maintain their orientation under linear transformation."
      },
      {
        id: "5.2",
        title: "The Characteristic Equation and Eigenspaces",
        type: "Theory & Proof",
        duration: "50 min",
        completed: false,
        summary: "Finding roots of det(A - λI) = 0 and determining bases for corresponding eigenspaces."
      },
      {
        id: "5.3",
        title: "Matrix Diagonalization (A = P D P^-1)",
        type: "Interactive Lecture",
        duration: "55 min",
        completed: false,
        summary: "Factoring matrices to compute powers A^k effortlessly for long-term state evolution."
      },
      {
        id: "5.4",
        title: "Discrete Dynamical Systems, Markov Chains, and PageRank",
        type: "Real-World Application",
        duration: "60 min",
        completed: false,
        summary: "How Google's original algorithm and population models rely on dominant eigenvalues."
      }
    ]
  },
  {
    id: 6,
    unitNumber: "06",
    title: "Symmetric Matrices and SVD",
    description: "Study symmetric matrices, orthogonal diagonalizability, and the crowning jewel of linear algebra: Singular Value Decomposition.",
    topicsCount: 4,
    duration: "5.0 hrs",
    completed: false,
    topics: [
      {
        id: "6.1",
        title: "Diagonalization of Symmetric Matrices & Spectral Theorem",
        type: "Theorem Walkthrough",
        duration: "50 min",
        completed: false,
        summary: "Why symmetric real matrices always possess real eigenvalues and an orthonormal eigenbasis."
      },
      {
        id: "6.2",
        title: "Quadratic Forms & Positive Definite Matrices",
        type: "Applied Math",
        duration: "50 min",
        completed: false,
        summary: "Energy functions, second-derivative tests in multivariable calculus, and Cholesky factorization."
      },
      {
        id: "6.3",
        title: "Singular Value Decomposition (SVD: A = U Σ V^T)",
        type: "Visual Simulation",
        duration: "65 min",
        completed: false,
        summary: "Decomposing any rectangular matrix into rotation, scaling, and rotation transformations."
      },
      {
        id: "6.4",
        title: "Principal Component Analysis (PCA) & Low-Rank Compression",
        type: "Case Study",
        duration: "65 min",
        completed: false,
        summary: "Applying SVD to image compression and high-dimensional dataset variance reduction."
      }
    ]
  },
  {
    id: 7,
    unitNumber: "07",
    title: "Linear Transformations and Applications",
    description: "Synthesize everything into mappings between vector spaces, coordinate changes, 3D computer graphics, and neural networks.",
    topicsCount: 4,
    duration: "4.0 hrs",
    completed: false,
    topics: [
      {
        id: "7.1",
        title: "Geometry of Linear Maps: Kernel, Range, and Isomorphisms",
        type: "Interactive Lecture",
        duration: "45 min",
        completed: false,
        summary: "Shears, reflections, rotations, and projection operations in 2D and 3D space."
      },
      {
        id: "7.2",
        title: "Matrix Representations & Change of Basis",
        type: "Problem Set",
        duration: "50 min",
        completed: false,
        summary: "How coordinate systems alter matrix representation while preserving fundamental geometry."
      },
      {
        id: "7.3",
        title: "3D Graphics Pipeline: Homogeneous Coordinates & Projections",
        type: "Interactive Code Demo",
        duration: "55 min",
        completed: false,
        summary: "How video game game engines project 3D virtual worlds onto flat 2D player screens."
      },
      {
        id: "7.4",
        title: "Linear Algebra in Deep Learning: Weights, Attention, & Embeddings",
        type: "Modern Application",
        duration: "60 min",
        completed: false,
        summary: "Matrix multiplication in Transformer self-attention and vector embeddings in AI."
      }
    ]
  }
];

// Predefined roadmap paths for the personalized generator
export const personalizedRoadmaps = {
  "data-science": {
    track: "Data Science & Machine Learning Math",
    targetAudience: "Aspiring Data Scientists & AI Engineers",
    duration: "8 Weeks • 4-6 hrs/week",
    overview: "Focused on high-dimensional vectors, matrix factorizations, multivariate gradients, and probability distributions essential for understanding machine learning algorithms from scratch.",
    milestones: [
      {
        phase: "Phase 1: Foundations of Vectors & High Dimensions",
        subject: "Linear Algebra",
        topics: ["Vector Spaces & Projections", "Matrix Multiplications & Inverses", "Least Squares Regression"],
        suggestedProjects: "Implement polynomial linear regression without external ML libraries."
      },
      {
        phase: "Phase 2: Optimization & Gradient Landscapes",
        subject: "Multivariable Calculus",
        topics: ["Partial Derivatives & Gradients", "Hessian Matrices & Curvature", "Gradient Descent & Chain Rule"],
        suggestedProjects: "Visualize the loss surface of a 2-parameter model and simulate descent."
      },
      {
        phase: "Phase 3: Uncertainty & Inference",
        subject: "Probability & Statistics",
        topics: ["Continuous Distributions", "Maximum Likelihood Estimation", "Hypothesis Testing & Bayes Rule"],
        suggestedProjects: "Build a Naive Bayes classifier and evaluate confidence intervals."
      },
      {
        phase: "Phase 4: Dimensionality Reduction & Matrix Factorization",
        subject: "Linear Algebra Advanced",
        topics: ["Eigenvalues & Spectral Theorem", "Singular Value Decomposition (SVD)", "Principal Component Analysis (PCA)"],
        suggestedProjects: "Compress a grayscale image using rank-k SVD approximation."
      }
    ]
  },
  "cryptography": {
    track: "Cryptography & Security Mathematics",
    targetAudience: "Security Researchers, Blockchain Devs & Cryptographers",
    duration: "7 Weeks • 5 hrs/week",
    overview: "Master the discrete structures, modular arithmetic, prime fields, and computational complexity that secure global communications.",
    milestones: [
      {
        phase: "Phase 1: Modular Foundations & Divisibility",
        subject: "Number Theory",
        topics: ["Euclidean Algorithm & Bezout's Identity", "Prime Factorization", "Modular Arithmetic Systems"],
        suggestedProjects: "Implement the Extended Euclidean Algorithm to compute modular inverses."
      },
      {
        phase: "Phase 2: Discrete Structures & Rings",
        subject: "Discrete Mathematics",
        topics: ["Group Theory Basics", "Fermat's Little Theorem", "Euler's Totient Function φ(n)"],
        suggestedProjects: "Build an interactive modular clock visualizer for cyclic groups."
      },
      {
        phase: "Phase 3: Asymmetric Cryptography Systems",
        subject: "Applied Number Theory",
        topics: ["Diffie-Hellman Key Exchange", "RSA Cryptosystem Implementation", "Discrete Logarithm Problem"],
        suggestedProjects: "Implement a toy RSA key generator with prime testing."
      },
      {
        phase: "Phase 4: Elliptic Curves & Modern Ciphers",
        subject: "Advanced Discrete Geometry",
        topics: ["Elliptic Curves over Finite Fields", "Point Addition & Scalar Multiplication", "Zero Knowledge Proof Intuition"],
        suggestedProjects: "Visualize elliptic curve point addition on an integer modulo grid."
      }
    ]
  },
  "competitive-programming": {
    track: "Competitive Programming & Algorithmic Math",
    targetAudience: "Contestants, Software Engineers & Problem Solvers",
    duration: "6 Weeks • 6 hrs/week",
    overview: "Intensive focus on combinatorics, graph theory, recurrences, and fast modular arithmetic used in codeforces and algorithmic interviews.",
    milestones: [
      {
        phase: "Phase 1: Combinatorics & Counting",
        subject: "Discrete Mathematics",
        topics: ["Permutations & Combinations", "Inclusion-Exclusion Principle", "Catalan Numbers & Stars and Bars"],
        suggestedProjects: "Solve combinatorial grid walk and balanced parentheses problems."
      },
      {
        phase: "Phase 2: Graph Theory & Trees",
        subject: "Discrete Mathematics",
        topics: ["Graph Representations", "Eulerian & Hamiltonian Paths", "Tree Traversals & Shortest Paths"],
        suggestedProjects: "Implement Dijkstra's algorithm and topological sort."
      },
      {
        phase: "Phase 3: Fast Number Theory for CP",
        subject: "Number Theory",
        topics: ["Sieve of Eratosthenes (O(N))", "Fast Modular Exponentiation", "Chinese Remainder Theorem"],
        suggestedProjects: "Write a high-performance prime factorization and divisor count utility."
      },
      {
        phase: "Phase 4: Linear Recurrences & Matrix Exponentiation",
        subject: "Linear Algebra",
        topics: ["Transition Matrices", "Matrix Exponentiation in O(k^3 log n)", "Solving Fibonacci-style recurrences"],
        suggestedProjects: "Compute the 1,000,000,000th Fibonacci term modulo 10^9+7 in milliseconds."
      }
    ]
  },
  "pure-math": {
    track: "Rigorous Pure Mathematics Exploration",
    targetAudience: "Mathematics Majors & Theoretical Thinkers",
    duration: "10 Weeks • 4 hrs/week",
    overview: "Delve into formal proofs, abstract structures, vector spaces, and axiomatic systems designed to build profound mathematical maturity.",
    milestones: [
      {
        phase: "Phase 1: Proof Techniques & Formal Logic",
        subject: "Discrete Mathematics",
        topics: ["Direct & Indirect Proofs", "Mathematical Induction", "Set Theory & Relations"],
        suggestedProjects: "Formally prove set equivalence and induction identities."
      },
      {
        phase: "Phase 2: Abstract Vector Spaces",
        subject: "Linear Algebra",
        topics: ["Axiomatic Vector Spaces", "Linear Transformations & Isomorphisms", "Dual Spaces"],
        suggestedProjects: "Explore infinite-dimensional spaces such as polynomial spaces."
      },
      {
        phase: "Phase 3: Metric Spaces & Continuity",
        subject: "Real Analysis & Calculus",
        topics: ["Epsilon-Delta Definitions", "Open & Closed Sets", "Completeness of Reals"],
        suggestedProjects: "Construct rigorous continuity proofs for exotic functions."
      },
      {
        phase: "Phase 4: Symmetry & Group Structures",
        subject: "Abstract Algebra & Number Theory",
        topics: ["Groups, Rings, and Fields", "Lagrange's Theorem", "Homomorphisms"],
        suggestedProjects: "Map permutation groups to geometric symmetries of polygons."
      }
    ]
  }
};
