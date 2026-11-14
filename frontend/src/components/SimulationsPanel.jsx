import React, { useState } from 'react';
import { X, PlayCircle, ExternalLink, Maximize2 } from 'lucide-react';

const SIMULATIONS = [
  {
    id: 1,
    title: 'Matrix Transformation Visualizer',
    description: 'See how 2×2 matrices transform unit vectors, the unit circle, and geometric shapes in real time. Drag entries to explore rotations, shears, projections.',
    subject: 'Linear Algebra',
    type: 'Interactive Tool',
    url: 'https://www.geogebra.org/m/mtnhghtg',
    embed: 'https://www.geogebra.org/material/iframe/id/mtnhghtg/width/700/height/400/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/false/rc/false/ld/false/sdz/false/ctl/false',
    tags: ['Transformations', 'Geometry', 'Visualization'],
  },
  {
    id: 2,
    title: 'Eigenvalue & Eigenvector Explorer',
    description: 'Visualize eigenvectors as fixed directions under a linear transformation. Watch how eigenvalues scale them while other vectors rotate.',
    subject: 'Linear Algebra',
    type: 'Visual Simulation',
    url: 'https://setosa.io/ev/eigenvectors-and-eigenvalues/',
    embed: null,
    tags: ['Eigenvalues', 'Eigenvectors', 'Linear Maps'],
  },
  {
    id: 3,
    title: 'Gaussian Elimination Step-by-Step',
    description: 'Walk through row reduction operations on augmented matrices. Each pivot step is animated and explained in plain English.',
    subject: 'Linear Algebra',
    type: 'Algorithm Walkthrough',
    url: 'https://www.wolframalpha.com/widgets/view.jsp?id=3c8b3b7a9e4a2c4eedf618dd77b98c56',
    embed: null,
    tags: ['Row Reduction', 'RREF', 'Systems'],
  },
  {
    id: 4,
    title: '3Blue1Brown: Essence of Linear Algebra',
    description: 'The most acclaimed visual series on linear algebra. Covers vectors, matrices, determinants, eigenvalues from geometric first principles.',
    subject: 'Linear Algebra',
    type: 'Video Series',
    url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab',
    embed: 'https://www.youtube.com/embed/fNk_zzaMoSs',
    tags: ['Geometric Intuition', 'Video', 'Foundations'],
  },
  {
    id: 5,
    title: 'Singular Value Decomposition (SVD) Demo',
    description: 'Explore how SVD breaks any matrix into rotation, scaling, and rotation. See image compression and PCA in action.',
    subject: 'Linear Algebra',
    type: 'Interactive Demo',
    url: 'https://setosa.io/ev/principal-component-analysis/',
    embed: null,
    tags: ['SVD', 'PCA', 'Decomposition'],
  },
];

const tagColors = {
  'Transformations': '#818cf8',
  'Geometry': '#c084fc',
  'Eigenvalues': '#f59e0b',
  'Video': '#ef4444',
  'Algorithm Walkthrough': '#10b981',
};

export default function SimulationsPanel({ onClose }) {
  const [activeId, setActiveId] = useState(null);
  const activeSim = SIMULATIONS.find(s => s.id === activeId);

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PlayCircle size={20} color="#818cf8" />
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0 }}>Visual Simulations</h2>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Interactive transformation tools & video series</p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Simulation List */}
          <div style={listStyle}>
            {SIMULATIONS.map(sim => (
              <div
                key={sim.id}
                onClick={() => setActiveId(sim.id)}
                style={{
                  ...simItemStyle,
                  backgroundColor: activeId === sim.id ? 'rgba(129,140,248,0.1)' : 'transparent',
                  borderLeft: activeId === sim.id ? '2px solid #818cf8' : '2px solid transparent',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f5', lineHeight: 1.3 }}>{sim.title}</span>
                </div>
                <span style={{ fontSize: '11px', color: '#52525b', marginBottom: '6px', display: 'block' }}>{sim.type}</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {sim.tags.slice(0, 2).map(tag => (
                    <span key={tag} style={{ ...tagStyle, borderColor: tagColors[tag] || 'rgba(255,255,255,0.1)', color: tagColors[tag] || '#71717a' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Detail / Preview pane */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeSim ? (
              <>
                {/* Embed or placeholder */}
                <div style={{ flex: 1, background: '#060608', overflow: 'hidden', position: 'relative' }}>
                  {activeSim.embed ? (
                    <iframe
                      src={activeSim.embed}
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                      allowFullScreen
                      title={activeSim.title}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', padding: '24px' }}>
                      <div style={{ fontSize: '48px' }}>🔬</div>
                      <p style={{ color: '#a1a1aa', fontSize: '14px', textAlign: 'center', maxWidth: '300px', lineHeight: 1.6 }}>
                        {activeSim.description}
                      </p>
                      <a href={activeSim.url} target="_blank" rel="noopener noreferrer" style={openBtnStyle}>
                        <ExternalLink size={14} /> Open in New Tab
                      </a>
                    </div>
                  )}
                </div>
                {/* Footer */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{activeSim.title}</div>
                    <div style={{ fontSize: '11px', color: '#52525b' }}>{activeSim.subject} · {activeSim.type}</div>
                  </div>
                  <a href={activeSim.url} target="_blank" rel="noopener noreferrer" style={openBtnStyle}>
                    <ExternalLink size={13} /> Open
                  </a>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#52525b', gap: '10px' }}>
                <PlayCircle size={32} />
                <span style={{ fontSize: '14px' }}>Select a simulation to preview</span>
              </div>
            )}
          </div>
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
  width: '100%', maxWidth: '900px', height: '600px',
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
const listStyle = {
  width: '260px', borderRight: '1px solid rgba(255,255,255,0.07)',
  overflowY: 'auto', flexShrink: 0,
};
const simItemStyle = {
  padding: '12px 14px', cursor: 'pointer', transition: 'background 0.15s',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
};
const tagStyle = {
  fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
  border: '1px solid', background: 'transparent',
};
const openBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '5px',
  background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.25)',
  color: '#818cf8', borderRadius: '8px', padding: '7px 14px',
  fontSize: '12px', fontWeight: 600, textDecoration: 'none', cursor: 'pointer',
};
