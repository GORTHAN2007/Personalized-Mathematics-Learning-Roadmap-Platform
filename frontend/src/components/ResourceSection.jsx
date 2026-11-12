import React from 'react';
import { Heart, ExternalLink, Play, BookOpen, Sparkles, HelpCircle } from 'lucide-react';

export default function ResourceSection({ 
  resources, 
  onLikeResource, 
  onSelectResource 
}) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'videos': return <Play size={14} />;
      case 'simulations': return <Sparkles size={14} />;
      case 'games': return <Play size={14} />;
      case 'problems': return <HelpCircle size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  return (
    <div className="resources-grid">
      {resources.map((item) => (
        <div key={item.id} className="resource-item-card">
          <div>
            <div className="resource-meta-line">
              <span className="resource-tag-pill">
                {item.categoryLabel || item.category}
              </span>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                {item.difficulty}
              </span>
            </div>

            <h3 className="resource-item-title">{item.title}</h3>
            <p className="resource-item-desc">{item.description}</p>
          </div>

          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {item.tags && item.tags.map(tag => (
                <span 
                  key={tag}
                  style={{
                    fontSize: '11px',
                    color: '#a1a1aa',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="resource-card-footer">
              <span>By {item.author}</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  className={`resource-like-btn ${item.userLiked ? 'liked' : ''}`}
                  onClick={() => onLikeResource(item.id)}
                  title="Upvote / Like this resource"
                >
                  <Heart size={13} fill={item.userLiked ? '#f43f5e' : 'none'} />
                  <span>{item.likes}</span>
                </button>

                <button 
                  className="nav-pill-btn"
                  style={{ padding: '4px 8px', fontSize: '11.5px' }}
                  onClick={() => {
                    if (onSelectResource) onSelectResource(item);
                    else alert(`Opening sample demonstration resource: "${item.title}"`);
                  }}
                  title="Open demonstration resource"
                >
                  <ExternalLink size={12} />
                  <span>View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
