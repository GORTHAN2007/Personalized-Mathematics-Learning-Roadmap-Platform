import React from 'react';
import { 
  ArrowRight, 
  Grid, 
  Activity, 
  PieChart, 
  BarChart3, 
  Hash, 
  Network,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export default function SubjectPage({ subjects, onSelectSubject, onGoToDashboard }) {
  const getSubjectIcon = (iconName, color) => {
    const props = { size: 22, color: color || '#818cf8' };
    switch (iconName) {
      case 'Grid': return <Grid {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'PieChart': return <PieChart {...props} />;
      case 'BarChart3': return <BarChart3 {...props} />;
      case 'Hash': return <Hash {...props} />;
      case 'Network': return <Network {...props} />;
      default: return <Grid {...props} />;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Subject Discovery</h1>
        <p className="page-subtitle">
          Explore core mathematical domains. Select any subject to inspect its structured units, interactive simulations, and community roadmaps.
        </p>
      </div>

      <div className="subject-cards-grid">
        {subjects.map((subject) => (
          <div key={subject.id} className="subject-card">
            <div>
              <div className="subject-card-top">
                <div className="subject-icon-box">
                  {getSubjectIcon(subject.icon, subject.color)}
                </div>
                <span className="subject-code-badge">{subject.code}</span>
              </div>

              <h2 className="subject-card-title">{subject.title}</h2>
              <p className="subject-card-desc">{subject.description}</p>
            </div>

            <div>
              <div className="subject-stats-row">
                <span>
                  <Layers size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {subject.totalUnits} Units
                </span>
                <span>
                  <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                  ~{subject.estimatedHours} hrs
                </span>
                <span>
                  <Award size={13} style={{ display: 'inline', marginRight: 4 }} />
                  {subject.difficulty}
                </span>
              </div>

              <div style={{ marginBottom: '8px', fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Applied In:
              </div>
              <div className="subject-app-tags">
                {subject.popularApplications?.map(app => (
                  <span key={app} className="app-tag">{app}</span>
                ))}
              </div>

              <button 
                className="subject-action-btn"
                onClick={() => {
                  onSelectSubject(subject.id);
                  onGoToDashboard();
                }}
              >
                <span>Explore Roadmap</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
