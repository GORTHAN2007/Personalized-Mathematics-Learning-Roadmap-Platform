import React from 'react';
import { MessageSquare, Sparkles, Users, Compass } from 'lucide-react';

export default function CommunityPage() {
  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', textAlign: 'center', padding: '40px 24px' }}>
      
      {/* Glow Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '30px',
        backgroundColor: 'rgba(99, 102, 241, 0.12)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        color: '#818cf8',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '24px'
      }}>
        <Sparkles size={14} />
        <span>Feature In Development</span>
      </div>

      {/* Main Title */}
      <h1 style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '16px', maxWidth: '640px', lineHeight: 1.2 }}>
        Community Mathematics Exchange
      </h1>

      {/* Subtitle */}
      <p style={{ fontSize: '16px', color: '#a1a1aa', maxWidth: '540px', lineHeight: 1.6, marginBottom: '36px' }}>
        We are building a peer-to-peer collaboration hub where students and educators can post questions, discuss difficult proofs, and co-curate community roadmap units.
      </p>

      {/* Feature Preview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', width: '100%', maxWidth: '780px', marginBottom: '40px' }}>
        <div style={cardStyle}>
          <div style={iconBoxStyle}>
            <MessageSquare size={18} color="#818cf8" />
          </div>
          <h3 style={cardTitleStyle}>Peer Problem Discussion</h3>
          <p style={cardDescStyle}>Threaded mathematical Q&A with LaTeX math formatting and community upvoting.</p>
        </div>

        <div style={cardStyle}>
          <div style={iconBoxStyle}>
            <Users size={18} color="#10b981" />
          </div>
          <h3 style={cardTitleStyle}>Study Circles & Groups</h3>
          <p style={cardDescStyle}>Join topic-specific cohorts studying Linear Algebra, Probability, and Real Analysis together.</p>
        </div>

        <div style={cardStyle}>
          <div style={iconBoxStyle}>
            <Compass size={18} color="#f59e0b" />
          </div>
          <h3 style={cardTitleStyle}>Community Roadmaps</h3>
          <p style={cardDescStyle}>Fork, customize, and share community-tested roadmaps for college exams and competitions.</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#101014',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  borderRadius: '12px',
  padding: '20px 18px',
  textAlign: 'left'
};

const iconBoxStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '12px'
};

const cardTitleStyle = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '6px'
};

const cardDescStyle = {
  fontSize: '12px',
  color: '#71717a',
  lineHeight: 1.5,
  margin: 0
};
