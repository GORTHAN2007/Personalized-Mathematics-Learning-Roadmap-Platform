import React, { useState } from 'react';
import { X, Play, CheckCircle, BookOpen, ExternalLink, ChevronRight, Clock } from 'lucide-react';

// Content map keyed by topic type
const CONTENT_BY_TYPE = {
  'Interactive Lecture': {
    icon: '📖',
    color: '#818cf8',
    sections: [
      { label: 'Learning Objectives', content: null }, // filled dynamically
      { label: 'Key Concepts', content: null },
      { label: 'Step-by-Step Explanation', content: null },
      { label: 'Practice Questions', content: null },
    ],
  },
  'Algorithm & Simulation': {
    icon: '⚙️',
    color: '#10b981',
    sections: [],
  },
  'Theory & Practice': {
    icon: '📐',
    color: '#f59e0b',
    sections: [],
  },
  'Applied Problem': {
    icon: '🔧',
    color: '#ef4444',
    sections: [],
  },
  'Visual Simulation': {
    icon: '🎯',
    color: '#c084fc',
    sections: [],
  },
  'Practice Problems': {
    icon: '✍️',
    color: '#06b6d4',
    sections: [],
  },
};

function generateContent(topic) {
  const title = topic.title;
  const summary = topic.summary;

  return {
    objectives: [
      `Understand the core definitions and properties of ${title.split(' ')[0].toLowerCase()} concepts`,
      `Apply the theoretical framework to solve standard problems`,
      `Connect this topic to its prerequisites and downstream applications`,
    ],
    keyConcepts: [
      { term: title.split('&')[0].trim(), def: summary },
      { term: 'Application', def: `This concept is foundational for data science, machine learning, and engineering mathematics.` },
      { term: 'Common Mistakes', def: `Pay attention to edge cases: singular matrices, zero vectors, and undefined operations.` },
    ],
    resources: [
      { label: 'MIT OpenCourseWare — Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/' },
      { label: '3Blue1Brown — Essence of LA', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' },
      { label: 'Paul\'s Online Math Notes', url: 'https://tutorial.math.lamar.edu/' },
    ],
    problems: [
      `Given A = [[2, 1], [1, 3]], verify your understanding by computing det(A) and finding A⁻¹.`,
      `Explain in your own words: what does it mean for a system to be inconsistent?`,
      `Construct a 3×3 matrix with rank 2. Describe its null space dimension.`,
    ],
  };
}

export default function StudyModal({ topic, unit, onClose, onMarkComplete }) {
  const [tab, setTab] = useState('overview');
  const [completed, setCompleted] = useState(topic?.completed || false);

  if (!topic) return null;

  const content = generateContent(topic);
  const typeInfo = CONTENT_BY_TYPE[topic.type] || CONTENT_BY_TYPE['Interactive Lecture'];
  const accentColor = typeInfo.color;

  const handleMarkComplete = () => {
    setCompleted(true);
    onMarkComplete && onMarkComplete();
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'concepts', label: 'Key Concepts' },
    { id: 'problems', label: 'Practice' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        {/* Header */}
        <div style={{ ...headerStyle, borderBottom: `1px solid ${accentColor}30` }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '18px' }}>{typeInfo.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {topic.type}
              </span>
              <span style={{ fontSize: '11px', color: '#52525b' }}>·</span>
              <span style={{ fontSize: '11px', color: '#52525b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} /> {topic.duration}
              </span>
            </div>
            <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
              {topic.id} {topic.title}
            </h2>
            <p style={{ fontSize: '12px', color: '#71717a', margin: '4px 0 0 0' }}>{unit?.title}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
            {!completed ? (
              <button onClick={handleMarkComplete} style={completeBtnStyle}>
                <CheckCircle size={14} /> Mark Complete
              </button>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#10b981', fontWeight: 600 }}>
                <CheckCircle size={14} /> Completed
              </span>
            )}
            <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div style={tabBarStyle}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                ...tabBtnStyle,
                color: tab === t.id ? accentColor : '#71717a',
                borderBottom: tab === t.id ? `2px solid ${accentColor}` : '2px solid transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div>
              <div style={infoBoxStyle}>
                <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: 1.7, margin: 0 }}>
                  {topic.summary}
                </p>
              </div>

              <h3 style={sectionTitleStyle}>Learning Objectives</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {content.objectives.map((obj, i) => (
                  <div key={i} style={objectiveRowStyle}>
                    <div style={{ ...objNumStyle, background: `${accentColor}20`, color: accentColor }}>{i + 1}</div>
                    <span style={{ fontSize: '13.5px', color: '#d4d4d8', lineHeight: 1.5 }}>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KEY CONCEPTS */}
          {tab === 'concepts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {content.keyConcepts.map((c, i) => (
                <div key={i} style={conceptCardStyle}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: accentColor, marginBottom: '6px' }}>{c.term}</div>
                  <div style={{ fontSize: '13.5px', color: '#a1a1aa', lineHeight: 1.6 }}>{c.def}</div>
                </div>
              ))}
            </div>
          )}

          {/* PRACTICE */}
          {tab === 'problems' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '13px', color: '#71717a', marginBottom: '8px' }}>Work through these problems to solidify your understanding:</p>
              {content.problems.map((p, i) => (
                <div key={i} style={problemCardStyle}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ ...objNumStyle, background: `${accentColor}15`, color: accentColor, flexShrink: 0 }}>Q{i + 1}</div>
                    <p style={{ fontSize: '13.5px', color: '#d4d4d8', lineHeight: 1.6, margin: 0 }}>{p}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* RESOURCES */}
          {tab === 'resources' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '13px', color: '#71717a', marginBottom: '8px' }}>Curated external materials for deeper learning:</p>
              {content.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={resourceLinkStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookOpen size={15} color={accentColor} />
                    <span style={{ fontSize: '13.5px', color: '#f4f4f5', fontWeight: 500 }}>{r.label}</span>
                  </div>
                  <ExternalLink size={13} color="#52525b" />
                </a>
              ))}
            </div>
          )}
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
  width: '100%', maxWidth: '720px', height: '580px',
  backgroundColor: '#0e0e12', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
};
const headerStyle = {
  padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
  alignItems: 'flex-start', flexShrink: 0, gap: '16px',
};
const closeBtnStyle = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#a1a1aa', borderRadius: '8px', width: '32px', height: '32px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
};
const completeBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '5px',
  background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
  color: '#10b981', borderRadius: '8px', padding: '6px 12px',
  fontSize: '12px', fontWeight: 600, cursor: 'pointer',
};
const tabBarStyle = {
  display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)',
  padding: '0 20px', flexShrink: 0,
};
const tabBtnStyle = {
  background: 'none', border: 'none', padding: '10px 14px',
  fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'color 0.15s',
};
const infoBoxStyle = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px', padding: '16px', marginBottom: '20px',
};
const sectionTitleStyle = {
  fontSize: '13px', fontWeight: 700, color: '#71717a',
  textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px',
};
const objectiveRowStyle = {
  display: 'flex', alignItems: 'flex-start', gap: '12px',
  background: 'rgba(255,255,255,0.02)', borderRadius: '8px', padding: '10px 12px',
};
const objNumStyle = {
  width: '24px', height: '24px', borderRadius: '6px', fontSize: '11px',
  fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};
const conceptCardStyle = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px', padding: '14px 16px',
};
const problemCardStyle = {
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px', padding: '14px 16px',
};
const resourceLinkStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '10px', padding: '12px 16px', textDecoration: 'none',
  transition: 'background 0.15s', cursor: 'pointer',
};
