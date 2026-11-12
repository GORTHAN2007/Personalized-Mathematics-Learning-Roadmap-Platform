import React, { useState } from 'react';
import { 
  MessageSquare, 
  PlusCircle, 
  Heart, 
  HelpCircle, 
  Share2, 
  Send, 
  CheckCircle,
  FileText,
  User
} from 'lucide-react';

export default function CommunityPage({ 
  resources, 
  problems, 
  onAddResource, 
  onAddProblem, 
  onLikeResource,
  onLikeProblem 
}) {
  const [activeTab, setActiveTab] = useState('resources'); // 'resources' | 'problems' | 'add-resource' | 'add-problem'

  // New Resource Form State
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceSubject, setResourceSubject] = useState('Linear Algebra');
  const [resourceCategory, setResourceCategory] = useState('simulations');
  const [resourceDesc, setResourceDesc] = useState('');
  const [resourceAuthor, setResourceAuthor] = useState('');
  const [resourceTags, setResourceTags] = useState('');
  const [resourceSuccess, setResourceSuccess] = useState(false);

  // New Problem Form State
  const [problemTitle, setProblemTitle] = useState('');
  const [problemSubject, setProblemSubject] = useState('Linear Algebra');
  const [problemDifficulty, setProblemDifficulty] = useState('Intermediate');
  const [problemText, setProblemText] = useState('');
  const [problemHint, setProblemHint] = useState('');
  const [problemAuthor, setProblemAuthor] = useState('');
  const [problemSuccess, setProblemSuccess] = useState(false);

  // Form Submissions (Stored in local state via props)
  const handleSubmitResource = (e) => {
    e.preventDefault();
    if (!resourceTitle.trim() || !resourceDesc.trim()) {
      alert('Please provide a title and description for your resource.');
      return;
    }

    const newRes = {
      id: Date.now(),
      title: resourceTitle,
      subjectName: resourceSubject,
      category: resourceCategory,
      categoryLabel: resourceCategory === 'simulations' ? 'Visual Simulation' : resourceCategory === 'videos' ? 'Video Lecture' : 'Article',
      description: resourceDesc,
      format: 'Community Contribution',
      difficulty: 'All Levels',
      author: resourceAuthor.trim() || 'Anonymous Student',
      likes: 1,
      tags: resourceTags ? resourceTags.split(',').map(t => t.trim()) : ['Community', resourceSubject]
    };

    onAddResource(newRes);
    setResourceSuccess(true);
    setResourceTitle('');
    setResourceDesc('');
    setResourceTags('');
    setTimeout(() => {
      setResourceSuccess(false);
      setActiveTab('resources');
    }, 1200);
  };

  const handleSubmitProblem = (e) => {
    e.preventDefault();
    if (!problemTitle.trim() || !problemText.trim()) {
      alert('Please provide a problem title and statement.');
      return;
    }

    const newProb = {
      id: Date.now(),
      title: problemTitle,
      subject: problemSubject,
      difficulty: problemDifficulty,
      author: problemAuthor.trim() || 'Anonymous Contributor',
      likes: 1,
      problemText: problemText,
      hint: problemHint || 'Think about the standard basis representations.'
    };

    onAddProblem(newProb);
    setProblemSuccess(true);
    setProblemTitle('');
    setProblemText('');
    setProblemHint('');
    setTimeout(() => {
      setProblemSuccess(false);
      setActiveTab('problems');
    }, 1200);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Community Mathematics Exchange</h1>
        <p className="page-subtitle">
          Collaborate with fellow learners. Share visual simulations, curated problem sets, and mathematical insights across all subjects.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="community-tabs-nav">
        <button 
          className={`comm-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Shared Resources ({resources.length})
        </button>

        <button 
          className={`comm-tab-btn ${activeTab === 'problems' ? 'active' : ''}`}
          onClick={() => setActiveTab('problems')}
        >
          Problem Bank ({problems.length})
        </button>

        <button 
          className={`comm-tab-btn ${activeTab === 'add-resource' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-resource')}
        >
          + Share a Resource
        </button>

        <button 
          className={`comm-tab-btn ${activeTab === 'add-problem' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-problem')}
        >
          + Submit a Problem
        </button>
      </div>

      {/* TAB 1: Shared Resources Feed */}
      {activeTab === 'resources' && (
        <div className="resources-grid">
          {resources.map((item) => (
            <div key={item.id} className="resource-item-card">
              <div>
                <div className="resource-meta-line">
                  <span className="resource-tag-pill">{item.subjectName || 'Math'}</span>
                  <span style={{ fontSize: '11px', color: '#71717a' }}>{item.categoryLabel || item.category}</span>
                </div>
                <h3 className="resource-item-title">{item.title}</h3>
                <p className="resource-item-desc">{item.description}</p>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {item.tags?.map(t => (
                    <span 
                      key={t}
                      style={{
                        fontSize: '11px',
                        color: '#a1a1aa',
                        backgroundColor: 'rgba(255,255,255,0.03)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="resource-card-footer">
                  <span>By {item.author}</span>
                  <button 
                    className={`resource-like-btn ${item.userLiked ? 'liked' : ''}`}
                    onClick={() => onLikeResource(item.id)}
                  >
                    <Heart size={13} fill={item.userLiked ? '#f43f5e' : 'none'} />
                    <span>{item.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Problem Bank Feed */}
      {activeTab === 'problems' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {problems.map((prob) => (
            <div 
              key={prob.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '24px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="course-badge highlight">{prob.subject}</span>
                  <span className="course-badge">{prob.difficulty}</span>
                </div>
                <button 
                  className={`resource-like-btn ${prob.userLiked ? 'liked' : ''}`}
                  onClick={() => onLikeProblem(prob.id)}
                >
                  <Heart size={13} fill={prob.userLiked ? '#f43f5e' : 'none'} />
                  <span>{prob.likes}</span>
                </button>
              </div>

              <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#ffffff', marginBottom: '10px' }}>
                {prob.title}
              </h3>

              <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: 1.6, marginBottom: '14px' }}>
                {prob.problemText}
              </p>

              {prob.hint && (
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderLeft: '2px solid #818cf8',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: '#a1a1aa'
                }}>
                  <strong style={{ color: '#818cf8' }}>Hint: </strong> {prob.hint}
                </div>
              )}

              <div style={{ marginTop: '14px', fontSize: '12px', color: '#71717a' }}>
                Contributed by {prob.author}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Share a Resource Form */}
      {activeTab === 'add-resource' && (
        <div className="generator-card" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            Contribute a Learning Resource
          </h2>
          <p style={{ fontSize: '13.5px', color: '#a1a1aa', marginBottom: '24px' }}>
            Share a simulation, video, cheat sheet, or article with the peer community. Submissions appear immediately in local state.
          </p>

          {resourceSuccess && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '8px',
              color: '#86efac',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <CheckCircle size={16} />
              <span>Resource submitted! Adding to community feed...</span>
            </div>
          )}

          <form onSubmit={handleSubmitResource} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-field">
              <label className="form-label">Resource Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 3Blue1Brown Matrix Multiplication Interactive Visualizer" 
                value={resourceTitle}
                onChange={(e) => setResourceTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-field">
                <label className="form-label">Mathematics Subject</label>
                <select 
                  className="form-select"
                  value={resourceSubject}
                  onChange={(e) => setResourceSubject(e.target.value)}
                >
                  <option value="Linear Algebra">Linear Algebra</option>
                  <option value="Calculus">Calculus</option>
                  <option value="Probability">Probability</option>
                  <option value="Statistics">Statistics</option>
                  <option value="Number Theory">Number Theory</option>
                  <option value="Discrete Mathematics">Discrete Mathematics</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Resource Type</label>
                <select 
                  className="form-select"
                  value={resourceCategory}
                  onChange={(e) => setResourceCategory(e.target.value)}
                >
                  <option value="simulations">Visual Simulation</option>
                  <option value="videos">Video Lecture</option>
                  <option value="articles">Article / Notes</option>
                  <option value="games">Interactive Game</option>
                  <option value="applications">Practical Application</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Summary / Description</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="Briefly explain what learners will gain from this resource..." 
                value={resourceDesc}
                onChange={(e) => setResourceDesc(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-field">
                <label className="form-label">Your Name / Handle</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Mohd Kaif" 
                  value={resourceAuthor}
                  onChange={(e) => setResourceAuthor(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. SVD, PCA, Geometry" 
                  value={resourceTags}
                  onChange={(e) => setResourceTags(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-generate-roadmap" style={{ marginTop: '8px' }}>
              <Send size={15} />
              <span>Publish to Community</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: Submit a Problem Form */}
      {activeTab === 'add-problem' && (
        <div className="generator-card" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            Share a Practice Problem
          </h2>
          <p style={{ fontSize: '13.5px', color: '#a1a1aa', marginBottom: '24px' }}>
            Submit an interesting puzzle, exam exercise, or conceptual riddle for other students to solve.
          </p>

          {problemSuccess && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: '8px',
              color: '#86efac',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <CheckCircle size={16} />
              <span>Problem posted to problem bank!</span>
            </div>
          )}

          <form onSubmit={handleSubmitProblem} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-field">
              <label className="form-label">Problem Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Eigenvalues of a Nilpotent Matrix" 
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-field">
                <label className="form-label">Subject</label>
                <select 
                  className="form-select"
                  value={problemSubject}
                  onChange={(e) => setProblemSubject(e.target.value)}
                >
                  <option value="Linear Algebra">Linear Algebra</option>
                  <option value="Calculus">Calculus</option>
                  <option value="Probability">Probability</option>
                  <option value="Statistics">Statistics</option>
                  <option value="Number Theory">Number Theory</option>
                  <option value="Discrete Mathematics">Discrete Mathematics</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Difficulty Level</label>
                <select 
                  className="form-select"
                  value={problemDifficulty}
                  onChange={(e) => setProblemDifficulty(e.target.value)}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Problem Statement</label>
              <textarea 
                className="form-textarea" 
                rows="4"
                placeholder="Write the exact problem question or mathematical challenge..." 
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Solution Hint or Strategy (Optional)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Consider the characteristic polynomial roots..." 
                value={problemHint}
                onChange={(e) => setProblemHint(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-label">Author Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Mohd Kaif" 
                value={problemAuthor}
                onChange={(e) => setProblemAuthor(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-generate-roadmap" style={{ marginTop: '8px' }}>
              <PlusCircle size={15} />
              <span>Post Problem</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
