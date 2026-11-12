import React, { useState } from 'react';
import { personalizedRoadmaps } from '../data/roadmapData';
import { Sparkles, Calendar, Target, BookOpen, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RoadmapPage({ onSelectSubject, onGoToDashboard }) {
  // Form State
  const [interest, setInterest] = useState('data-science');
  const [level, setLevel] = useState('Intermediate');
  const [goal, setGoal] = useState('Machine Learning Foundations');
  const [pace, setPace] = useState('Steady (4-6 hrs/week)');
  const [activeRoadmap, setActiveRoadmap] = useState(personalizedRoadmaps['data-science']);
  const [isGenerated, setIsGenerated] = useState(true);

  const handleGenerate = (e) => {
    e.preventDefault();
    // Match based on selected interest key from predefined JavaScript data
    const matched = personalizedRoadmaps[interest] || personalizedRoadmaps['data-science'];
    setActiveRoadmap(matched);
    setIsGenerated(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Personalized Roadmap Planner</h1>
        <p className="page-subtitle">
          Configure your interests, current background, and weekly availability to generate a structured milestone timeline.
        </p>
      </div>

      {/* Generator Form */}
      <form onSubmit={handleGenerate} className="generator-card">
        <div className="form-group-grid">
          {/* Mathematical Interests */}
          <div className="form-field">
            <label className="form-label">Mathematical Interests</label>
            <select 
              className="form-select"
              value={interest} 
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="data-science">Data Science & Machine Learning</option>
              <option value="cryptography">Cryptography & Cyber Security</option>
              <option value="competitive-programming">Competitive Programming & Algorithms</option>
              <option value="pure-math">Pure Mathematics & Formal Proofs</option>
            </select>
          </div>

          {/* Current Knowledge Level */}
          <div className="form-field">
            <label className="form-label">Current Knowledge Level</label>
            <select 
              className="form-select"
              value={level} 
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner">Beginner (High School Algebra & Basic Calculus)</option>
              <option value="Intermediate">Intermediate (Undergraduate College STEM)</option>
              <option value="Advanced">Advanced (Upper Division / Mathematics Major)</option>
            </select>
          </div>

          {/* Learning Goals */}
          <div className="form-field">
            <label className="form-label">Primary Learning Goal</label>
            <select 
              className="form-select"
              value={goal} 
              onChange={(e) => setGoal(e.target.value)}
            >
              <option value="Machine Learning Foundations">Machine Learning Foundations</option>
              <option value="Pass College Exam with Distinction">Ace College Semester Exam</option>
              <option value="Software Engineering Tech Interviews">Software Engineering Interviews</option>
              <option value="Competitive Math & Olympiads">Competitive Olympiads</option>
              <option value="Self-Paced Intellectual Curiosity">Self-Paced Intellectual Curiosity</option>
            </select>
          </div>

          {/* Preferred Pace */}
          <div className="form-field">
            <label className="form-label">Preferred Learning Pace</label>
            <select 
              className="form-select"
              value={pace} 
              onChange={(e) => setPace(e.target.value)}
            >
              <option value="Intensive (10+ hrs/week)">Intensive (10+ hrs/week)</option>
              <option value="Steady (4-6 hrs/week)">Steady (4-6 hrs/week)</option>
              <option value="Casual (1-2 hrs/week)">Casual (1-2 hrs/week)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-generate-roadmap">
          <Sparkles size={16} />
          <span>Generate Personalized Roadmap</span>
        </button>
      </form>

      {/* Generated Roadmap Display */}
      {isGenerated && activeRoadmap && (
        <div style={{ marginTop: '36px' }}>
          <div style={{ 
            backgroundColor: '#111116', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: '14px', 
            padding: '24px 28px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#818cf8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Recommended Track
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>
                  {activeRoadmap.track}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <span className="course-badge">
                  <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {activeRoadmap.duration}
                </span>
                <span className="course-badge highlight">
                  <Target size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {level}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14.5px', color: '#a1a1aa', lineHeight: 1.6 }}>
              {activeRoadmap.overview}
            </p>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#f4f4f5', marginBottom: '16px' }}>
            Structured Learning Phases & Milestones
          </h3>

          <div className="timeline-track">
            {activeRoadmap.milestones.map((ms, index) => (
              <div key={index} className="timeline-milestone-card">
                <div className="milestone-badge-box">
                  {index + 1}
                </div>

                <div className="milestone-details" style={{ flex: 1 }}>
                  <h4>{ms.phase}</h4>
                  <div className="milestone-subject">Domain: {ms.subject}</div>

                  <div className="milestone-topics-list">
                    {ms.topics.map(t => (
                      <span key={t} className="milestone-topic-chip">
                        <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4, color: '#10b981' }} />
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="milestone-project-note">
                    <strong>Recommended Practical Milestone:</strong> {ms.suggestedProjects}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
