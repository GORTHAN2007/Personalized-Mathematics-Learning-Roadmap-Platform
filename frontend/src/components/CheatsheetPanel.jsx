import React, { useState } from 'react';
import { X, FileCode, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

const SUBJECT_CHEATSHEETS = {
  'linear-algebra': [
    {
      section: 'Matrix Operations',
      icon: '⊞',
      formulas: [
        { name: 'Matrix Multiplication', latex: '(AB)ᵢⱼ = Σₖ aᵢₖ bₖⱼ', note: 'Only defined when cols(A) = rows(B)' },
        { name: 'Transpose', latex: '(Aᵀ)ᵢⱼ = Aⱼᵢ', note: '(AB)ᵀ = BᵀAᵀ' },
        { name: 'Inverse', latex: 'AA⁻¹ = A⁻¹A = I', note: 'Exists iff det(A) ≠ 0' },
        { name: 'Trace', latex: 'tr(A) = Σᵢ aᵢᵢ = Σλᵢ', note: 'Sum of eigenvalues' },
      ],
    },
    {
      section: 'Determinants',
      icon: '|·|',
      formulas: [
        { name: '2×2 Determinant', latex: 'det([[a,b],[c,d]]) = ad - bc', note: 'Base case' },
        { name: 'Cofactor Expansion', latex: 'det(A) = Σⱼ (-1)^(i+j) aᵢⱼ Mᵢⱼ', note: 'Along any row/col' },
        { name: 'Product Rule', latex: 'det(AB) = det(A)·det(B)', note: 'Multiplicative property' },
        { name: 'Transpose Rule', latex: 'det(Aᵀ) = det(A)', note: 'Same determinant' },
      ],
    },
    {
      section: 'Eigenvalues & Eigenvectors',
      icon: 'λ',
      formulas: [
        { name: 'Eigenvalue Equation', latex: 'Av = λv  ⟺  (A - λI)v = 0', note: 'v ≠ 0' },
        { name: 'Characteristic Polynomial', latex: 'p(λ) = det(A - λI) = 0', note: 'Roots are eigenvalues' },
        { name: 'Trace-Eigenvalue', latex: 'tr(A) = Σλᵢ', note: 'Sum of all eigenvalues' },
        { name: 'Det-Eigenvalue', latex: 'det(A) = Πλᵢ', note: 'Product of all eigenvalues' },
        { name: 'Diagonalization', latex: 'A = PDP⁻¹', note: 'P = eigenvectors, D = diagonal eigenvalues' },
      ],
    },
    {
      section: 'Vector Spaces & Subspaces',
      icon: '∈',
      formulas: [
        { name: 'Rank-Nullity Theorem', latex: 'rank(A) + nullity(A) = n', note: 'n = number of columns' },
        { name: 'Orthogonal Complement', latex: 'Col(A)⊥ = Null(Aᵀ)', note: 'Fundamental subspaces' },
        { name: 'Gram-Schmidt Process', latex: 'eᵢ = vᵢ - Σⱼ<ᵢ (vᵢ·eⱼ/‖eⱼ‖²)eⱼ', note: 'Orthonormalization' },
      ],
    },
    {
      section: 'Matrix Decompositions',
      icon: '≡',
      formulas: [
        { name: 'LU Decomposition', latex: 'A = LU', note: 'L lower triangular, U upper triangular' },
        { name: 'QR Decomposition', latex: 'A = QR', note: 'Q orthogonal, R upper triangular' },
        { name: 'SVD', latex: 'A = UΣVᵀ', note: 'U,V orthogonal; Σ diagonal singular values' },
        { name: 'Spectral Theorem', latex: 'A = QΛQᵀ', note: 'For symmetric A: orthogonal diagonalization' },
      ],
    },
  ],
  'calculus': [
    {
      section: 'Partial Derivatives & Gradients',
      icon: '∇',
      formulas: [
        { name: 'Gradient Vector', latex: '∇f = [∂f/∂x, ∂f/∂y, ∂f/∂z]ᵀ', note: 'Direction of steepest ascent' },
        { name: 'Directional Derivative', latex: 'Dᵤf = ∇f · u', note: 'Rate of change in unit direction u' },
        { name: 'Multivariable Chain Rule', latex: 'df/dt = (∂f/∂x)(dx/dt) + (∂f/∂y)(dy/dt)', note: 'Composite differentiation' },
        { name: 'Tangent Plane Equation', latex: 'z - z₀ = fₓ(x₀,y₀)(x - x₀) + fᵧ(x₀,y₀)(y - y₀)', note: 'Linear approximation' },
      ],
    },
    {
      section: 'Optimization & Second Derivative Test',
      icon: 'H',
      formulas: [
        { name: 'Hessian Matrix', latex: 'H = [[fₓₓ, fₓᵧ], [fᵧₓ, fᵧᵧ]]', note: 'Matrix of 2nd partial derivatives' },
        { name: 'Determinant Test', latex: 'D = fₓₓ fᵧᵧ - (fₓᵧ)²', note: 'D > 0 & fₓₓ > 0: Local Min; D < 0: Saddle point' },
        { name: 'Lagrange Multipliers', latex: '∇f = λ ∇g', note: 'Constrained optimization along g(x,y)=k' },
      ],
    },
    {
      section: 'Multiple Integrals',
      icon: '∬',
      formulas: [
        { name: 'Polar Coordinates', latex: 'dx dy = r dr dθ', note: 'x = r cos θ, y = r sin θ' },
        { name: 'Cylindrical Coordinates', latex: 'dx dy dz = r dr dθ dz', note: 'Circular symmetry' },
        { name: 'Spherical Coordinates', latex: 'dV = ρ² sin φ dρ dφ dθ', note: 'x=ρ sin φ cos θ, z=ρ cos φ' },
        { name: 'Jacobian Determinant', latex: 'J = det(∂(x,y)/∂(u,v))', note: 'Coordinate transformation scaling' },
      ],
    },
    {
      section: 'Vector Calculus Theorems',
      icon: '∮',
      formulas: [
        { name: 'Divergence', latex: 'div F = ∇ · F = ∂P/∂x + ∂Q/∂y + ∂R/∂z', note: 'Source/sink expansion rate' },
        { name: 'Curl', latex: 'curl F = ∇ × F', note: 'Local rotational tendency' },
        { name: "Green's Theorem", latex: '∮ (P dx + Q dy) = ∬ (∂Q/∂x - ∂P/∂y) dA', note: 'Boundary circulation to 2D curl' },
        { name: "Divergence Theorem", latex: '∯ F · n dS = ∭ (div F) dV', note: 'Surface flux to volume divergence' },
      ],
    },
  ],
  'probability': [
    {
      section: 'Foundations & Bayes Rule',
      icon: 'P',
      formulas: [
        { name: "Bayes' Theorem", latex: 'P(A|B) = [P(B|A) · P(A)] / P(B)', note: 'Posterior probability update' },
        { name: 'Law of Total Probability', latex: 'P(B) = Σᵢ P(B|Aᵢ) P(Aᵢ)', note: 'Partition expansion' },
        { name: 'Conditional Probability', latex: 'P(A|B) = P(A ∩ B) / P(B)', note: 'P(B) > 0' },
        { name: 'Independence', latex: 'P(A ∩ B) = P(A) · P(B)', note: 'Equivalent to P(A|B) = P(A)' },
      ],
    },
    {
      section: 'Random Variables & Expectation',
      icon: 'E',
      formulas: [
        { name: 'Expected Value', latex: 'E[X] = Σ x P(X=x)  or  ∫ x f(x) dx', note: 'Center of mass / Mean' },
        { name: 'Variance', latex: 'Var(X) = E[X²] - (E[X])²', note: 'Dispersion measurement' },
        { name: 'Covariance', latex: 'Cov(X,Y) = E[XY] - E[X]E[Y]', note: 'Joint linear relationship' },
        { name: 'Linearity of Expectation', latex: 'E[aX + bY] = aE[X] + bE[Y]', note: 'Holds even if X, Y are dependent' },
      ],
    },
    {
      section: 'Common Distributions',
      icon: 'N',
      formulas: [
        { name: 'Binomial Distribution', latex: 'P(X=k) = (ⁿₖ) pᵏ (1-p)ⁿ⁻ᵏ', note: 'Mean = np, Var = np(1-p)' },
        { name: 'Poisson Distribution', latex: 'P(X=k) = (λᵏ e⁻λ) / k!', note: 'Rare event count; Mean = Var = λ' },
        { name: 'Gaussian (Normal)', latex: 'f(x) = [1/(σ√(2π))] exp(-(x-μ)² / 2σ²)', note: 'Bell curve PDF' },
        { name: 'Exponential Distribution', latex: 'f(x) = λ e^(-λx) (x ≥ 0)', note: 'Memoryless waiting time' },
      ],
    },
    {
      section: 'Limit Theorems',
      icon: 'lim',
      formulas: [
        { name: 'Law of Large Numbers (LLN)', latex: 'X̄ₙ ⟶ μ as n ⟶ ∞', note: 'Sample average converges to true mean' },
        { name: 'Central Limit Theorem (CLT)', latex: '√n (X̄ₙ - μ) / σ ⟶ N(0, 1)', note: 'Sum of i.i.d. converges to Gaussian' },
        { name: "Markov's Inequality", latex: 'P(X ≥ a) ≤ E[X] / a', note: 'Non-negative random variable upper bound' },
        { name: "Chebyshev's Inequality", latex: 'P(|X - μ| ≥ kσ) ≤ 1 / k²', note: 'Deviation from mean bound' },
      ],
    },
  ],
  'statistics': [
    {
      section: 'Estimators & Maximum Likelihood',
      icon: 'L',
      formulas: [
        { name: 'Sample Mean & Variance', latex: 'x̄ = (1/n)Σxᵢ, s² = (1/(n-1))Σ(xᵢ - x̄)²', note: 'Bessel correction for unbias' },
        { name: 'Likelihood Function', latex: 'L(θ; x) = Πᵢ f(xᵢ; θ)', note: 'Joint density of observed sample' },
        { name: 'Log-Likelihood Score', latex: 'd/dθ ln L(θ; x) = 0', note: 'Solve for parameter θ (MLE)' },
        { name: 'Standard Error of the Mean', latex: 'SE = s / √n', note: 'Precision of sample mean estimate' },
      ],
    },
    {
      section: 'Confidence Intervals & Tests',
      icon: 'CI',
      formulas: [
        { name: 'Normal Mean CI (known σ)', latex: 'x̄ ± z*(σ / √n)', note: 'z* = 1.96 for 95% confidence' },
        { name: 't-Interval (unknown σ)', latex: 'x̄ ± t*(s / √n)', note: 'df = n - 1' },
        { name: 'One-Sample t-Statistic', latex: 't = (x̄ - μ₀) / (s / √n)', note: 'Hypothesis testing against μ₀' },
        { name: 'Chi-Square Test', latex: 'χ² = Σ (Oᵢ - Eᵢ)² / Eᵢ', note: 'Goodness-of-fit and independence' },
      ],
    },
    {
      section: 'Linear Regression',
      icon: 'β',
      formulas: [
        { name: 'Slope Coefficient (β₁)', latex: 'β₁ = Cov(X,Y) / Var(X) = Σ(x-x̄)(y-ȳ)/Σ(x-x̄)²', note: 'Ordinary Least Squares' },
        { name: 'Intercept (β₀)', latex: 'β₀ = ȳ - β₁ x̄', note: 'Regression line passes through (x̄, ȳ)' },
        { name: 'Coefficient of Determination (R²)', latex: 'R² = 1 - (SS_res / SS_tot)', note: 'Proportion of variance explained' },
      ],
    },
  ],
  'number-theory': [
    {
      section: 'Divisibility & Euclidean Algorithm',
      icon: 'gcd',
      formulas: [
        { name: 'Division Algorithm', latex: 'a = bq + r,  0 ≤ r < b', note: 'Unique quotient and remainder' },
        { name: 'Euclidean Algorithm', latex: 'gcd(a, b) = gcd(b, a mod b)', note: 'Repeated remainder reduction' },
        { name: "Bézout's Identity", latex: 'ax + by = gcd(a, b)', note: 'Extended Euclidean algorithm for x, y' },
      ],
    },
    {
      section: 'Congruences & Modular Inverses',
      icon: '≡',
      formulas: [
        { name: 'Congruence Definition', latex: 'a ≡ b (mod m)  ⟺  m | (a - b)', note: 'Same remainder modulo m' },
        { name: 'Modular Inverse', latex: 'ax ≡ 1 (mod m)', note: 'Exists iff gcd(a, m) = 1' },
        { name: 'Chinese Remainder Theorem', latex: 'x ≡ aᵢ (mod mᵢ)', note: 'Unique solution mod M if mᵢ pairwise coprime' },
      ],
    },
    {
      section: 'Primes & Totient Theorems',
      icon: 'φ',
      formulas: [
        { name: "Euler's Totient Function", latex: 'φ(n) = n · Π_{p|n} (1 - 1/p)', note: 'Count of integers coprime to n' },
        { name: "Fermat's Little Theorem", latex: 'aᵖ⁻¹ ≡ 1 (mod p)', note: 'For prime p, gcd(a, p) = 1' },
        { name: "Euler's Generalization", latex: 'a^{φ(m)} ≡ 1 (mod m)', note: 'Whenever gcd(a, m) = 1' },
        { name: 'RSA Key Generation', latex: 'ed ≡ 1 (mod φ(N)), where N = pq', note: 'Public: (e, N), Private: (d, N)' },
      ],
    },
  ],
  'discrete-math': [
    {
      section: 'Logic & Set Theory',
      icon: '∧',
      formulas: [
        { name: "De Morgan's Laws (Logic)", latex: '¬(P ∧ Q) ≡ ¬P ∨ ¬Q', note: 'Negation distributes with flip' },
        { name: 'Contrapositive', latex: '(P ⟹ Q) ≡ (¬Q ⟹ ¬P)', note: 'Logically equivalent proof method' },
        { name: 'Inclusion-Exclusion', latex: '|A ∪ B| = |A| + |B| - |A ∩ B|', note: 'For 3 sets: add triples, sub pairs' },
      ],
    },
    {
      section: 'Combinatorics & Recurrences',
      icon: 'C',
      formulas: [
        { name: 'Combinations (n choose k)', latex: 'C(n,k) = n! / [k! (n-k)!]', note: 'Unordered selections' },
        { name: "Pascal's Identity", latex: 'C(n, k) = C(n-1, k-1) + C(n-1, k)', note: 'Triangle recursive expansion' },
        { name: 'Pigeonhole Principle', latex: '⌈n/k⌉ items per container', note: 'If n items placed into k boxes' },
        { name: 'Master Theorem', latex: 'T(n) = a T(n/b) + O(nᵈ)', note: 'Time complexity for divide-and-conquer' },
      ],
    },
    {
      section: 'Graph Theory',
      icon: 'G',
      formulas: [
        { name: 'Handshaking Lemma', latex: 'Σ_{v∈V} deg(v) = 2|E|', note: 'Sum of degrees equals twice edges' },
        { name: "Euler's Formula (Planar)", latex: 'V - E + F = 2', note: 'For connected planar graphs' },
        { name: 'Tree Property', latex: '|E| = |V| - 1', note: 'Connected acyclic graph' },
      ],
    },
  ],
};

export default function CheatsheetPanel({ onClose, currentSubject }) {
  const subjectKey = currentSubject?.id || 'linear-algebra';
  const cheatsheet = SUBJECT_CHEATSHEETS[subjectKey] || SUBJECT_CHEATSHEETS['linear-algebra'];

  const [expanded, setExpanded] = useState([cheatsheet[0]?.section, cheatsheet[1]?.section]);
  const [copied, setCopied] = useState(null);

  const toggle = (section) => {
    setExpanded(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={20} color="#818cf8" />
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0 }}>
                Formula Cheatsheet: {currentSubject?.title || 'Linear Algebra'}
              </h2>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Essential theorems & identities for this subject</p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {cheatsheet.map((sec) => {
            const isOpen = expanded.includes(sec.section);
            return (
              <div key={sec.section} style={sectionCardStyle}>
                {/* Section Header */}
                <button
                  onClick={() => toggle(sec.section)}
                  style={sectionHeaderStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px', width: '28px', textAlign: 'center', color: '#818cf8', fontWeight: 700 }}>{sec.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#f4f4f5' }}>{sec.section}</span>
                    <span style={{ fontSize: '11px', color: '#52525b' }}>{sec.formulas.length} formulas</span>
                  </div>
                  {isOpen ? <ChevronDown size={16} color="#71717a" /> : <ChevronRight size={16} color="#71717a" />}
                </button>

                {/* Formulas */}
                {isOpen && (
                  <div style={{ padding: '4px 0 8px 0' }}>
                    {sec.formulas.map((f, i) => (
                      <div key={i} style={formulaRowStyle}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '12px', color: '#71717a', marginBottom: '3px' }}>{f.name}</div>
                          <div style={latexBoxStyle}>{f.latex}</div>
                          {f.note && <div style={{ fontSize: '11px', color: '#52525b', marginTop: '3px' }}>{f.note}</div>}
                        </div>
                        <button
                          onClick={() => handleCopy(f.latex, `${sec.section}-${i}`)}
                          style={copyBtnStyle}
                          title="Copy formula"
                        >
                          {copied === `${sec.section}-${i}` ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)',
  backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', zIndex: 1000, padding: '20px',
};
const panelStyle = {
  width: '100%', maxWidth: '720px', height: '600px',
  backgroundColor: '#0e0e12', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
};
const headerStyle = {
  padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
};
const closeBtnStyle = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#a1a1aa', borderRadius: '8px', width: '32px', height: '32px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
};
const sectionCardStyle = {
  border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px',
  marginBottom: '10px', overflow: 'hidden',
};
const sectionHeaderStyle = {
  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '12px 14px', background: 'rgba(255,255,255,0.03)', border: 'none',
  cursor: 'pointer', textAlign: 'left',
};
const formulaRowStyle = {
  display: 'flex', alignItems: 'flex-start', gap: '10px',
  padding: '10px 14px', borderTop: '1px solid rgba(255,255,255,0.04)',
};
const latexBoxStyle = {
  fontFamily: 'monospace', fontSize: '13px', color: '#c4b5fd',
  background: 'rgba(129,140,248,0.08)', padding: '5px 10px',
  borderRadius: '6px', display: 'inline-block',
};
const copyBtnStyle = {
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#71717a', borderRadius: '6px', width: '28px', height: '28px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer', flexShrink: 0, marginTop: '2px',
};
