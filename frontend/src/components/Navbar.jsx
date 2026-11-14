import React, { useState } from 'react';
import { Globe, Moon, Sun, Sparkles, ChevronDown, User, Layers } from 'lucide-react';

export default function Navbar({ 
  currentSubject, 
  onSelectSubject, 
  subjects, 
  onOpenAuth, 
  userSession, 
  onSignOut 
}) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');
  const [themeMode, setThemeMode] = useState('Dark');
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'Dark' ? 'Light' : 'Dark');
  };

  return (
    <header className="top-navbar">
      {/* Brand & Roadmap Hub */}
      <div className="nav-brand-group">
        <div className="nav-brand-logo" style={{ cursor: 'pointer' }}>
          <div className="nav-brand-icon">
            <Sparkles size={16} />
          </div>
          <span>MathPath</span>
        </div>

        <span className="nav-badge">Roadmap Hub</span>
      </div>

      {/* Right Controls: User Auth */}
      <div className="nav-actions-group">
        {/* User Authentication Status */}
        {userSession ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="nav-pill-btn"
              onClick={onOpenAuth}
              style={{ borderColor: 'rgba(99, 102, 241, 0.4)', color: '#ffffff' }}
            >
              <User size={14} />
              <span>{userSession.email.split('@')[0]}</span>
            </button>
            <button 
              onClick={onSignOut}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#71717a',
                fontSize: '12px',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button 
            className="nav-auth-btn" 
            onClick={onOpenAuth}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
