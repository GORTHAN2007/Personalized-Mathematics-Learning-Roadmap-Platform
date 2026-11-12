import React from 'react';
import { 
  BookText, 
  FileCode, 
  PlayCircle, 
  MessageSquareShare, 
  Clock, 
  Layers, 
  Award 
} from 'lucide-react';

export default function CourseHeader({ 
  currentSubject, 
  onQuickAction 
}) {
  return (
    <div className="course-header-container">
      {/* Subject Badges & Metadata */}
      <div className="course-meta-tags">
        <span className="course-badge highlight">
          {currentSubject?.code || 'MATH-201'}
        </span>
        <span className="course-badge">
          {currentSubject?.category || 'Foundational Mathematics'}
        </span>
        <span className="course-badge">
          <Layers size={12} style={{ display: 'inline', marginRight: 4 }} />
          {currentSubject?.totalUnits || 7} Learning Units
        </span>
        <span className="course-badge">
          <Clock size={12} style={{ display: 'inline', marginRight: 4 }} />
          ~{currentSubject?.estimatedHours || 28} Hours
        </span>
        <span className="course-badge">
          <Award size={12} style={{ display: 'inline', marginRight: 4 }} />
          {currentSubject?.difficulty || 'Intermediate'}
        </span>
      </div>

      {/* Large Course Title */}
      <h1 className="course-title">
        {currentSubject?.title || 'Linear Algebra & Matrix Methods'}
      </h1>

      {/* Short Description */}
      <p className="course-description">
        {currentSubject?.description || 
          'Master vector spaces, matrix factorizations, eigenvalues, and linear transformations that power modern 3D graphics, data science, and machine learning.'}
      </p>

      {/* Workbook / Resource Quick Cards */}
      <div className="workbook-actions-grid">
        <div 
          className="workbook-card" 
          onClick={() => onQuickAction('workbook')}
          title="Open interactive scratchpad & notes"
        >
          <div className="workbook-card-icon">
            <BookText size={18} />
          </div>
          <div>
            <div className="workbook-card-title">Interactive Workbook</div>
            <div className="workbook-card-sub">Guided proofs & notes</div>
          </div>
        </div>

        <div 
          className="workbook-card" 
          onClick={() => onQuickAction('cheatsheet')}
          title="View formulas and matrix identities"
        >
          <div className="workbook-card-icon">
            <FileCode size={18} />
          </div>
          <div>
            <div className="workbook-card-title">Formula Cheatsheet</div>
            <div className="workbook-card-sub">Essential theorems & rules</div>
          </div>
        </div>

        <div 
          className="workbook-card" 
          onClick={() => onQuickAction('simulations')}
          title="Explore 2D and 3D geometric simulators"
        >
          <div className="workbook-card-icon">
            <PlayCircle size={18} />
          </div>
          <div>
            <div className="workbook-card-title">Visual Simulations</div>
            <div className="workbook-card-sub">Interactive transformation tools</div>
          </div>
        </div>

        <div 
          className="workbook-card" 
          onClick={() => onQuickAction('community')}
          title="Ask questions & discuss problems"
        >
          <div className="workbook-card-icon">
            <MessageSquareShare size={18} />
          </div>
          <div>
            <div className="workbook-card-title">Discussion & Problems</div>
            <div className="workbook-card-sub">Community contributions</div>
          </div>
        </div>
      </div>
    </div>
  );
}
