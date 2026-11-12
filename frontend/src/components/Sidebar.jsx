import React from 'react';
import { Check, BookOpen } from 'lucide-react';

export default function Sidebar({ 
  currentSubject, 
  units, 
  activeUnitId, 
  onSelectUnit, 
  onToggleUnitCompletion 
}) {
  const completedCount = units.filter(u => u.completed).length;
  const progressPercent = units.length > 0 
    ? Math.round((completedCount / units.length) * 100) 
    : 0;

  return (
    <aside className="course-outline-sidebar" aria-label="Course Curriculum Units">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-subject-tag">
          {currentSubject?.code || 'MATH-201'} • Curated Track
        </div>
        <div className="sidebar-subject-title">
          <span>{currentSubject ? currentSubject.title.split('&')[0] : 'Linear Algebra'}</span>
          <BookOpen size={16} color="#818cf8" />
        </div>

        {/* Progress Bar */}
        <div className="sidebar-progress-bar-container">
          <div className="sidebar-progress-labels">
            <span>Progress ({completedCount}/{units.length} Units)</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="sidebar-progress-track">
            <div 
              className="sidebar-progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Numbered Learning Units */}
      <div className="sidebar-units-list">
        <div style={{ padding: '6px 12px 2px', fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Learning Units
        </div>

        {units.map((unit) => {
          const isActive = unit.id === activeUnitId;
          const isDone = unit.completed;

          return (
            <div 
              key={unit.id}
              className={`sidebar-unit-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectUnit(unit.id)}
            >
              {/* Unit Number (01, 02, etc.) */}
              <div className="unit-number-badge">
                {unit.unitNumber || (unit.id < 10 ? `0${unit.id}` : unit.id)}
              </div>

              {/* Title and metadata */}
              <div className="unit-info-col">
                <div className="unit-item-title" title={unit.title}>
                  {unit.title}
                </div>
                <div className="unit-item-meta">
                  {unit.topicsCount || unit.topics?.length || 4} topics • {unit.duration || '3.5 hrs'}
                </div>
              </div>

              {/* Completion Indicator Button */}
              <button
                type="button"
                className={`unit-check-indicator ${isDone ? 'checked' : ''}`}
                title={isDone ? "Completed (Click to unmark)" : "Mark as Completed"}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleUnitCompletion(unit.id);
                }}
              >
                {isDone && <Check size={11} strokeWidth={3} />}
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
