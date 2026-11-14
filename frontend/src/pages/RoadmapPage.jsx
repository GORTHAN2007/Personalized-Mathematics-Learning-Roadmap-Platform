import React, { useState } from 'react';
import { personalizedRoadmaps } from '../data/roadmapData';
import { Sparkles, Calendar, Target, BookOpen, Clock, ArrowRight, CheckCircle2, Loader } from 'lucide-react';

export default function RoadmapPage({ onSelectSubject, onGoToDashboard }) {
  // Form State
  const [interest, setInterest] = useState('data-science');
  const [level, setLevel] = useState('Beginner');
  const [goal, setGoal] = useState('Machine Learning Foundations');
  const [pace, setPace] = useState('Casual (1-2 hrs/week)');
  const [activeRoadmap, setActiveRoadmap] = useState(personalizedRoadmaps['data-science']);
  const [isGenerated, setIsGenerated] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Try AI generation if backend is reachable, fallback to tailored local roadmap
    try {
      const BASE = import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/v1` 
        : 'http://localhost:5001/api/v1';

      const res = await fetch(`${BASE}/ai/suggest-roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weakTopics: [interest.replace('-', ' '), level],
          goal: `${goal} at a ${pace} pace`
        })
      });

      const data = await res.json();
      if (res.ok && Array.isArray(data.roadmap)) {
        setActiveRoadmap({
          track: `${goal} (${interest.replace('-', ' ').toUpperCase()})`,
          duration: pace.includes('Casual') ? '12 Weeks' : pace.includes('Intensive') ? '4 Weeks' : '8 Weeks',
          overview: `Custom AI-recommended progression tailored for ${level} students targeting "${goal}" at a ${pace} commitment.`,
          milestones: data.roadmap.map((step, idx) => ({
            phase: `Milestone ${idx + 1}: ${step.topic}`,
            subject: interest.replace('-', ' '),
            topics: [step.topic, `Core application: ${step.reason}`],
            suggestedProjects: step.reason
          }))
        });
        setIsGenerated(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('AI roadmap endpoint not available, falling back to local template:', err);
    }

    // Dynamic Fallback Generator tailored to user input
    const baseTemplate = personalizedRoadmaps[interest] || personalizedRoadmaps['data-science'];
    const durationLabel = pace.includes('Casual') ? '12-14 Weeks • 1-2 hrs/week' : pace.includes('Intensive') ? '4-5 Weeks • 10+ hrs/week' : baseTemplate.duration;

    setActiveRoadmap({
      ...baseTemplate,
      track: `${baseTemplate.track} - ${goal}`,
      duration: durationLabel,
      overview: `Tailored curriculum designed for ${level} level learners aiming for "${goal}". Progress at ${pace} pace to master foundational concepts without burnout.`,
    });
    setIsGenerated(true);
    setLoading(false);
  };

  return (
    <div className="page-container" style={{ paddingBottom: '160px' }}>
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

        <button type="submit" className="btn-generate-roadmap" disabled={loading}>
          {loading ? (
            <>
              <Loader size={16} className="animate-spin" />
              <span>Generating Tailored Path...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Personalized Roadmap</span>
            </>
          )}
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
            {activeRoadmap.milestones && activeRoadmap.milestones.map((ms, index) => (
              <div key={index} className="timeline-milestone-card">
                <div className="milestone-badge-box">
                  {index + 1}
                </div>

                <div className="milestone-details" style={{ flex: 1 }}>
                  <h4>{ms.phase}</h4>
                  {ms.subject && <div className="milestone-subject">Domain: {ms.subject}</div>}

                  <div className="milestone-topics-list">
                    {ms.topics && ms.topics.map(t => (
                      <span key={t} className="milestone-topic-chip">
                        <CheckCircle2 size={12} style={{ display: 'inline', marginRight: 4, color: '#10b981' }} />
                        {t}
                      </span>
                    ))}
                  </div>

                  {ms.suggestedProjects && (
                    <div className="milestone-project-note">
                      <strong>Recommended Practical Milestone:</strong> {ms.suggestedProjects}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
