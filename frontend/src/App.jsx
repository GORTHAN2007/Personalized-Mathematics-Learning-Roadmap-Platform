import React, { useState } from 'react';
import VerticalIconBar from './components/VerticalIconBar';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import FloatingBanner from './components/FloatingBanner';
import ResourceSection from './components/ResourceSection';
import WorkbookPanel from './components/WorkbookPanel';
import CheatsheetPanel from './components/CheatsheetPanel';
import SimulationsPanel from './components/SimulationsPanel';

// Pages
import Dashboard from './pages/Dashboard';
import SubjectPage from './pages/SubjectPage';
import RoadmapPage from './pages/RoadmapPage';
import CommunityPage from './pages/CommunityPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthPage from './pages/AuthPage';

// Data
import { subjects } from './data/subjects';
import { linearAlgebraRoadmap } from './data/roadmapData';
import { initialResources, initialProblems } from './data/resources';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState('dashboard'); // 'dashboard' | 'subjects' | 'generator' | 'resources' | 'community' | 'login' | 'signup'

  // Subject and Roadmap State
  const [currentSubjectId, setCurrentSubjectId] = useState('linear-algebra');
  const [units, setUnits] = useState(linearAlgebraRoadmap);

  // Resources and Community State
  const [resources, setResources] = useState(initialResources);
  const [problems, setProblems] = useState(initialProblems);

  // Authentication State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup');
  const [userSession, setUserSession] = useState(null);
  const [showAuthLanding, setShowAuthLanding] = useState(true);

  // Resources Hub Filter
  const [resourceFilter, setResourceFilter] = useState('all');

  // Panel State
  const [activePanel, setActivePanel] = useState(null); // 'workbook' | 'cheatsheet' | 'simulations' | null

  // Currently active subject object
  const currentSubject = subjects.find(s => s.id === currentSubjectId) || subjects[0];

  // Subject Selection Handler
  const handleSelectSubject = (subjectId) => {
    setCurrentSubjectId(subjectId);
    const selected = subjects.find(s => s.id === subjectId);

    // If selected subject has units defined, load them into roadmap
    if (selected && selected.id === 'linear-algebra') {
      setUnits(linearAlgebraRoadmap);
    } else if (selected && selected.units) {
      const generatedUnits = selected.units.map((u, idx) => ({
        id: u.id,
        unitNumber: u.id < 10 ? `0${u.id}` : `${u.id}`,
        title: u.title,
        description: `Core concepts and analytical foundations for ${u.title.toLowerCase()}.`,
        topicsCount: u.topicsCount,
        duration: '3.5 hrs',
        completed: u.status === 'completed',
        topics: [
          {
            id: `${u.id}.1`,
            title: `Foundations of ${u.title}`,
            type: 'Interactive Lecture',
            duration: '35 min',
            completed: u.status === 'completed',
            summary: `Introductory concepts and foundational definitions for ${u.title}.`
          },
          {
            id: `${u.id}.2`,
            title: `${u.title} Geometric Simulation`,
            type: 'Visual Simulation',
            duration: '45 min',
            completed: false,
            summary: `Interactive visual demonstrations and step-by-step problem sets.`
          },
          {
            id: `${u.id}.3`,
            title: `Standard Problems & College Exam Review`,
            type: 'Practice Problems',
            duration: '50 min',
            completed: false,
            summary: `Curated practice questions and step-by-step mathematical reasoning.`
          }
        ]
      }));
      setUnits(generatedUnits);
    }
  };

  // Toggle Unit Completion Status
  const handleToggleUnitCompletion = (unitId) => {
    setUnits(prevUnits =>
      prevUnits.map(unit => {
        if (unit.id === unitId) {
          const newStatus = !unit.completed;
          return {
            ...unit,
            completed: newStatus,
            topics: unit.topics.map(t => ({ ...t, completed: newStatus }))
          };
        }
        return unit;
      })
    );
  };

  // Toggle Subtopic Completion Status
  const handleToggleTopicCompletion = (unitId, topicId) => {
    setUnits(prevUnits =>
      prevUnits.map(unit => {
        if (unit.id === unitId) {
          const updatedTopics = unit.topics.map(t =>
            t.id === topicId ? { ...t, completed: !t.completed } : t
          );
          const allDone = updatedTopics.every(t => t.completed);
          return {
            ...unit,
            topics: updatedTopics,
            completed: allDone
          };
        }
        return unit;
      })
    );
  };

  // Add Resource to Community Feed (Temporary React State)
  const handleAddResource = (newRes) => {
    setResources(prev => [newRes, ...prev]);
  };

  // Add Problem to Problem Bank (Temporary React State)
  const handleAddProblem = (newProb) => {
    setProblems(prev => [newProb, ...prev]);
  };

  // Like / Upvote Resource
  const handleLikeResource = (resourceId) => {
    setResources(prev =>
      prev.map(r => {
        if (r.id === resourceId) {
          const isLiked = !r.userLiked;
          return {
            ...r,
            userLiked: isLiked,
            likes: isLiked ? r.likes + 1 : r.likes - 1
          };
        }
        return r;
      })
    );
  };

  // Like / Upvote Problem
  const handleLikeProblem = (problemId) => {
    setProblems(prev =>
      prev.map(p => {
        if (p.id === problemId) {
          const isLiked = !p.userLiked;
          return {
            ...p,
            userLiked: isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  // Quick Action from Course Header
  const handleQuickAction = (action) => {
    if (action === 'workbook') {
      setActivePanel('workbook');
    } else if (action === 'cheatsheet') {
      setActivePanel('cheatsheet');
    } else if (action === 'simulations') {
      setActivePanel('simulations');
    } else if (action === 'community') {
      setActivePage('community');
    }
  };

  // Full-page Auth routes
  if (activePage === 'signup') {
    return (
      <Signup
        onSwitchToLogin={() => setActivePage('login')}
        onReturnToDashboard={() => setActivePage('dashboard')}
        onSuccessAuth={(user) => {
          setUserSession(user);
          setActivePage('dashboard');
        }}
      />
    );
  }

  if (activePage === 'login') {
    return (
      <Login
        onSwitchToSignup={() => setActivePage('signup')}
        onReturnToDashboard={() => setActivePage('dashboard')}
        onSuccessAuth={(user) => {
          setUserSession(user);
          setActivePage('dashboard');
        }}
      />
    );
  }

  // When a new visitor arrives, present the dedicated Auth Landing Page
  if (!userSession && showAuthLanding) {
    return (
      <AuthPage
        onLoginSuccess={(user) => {
          setUserSession(user);
          setShowAuthLanding(false);
          setActivePage("dashboard");
        }}
        onGuestExplore={() => {
          setShowAuthLanding(false);
          setActivePage("dashboard");
        }}
      />
    );
  }

  // Filtered resources for the Resources page
  const filteredResources = resourceFilter === 'all'
    ? resources
    : resources.filter(r => r.category === resourceFilter);

  return (
    <div className="app-container">
      {/* Ambient Top Glow (from Screenshot 2) */}
      <div className="ambient-beam" />

      {/* Left Vertical Icon Bar (Strictly from Screenshot 2) */}
      <VerticalIconBar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenContribute={() => setActivePage('community')}
        onOpenAuth={() => {
          setAuthModalMode('signup');
          setAuthModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Navigation Bar */}
        <Navbar
          currentSubject={currentSubject}
          onSelectSubject={handleSelectSubject}
          subjects={subjects}
          onOpenAuth={() => {
            setAuthModalMode('login');
            setAuthModalOpen(true);
          }}
          userSession={userSession}
          onSignOut={() => setUserSession(null)}
        />

        {/* Page Views */}
        {activePage === 'dashboard' && (
          <Dashboard
            currentSubject={currentSubject}
            units={units}
            onToggleUnitCompletion={handleToggleUnitCompletion}
            onToggleTopicCompletion={handleToggleTopicCompletion}
            onQuickAction={handleQuickAction}
          />
        )}

        {activePage === 'subjects' && (
          <SubjectPage
            subjects={subjects}
            onSelectSubject={handleSelectSubject}
            onGoToDashboard={() => setActivePage('dashboard')}
          />
        )}

        {activePage === 'generator' && (
          <RoadmapPage
            onSelectSubject={handleSelectSubject}
            onGoToDashboard={() => setActivePage('dashboard')}
          />
        )}

        {activePage === 'resources' && (
          <div className="page-container">
            <div className="page-header">
              <h1 className="page-title">Curated Learning Resources</h1>
              <p className="page-subtitle">
                Filter demonstrations across interactive simulations, video lectures, visual games, problem sets, and practical applications.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="resources-filter-tabs">
              {[
                { id: 'all', label: 'All Resources' },
                { id: 'simulations', label: 'Visual Simulations' },
                { id: 'videos', label: 'Video Lectures' },
                { id: 'articles', label: 'Articles & Proofs' },
                { id: 'games', label: 'Interactive Games' },
                { id: 'problems', label: 'Practice Problems' },
                { id: 'applications', label: 'Practical Applications' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`filter-tab-btn ${resourceFilter === tab.id ? 'active' : ''}`}
                  onClick={() => setResourceFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <ResourceSection
              resources={filteredResources}
              onLikeResource={handleLikeResource}
            />
          </div>
        )}

        {activePage === 'community' && (
          <CommunityPage
            resources={resources}
            problems={problems}
            onAddResource={handleAddResource}
            onAddProblem={handleAddProblem}
            onLikeResource={handleLikeResource}
            onLikeProblem={handleLikeProblem}
          />
        )}

        {/* Floating Banner at Bottom (Strictly from Screenshot 2) */}
        {activePage !== 'generator' && (
          <FloatingBanner
            onAction={() => setActivePage('generator')}
          />
        )}
      </div>

      {/* Auth Modal (Strictly from Screenshot 2) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={(user) => {
          setUserSession(user);
          setAuthModalOpen(false);
        }}
      />

      {/* Quick Action Panels */}
      {activePanel === 'workbook' && (
        <WorkbookPanel currentSubject={currentSubject} onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'cheatsheet' && (
        <CheatsheetPanel onClose={() => setActivePanel(null)} />
      )}
      {activePanel === 'simulations' && (
        <SimulationsPanel onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}
