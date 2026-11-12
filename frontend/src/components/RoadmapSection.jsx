import React from 'react';
import { 
  ChevronDown, 
  Check, 
  Clock, 
  Play, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

export default function RoadmapSection({ 
  units, 
  expandedUnitIds, 
  onToggleExpand, 
  onToggleTopicCompletion, 
  onExpandAll, 
  onCollapseAll 
}) {
  const allExpanded = units.length > 0 && expandedUnitIds.length === units.length;

  return (
    <section className="roadmap-sections-wrapper" aria-label="Curated Learning Units">
      {/* Section Headline */}
      <div className="section-headline-group">
        <h2 className="section-title">
          <Sparkles size={18} color="#818cf8" />
          <span>Structured Roadmap Units</span>
        </h2>

        <button 
          className="section-collapse-all-btn"
          onClick={allExpanded ? onCollapseAll : onExpandAll}
        >
          {allExpanded ? 'Collapse All Sections' : 'Expand All Sections'}
        </button>
      </div>

      {/* Accordion Units List */}
      <div className="roadmap-units-container">
        {units.map((unit) => {
          const isExpanded = expandedUnitIds.includes(unit.id);
          const isUnitCompleted = unit.completed;

          return (
            <div 
              key={unit.id}
              className={`roadmap-accordion-card ${isExpanded ? 'expanded' : ''}`}
            >
              {/* Accordion Header */}
              <div 
                className="accordion-header"
                onClick={() => onToggleExpand(unit.id)}
              >
                <div className="accordion-header-left">
                  <div className="unit-badge-large">
                    {unit.unitNumber || (unit.id < 10 ? `0${unit.id}` : unit.id)}
                  </div>

                  <div className="accordion-title-col">
                    <h3>{unit.title}</h3>
                    <p>{unit.description}</p>
                  </div>
                </div>

                <div className="accordion-header-right">
                  <span className="unit-duration-pill">
                    <Clock size={11} style={{ display: 'inline', marginRight: 4 }} />
                    {unit.duration || '3.5 hrs'}
                  </span>

                  <ChevronDown 
                    size={18} 
                    className={`accordion-toggle-arrow ${isExpanded ? 'rotated' : ''}`}
                  />
                </div>
              </div>

              {/* Accordion Body: Subtopics list */}
              {isExpanded && (
                <div className="accordion-body">
                  {unit.topics && unit.topics.length > 0 ? (
                    unit.topics.map((topic) => {
                      const isTopicDone = !!topic.completed;

                      return (
                        <div key={topic.id} className="topic-row">
                          <div className="topic-left">
                            {/* Checkbox */}
                            <button
                              type="button"
                              className={`topic-checkbox ${isTopicDone ? 'checked' : ''}`}
                              title={isTopicDone ? "Mark incomplete" : "Mark as completed"}
                              onClick={() => onToggleTopicCompletion(unit.id, topic.id)}
                            >
                              {isTopicDone && <Check size={11} strokeWidth={3} />}
                            </button>

                            <div className="topic-content">
                              <h4>
                                <span>{topic.id} {topic.title}</span>
                                <span className="topic-type-tag">{topic.type}</span>
                              </h4>
                              <p className="topic-summary">{topic.summary}</p>
                            </div>
                          </div>

                          <div className="topic-right">
                            <span className="topic-time">{topic.duration}</span>
                            <button 
                              className="topic-action-btn"
                              title="Start Learning Topic"
                              onClick={() => alert(`Starting demonstration module: ${topic.title}`)}
                            >
                              <Play size={11} style={{ display: 'inline', marginRight: 4 }} />
                              Study
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ padding: '16px', color: '#71717a', fontSize: '13px' }}>
                      Additional lecture notes and problems are being compiled for this unit.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
