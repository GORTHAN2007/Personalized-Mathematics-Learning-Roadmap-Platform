import React, { useState } from 'react';
import { X, PlayCircle, ExternalLink, Video } from 'lucide-react';

const YOUTUBE_LESSONS = [
  {
    id: 1,
    title: 'Essence of Linear Algebra: Vectors',
    channel: '3Blue1Brown',
    topic: 'Foundations & Geometry',
    youtubeId: 'fNk_zzaMoSs',
    description: 'The geometric interpretation of vectors, coordinates, and vector additions.',
  },
  {
    id: 2,
    title: 'Linear Combinations, Span, and Bases',
    channel: '3Blue1Brown',
    topic: 'Vector Spaces & Subspaces',
    youtubeId: 'k7RM-ot2NWY',
    description: 'Visual intuition behind spanning sets, linear independence, and basis vectors.',
  },
  {
    id: 3,
    title: 'Linear Transformations & Matrices',
    channel: '3Blue1Brown',
    topic: 'Transformations',
    youtubeId: 'kYB8IZa5AuE',
    description: 'Understanding matrices as geometric movements and space transformation.',
  },
  {
    id: 4,
    title: 'Matrix Multiplication as Composition',
    channel: '3Blue1Brown',
    topic: 'Matrix Arithmetic',
    youtubeId: 'XkY2DOUCWMU',
    description: 'Why matrix multiplication works the way it does through successive spatial transformations.',
  },
  {
    id: 5,
    title: 'The Determinant',
    channel: '3Blue1Brown',
    topic: 'Determinants',
    youtubeId: 'Ip3X9LOh2dk',
    description: 'Geometric scaling factor of areas and volumes, and how signs represent orientation.',
  },
  {
    id: 6,
    title: 'Eigenvectors and Eigenvalues',
    channel: '3Blue1Brown',
    topic: 'Eigenanalysis',
    youtubeId: 'PFDu9oVAE-g',
    description: 'Axes that remain unchanged in direction during complex matrix transformations.',
  },
  {
    id: 7,
    title: 'Singular Value Decomposition (SVD)',
    channel: 'MIT OpenCourseWare (Gilbert Strang)',
    topic: 'Decomposition & Data Science',
    youtubeId: 'mBcLRGuAFUk',
    description: 'Prof. Gilbert Strang breaks down SVD geometry and applications in engineering.',
  }
];

export default function SimulationsPanel({ onClose }) {
  const [activeId, setActiveId] = useState(1);
  const activeLesson = YOUTUBE_LESSONS.find(s => s.id === activeId) || YOUTUBE_LESSONS[0];

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ef4444', borderRadius: '6px', padding: '4px', display: 'flex' }}>
              <Video size={18} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0 }}>Visual Concept Lectures & Simulations</h2>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Curated YouTube walkthroughs & visual geometry</p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Video List Sidebar */}
          <div style={listStyle}>
            {YOUTUBE_LESSONS.map(lesson => (
              <div
                key={lesson.id}
                onClick={() => setActiveId(lesson.id)}
                style={{
                  ...simItemStyle,
                  backgroundColor: activeId === lesson.id ? 'rgba(239,68,68,0.1)' : 'transparent',
                  borderLeft: activeId === lesson.id ? '3px solid #ef4444' : '3px solid transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <PlayCircle size={13} color={activeId === lesson.id ? '#ef4444' : '#71717a'} />
                  <span style={{ fontSize: '11px', color: '#a1a1aa' }}>{lesson.channel}</span>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f5', lineHeight: 1.35, marginBottom: '4px' }}>
                  {lesson.title}
                </div>
                <span style={tagStyle}>{lesson.topic}</span>
              </div>
            ))}
          </div>

          {/* YouTube Player Section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: '#050507' }}>
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=1&rel=0`}
                title={activeLesson.title}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Meta Footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0e0e12' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>{activeLesson.title}</h3>
                <p style={{ fontSize: '12px', color: '#71717a', margin: '2px 0 0 0' }}>{activeLesson.description}</p>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${activeLesson.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={openLinkStyle}
              >
                <ExternalLink size={13} />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
  backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', zIndex: 1000, padding: '20px',
};
const panelStyle = {
  width: '100%', maxWidth: '960px', height: '620px',
  backgroundColor: '#0e0e12', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
};
const headerStyle = {
  padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
};
const closeBtnStyle = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#a1a1aa', borderRadius: '8px', width: '32px', height: '32px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
};
const listStyle = {
  width: '280px', borderRight: '1px solid rgba(255,255,255,0.07)',
  overflowY: 'auto', flexShrink: 0, background: '#0b0b0f'
};
const simItemStyle = {
  padding: '12px 14px', cursor: 'pointer', transition: 'background 0.15s',
  borderBottom: '1px solid rgba(255,255,255,0.04)',
};
const tagStyle = {
  fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
  background: 'rgba(255,255,255,0.06)', color: '#a1a1aa', display: 'inline-block'
};
const openLinkStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '6px',
  background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
  color: '#f87171', borderRadius: '8px', padding: '7px 12px',
  fontSize: '12px', fontWeight: 600, textDecoration: 'none', cursor: 'pointer',
};
