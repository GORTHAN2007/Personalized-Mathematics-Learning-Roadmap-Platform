import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  Compass, 
  LayoutGrid, 
  TrendingUp, 
  BookOpen, 
  MoreHorizontal, 
  ChevronLeft,
  User
} from 'lucide-react';

export default function VerticalIconBar({ activePage, setActivePage, onOpenContribute, onOpenAuth }) {
  return (
    <aside className="vertical-icon-bar" aria-label="Main Navigation">
      {/* Top action / Back */}
      <div className="icon-bar-top">
        <button 
          className="icon-bar-btn"
          title="Home / Back"
          onClick={() => setActivePage('dashboard')}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Quick Add / Contribute */}
        <button 
          className="icon-bar-btn"
          title="Contribute Resource or Problem"
          onClick={onOpenContribute}
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Primary Page Navigation */}
      <nav className="icon-bar-nav">
        {/* Course / Roadmap Dashboard */}
        <button 
          className={`icon-bar-btn ${activePage === 'dashboard' ? 'active' : ''}`}
          title="Course Dashboard & Roadmap"
          onClick={() => setActivePage('dashboard')}
        >
          <LayoutGrid size={20} />
        </button>

        {/* Subject Discovery */}
        <button 
          className={`icon-bar-btn ${activePage === 'subjects' ? 'active' : ''}`}
          title="Subject Discovery"
          onClick={() => setActivePage('subjects')}
        >
          <Compass size={20} />
        </button>

        {/* Personalized Roadmap Generator */}
        <button 
          className={`icon-bar-btn ${activePage === 'generator' ? 'active' : ''}`}
          title="Personalized Roadmap Generator"
          onClick={() => setActivePage('generator')}
        >
          <TrendingUp size={20} />
        </button>

        {/* Learning Resources Hub */}
        <button 
          className={`icon-bar-btn ${activePage === 'resources' ? 'active' : ''}`}
          title="Learning Resources Hub"
          onClick={() => setActivePage('resources')}
        >
          <BookOpen size={20} />
        </button>

        {/* Community Contributions */}
        <button 
          className={`icon-bar-btn ${activePage === 'community' ? 'active' : ''}`}
          title="Community Discussions & Problems"
          onClick={() => setActivePage('community')}
        >
          <MessageSquare size={20} />
        </button>

        {/* Extra options */}
        <button 
          className="icon-bar-btn"
          title="More Options"
          onClick={() => setActivePage('subjects')}
        >
          <MoreHorizontal size={20} />
        </button>
      </nav>

      {/* Bottom Profile Avatar */}
      <div className="icon-bar-bottom">
        <div 
          className="icon-bar-avatar"
          title="Account / Sign In"
          onClick={onOpenAuth}
        >
          <User size={18} />
        </div>
      </div>
    </aside>
  );
}
