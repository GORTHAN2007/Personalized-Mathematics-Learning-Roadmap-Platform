import React, { useState } from 'react';
import { X, PlayCircle, ExternalLink, Video } from 'lucide-react';

const SUBJECT_VIDEOS = {
  'linear-algebra': [
    {
      id: 1,
      title: 'Vectors | Essence of Linear Algebra',
      channel: '3Blue1Brown',
      topic: 'Vectors & Coordinate Systems',
      youtubeId: 'fNk_zzaMoSs',
      description: 'Geometric interpretation of vectors, vector additions, and scalar multiplication.',
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
      title: 'The Determinant',
      channel: '3Blue1Brown',
      topic: 'Determinants',
      youtubeId: 'Ip3X9LOh2dk',
      description: 'Geometric scaling factor of areas and volumes, and how signs represent orientation.',
    },
    {
      id: 5,
      title: 'Eigenvectors and Eigenvalues',
      channel: '3Blue1Brown',
      topic: 'Eigenanalysis',
      youtubeId: 'PFDu9oVAE-g',
      description: 'Axes that remain unchanged in direction during complex matrix transformations.',
    },
    {
      id: 6,
      title: 'Singular Value Decomposition (SVD)',
      channel: 'Gilbert Strang (MIT OCW)',
      topic: 'Decomposition & Data Science',
      youtubeId: 'mBcLRGuAFUk',
      description: 'Prof. Gilbert Strang breaks down SVD geometry and applications in engineering.',
    }
  ],
  'calculus': [
    {
      id: 1,
      title: 'The Essence of Calculus',
      channel: '3Blue1Brown',
      topic: 'Foundations of Continuous Math',
      youtubeId: 'WUvTyaaNkzM',
      description: 'The visual intuition behind area, slope, and the fundamental theorem of calculus.',
    },
    {
      id: 2,
      title: 'Visualizing Multivariable Calculus',
      channel: 'Khan Academy',
      topic: '3D Coordinate Systems & Surfaces',
      youtubeId: '3G8s4C17pX4',
      description: 'Graphing functions of two variables and understanding contours and level curves.',
    },
    {
      id: 3,
      title: 'Gradients and Directional Derivatives',
      channel: '3Blue1Brown',
      topic: 'Partial Derivatives & Optimization',
      youtubeId: 'TEB2z7ZlRAw',
      description: 'Why the gradient vector points in the direction of steepest ascent.',
    },
    {
      id: 4,
      title: 'Double and Triple Integrals',
      channel: 'Professor Leonard',
      topic: 'Multiple Integrals',
      youtubeId: 'pSffQzK3K6g',
      description: 'Volume under a surface, bounding regions, and switching orders of integration.',
    },
    {
      id: 5,
      title: 'Divergence and Curl: The Language of Maxwell',
      channel: '3Blue1Brown',
      topic: 'Vector Fields',
      youtubeId: 'rB83DpBJQsE',
      description: 'Fluid flow metaphors for divergence (flux out of a point) and curl (rotation).',
    }
  ],
  'probability': [
    {
      id: 1,
      title: 'Bayes Theorem Intuition',
      channel: '3Blue1Brown',
      topic: 'Conditional Probability & Bayes Rule',
      youtubeId: 'HZGCoVF3YvM',
      description: 'Visualizing probability space with boxes to understand prior vs posterior belief.',
    },
    {
      id: 2,
      title: 'Probability Density Functions (PDFs)',
      channel: 'StatQuest with Josh Starmer',
      topic: 'Continuous Random Variables',
      youtubeId: 'oI3hZJqXJuc',
      description: 'Clearly explained difference between discrete probabilities and continuous densities.',
    },
    {
      id: 3,
      title: 'The Central Limit Theorem Visually Explained',
      channel: '3Blue1Brown',
      topic: 'Limit Theorems',
      youtubeId: 'zeJD6dqJ5lo',
      description: 'Why independent additions always converge to the bell curve normal distribution.',
    },
    {
      id: 4,
      title: 'Markov Chains: Origin and Concept',
      channel: 'Normalized Nerd',
      topic: 'Stochastic Processes',
      youtubeId: 'i3AkTO9HLXo',
      description: 'State transitions, probability transition matrices, and stationary equilibrium.',
    }
  ],
  'statistics': [
    {
      id: 1,
      title: 'Maximum Likelihood Estimation (MLE)',
      channel: 'StatQuest with Josh Starmer',
      topic: 'Point Estimation',
      youtubeId: 'XepXtl9YKwc',
      description: 'Step-by-step intuition behind finding the parameter that maximizes observed data probability.',
    },
    {
      id: 2,
      title: 'Hypothesis Testing and p-values',
      channel: 'StatQuest with Josh Starmer',
      topic: 'Inference & Null Hypotheses',
      youtubeId: 'vemZtEM63GY',
      description: 'Clear graphical walkthrough of critical regions, null distributions, and p-values.',
    },
    {
      id: 3,
      title: 'Linear Regression and Least Squares',
      channel: 'StatQuest with Josh Starmer',
      topic: 'Regression Modeling',
      youtubeId: 'PaFPbb66DxQ',
      description: 'Minimizing residual sum of squares and interpreting R-squared correlation.',
    },
    {
      id: 4,
      title: 'Confidence Intervals Clearly Explained',
      channel: 'Bionic Turtle',
      topic: 'Confidence Intervals',
      youtubeId: 'tFWsuO9f74o',
      description: 'What a 95% confidence interval actually means under repeated sampling.',
    }
  ],
  'number-theory': [
    {
      id: 1,
      title: 'Euclidean Algorithm for Greatest Common Divisor',
      channel: 'Khan Academy',
      topic: 'Divisibility & GCD',
      youtubeId: 'JUzYl1TYMcU',
      description: 'Repeated division and geometric subtraction to find the greatest common factor.',
    },
    {
      id: 2,
      title: 'Modular Arithmetic and Clock Math',
      channel: 'Numberphile',
      topic: 'Congruences',
      youtubeId: 'h8jW7f6oHh4',
      description: 'Cycles, congruence classes, and arithmetic in finite ring systems.',
    },
    {
      id: 3,
      title: 'The RSA Encryption Algorithm',
      channel: 'Computerphile',
      topic: 'Public Key Cryptography',
      youtubeId: 'JD72Ry60eP4',
      description: 'How primes, Euler totient function, and modular exponents secure modern internet communication.',
    },
    {
      id: 4,
      title: 'Fermat’s Little Theorem and Primality',
      channel: 'Numberphile',
      topic: 'Primes & Totients',
      youtubeId: 'w0ZQvZLx2KA',
      description: 'The elegant theorem underpinning modular inverse operations and primality tests.',
    }
  ],
  'discrete-math': [
    {
      id: 1,
      title: 'Introduction to Graph Theory',
      channel: 'Sarada Herke',
      topic: 'Graph Fundamentals',
      youtubeId: 'sTs37Tsh_yY',
      description: 'Vertices, edges, degrees, adjacency representations, and isomorphism.',
    },
    {
      id: 2,
      title: 'Dijkstra’s Shortest Path Algorithm',
      channel: 'Computerphile',
      topic: 'Graph Algorithms',
      youtubeId: 'GazC3VDpe0U',
      description: 'Greedy shortest-path search on weighted graphs with edge relaxation.',
    },
    {
      id: 3,
      title: 'Mathematical Induction Made Easy',
      channel: 'NancyPi',
      topic: 'Proofs & Induction',
      youtubeId: 't5ms5Y9qK40',
      description: 'Base case, induction hypothesis, and algebraic induction step clearly demonstrated.',
    },
    {
      id: 4,
      title: 'Boolean Algebra and Logic Gates',
      channel: 'CrashCourse Computer Science',
      topic: 'Boolean Logic',
      youtubeId: 'gI-qXk7XojA',
      description: 'AND, OR, NOT operations mapped to electronic circuits and truth tables.',
    }
  ]
};

export default function SimulationsPanel({ onClose, currentSubject }) {
  const subjectKey = currentSubject?.id || 'linear-algebra';
  const videos = SUBJECT_VIDEOS[subjectKey] || SUBJECT_VIDEOS['linear-algebra'];

  const [activeId, setActiveId] = useState(videos[0]?.id || 1);
  const activeLesson = videos.find(s => s.id === activeId) || videos[0];

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
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0 }}>
                Visual Simulations & Lectures: {currentSubject?.title || 'Linear Algebra'}
              </h2>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Curated YouTube walkthroughs & visual geometry</p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Video List Sidebar */}
          <div style={listStyle}>
            {videos.map(lesson => (
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
                key={activeLesson?.youtubeId}
                src={`https://www.youtube.com/embed/${activeLesson?.youtubeId}?autoplay=1&rel=0`}
                title={activeLesson?.title || 'Lecture'}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Video Meta Footer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0e0e12' }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>{activeLesson?.title}</h3>
                <p style={{ fontSize: '12px', color: '#71717a', margin: '2px 0 0 0' }}>{activeLesson?.description}</p>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${activeLesson?.youtubeId}`}
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
