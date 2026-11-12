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
      {/* Brand & Subject Selector */}
      <div className="nav-brand-group">
        <div className="nav-brand-logo" style={{ cursor: 'pointer' }}>
          <div className="nav-brand-icon">
            <Sparkles size={16} />
          </div>
          <span>MathPath</span>
        </div>

        {/* Current Subject Dropdown */}
        <div style={{ position: 'relative' }}>
          <button 
            className="nav-pill-btn"
            onClick={() => setSubjectDropdownOpen(!subjectDropdownOpen)}
          >
            <Layers size={14} />
            <span>{currentSubject ? currentSubject.title.split('&')[0] : 'Linear Algebra'}</span>
            <ChevronDown size={12} />
          </button>

          {subjectDropdownOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '8px',
                width: '260px',
                backgroundColor: '#141419',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '6px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                zIndex: 60
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Select Subject
              </div>
              {subjects.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    onSelectSubject(s.id);
                    setSubjectDropdownOpen(false);
                  }}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: currentSubject?.id === s.id ? '#818cf8' : '#e4e4e7',
                    backgroundColor: currentSubject?.id === s.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{s.title.split('&')[0]}</span>
                  <span style={{ fontSize: '11px', color: '#71717a' }}>{s.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <span className="nav-badge">Roadmap Hub</span>
      </div>

      {/* Right Controls: Language, Theme, User Auth */}
      <div className="nav-actions-group">
        {/* Language Selection */}
        <div style={{ position: 'relative' }}>
          <button 
            className="nav-pill-btn" 
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            title="Language Selection"
          >
            <Globe size={14} />
            <span>{selectedLang.split(' ')[0]}</span>
            <ChevronDown size={12} />
          </button>

          {langMenuOpen && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '140px',
                backgroundColor: '#141419',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px',
                padding: '6px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                zIndex: 60
              }}
            >
              {['English (US)', 'Spanish (ES)', 'French (FR)', 'German (DE)'].map(lang => (
                <div
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setLangMenuOpen(false);
                  }}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    color: selectedLang === lang ? '#818cf8' : '#e4e4e7',
                    backgroundColor: selectedLang === lang ? 'rgba(99,102,241,0.12)' : 'transparent'
                  }}
                >
                  {lang}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Control */}
        <button 
          className="nav-pill-btn" 
          onClick={toggleTheme}
          title={`Switch Theme (Current: ${themeMode})`}
        >
          {themeMode === 'Dark' ? <Moon size={14} /> : <Sun size={14} />}
          <span>{themeMode}</span>
        </button>

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
