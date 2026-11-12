import React, { useState } from 'react';
import { Compass, X } from 'lucide-react';

export default function FloatingBanner({ onAction }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <aside className="floating-bottom-banner" aria-label="Quick Action Notice">
      <div className="floating-banner-left">
        <div className="floating-banner-icon">
          <Compass size={20} />
        </div>
        <div className="floating-banner-text">
          <strong>Start a Personalized Roadmap</strong> — Tell us your mathematical goals and build a tailored study path.
        </div>
      </div>

      <div className="floating-banner-right">
        <button 
          className="floating-banner-action-btn"
          onClick={onAction}
        >
          Get Started
        </button>

        <button 
          className="floating-banner-dismiss"
          onClick={() => setVisible(false)}
          title="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
