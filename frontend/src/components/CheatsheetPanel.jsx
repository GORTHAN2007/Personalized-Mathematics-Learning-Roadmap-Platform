import React, { useState } from 'react';
import { X, FileCode, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

const CHEATSHEET = [
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
    section: 'Vector Spaces',
    icon: '∈',
    formulas: [
      { name: 'Rank-Nullity Theorem', latex: 'rank(A) + nullity(A) = n', note: 'n = number of columns' },
      { name: 'Orthogonal Complement', latex: 'Col(A)⊥ = Null(Aᵀ)', note: 'Fundamental subspaces' },
      { name: 'Gram-Schmidt', latex: 'eᵢ = vᵢ - Σⱼ<ᵢ (vᵢ·eⱼ/‖eⱼ‖²)eⱼ', note: 'Orthogonalization process' },
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
];

export default function CheatsheetPanel({ onClose }) {
  const [expanded, setExpanded] = useState(['Matrix Operations', 'Eigenvalues & Eigenvectors']);
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
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0 }}>Formula Cheatsheet</h2>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Essential theorems & rules — Linear Algebra</p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {CHEATSHEET.map((sec) => {
            const isOpen = expanded.includes(sec.section);
            return (
              <div key={sec.section} style={sectionCardStyle}>
                {/* Section Header */}
                <button
                  onClick={() => toggle(sec.section)}
                  style={sectionHeaderStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>{sec.icon}</span>
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
  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', zIndex: 1000, padding: '20px',
};
const panelStyle = {
  width: '100%', maxWidth: '700px', height: '600px',
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
