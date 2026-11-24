import React, { useState } from 'react';
import { X, Glasses, Layers, Sparkles } from 'lucide-react';
import VRVectorSpaceLab from './VRVectorSpaceLab';
import ARSurfaceExplorer from './ARSurfaceExplorer';
import '../isd.css';

export default function ARVRModal({ isOpen, onClose, initialTab = 'vr-vector' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="isd-modal-backdrop" onClick={onClose}>
      <div 
        className="isd-modal-container"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <header className="isd-header">
          <div className="isd-header-left">
            <span className="isd-badge-nptel">
              NPTEL / SWAYAM • Mobile VR & AI
            </span>
            <h2 className="isd-title">
              <Sparkles size={18} color="#c084fc" />
              ISD AR/VR Mathematics Laboratory
            </h2>
          </div>

          {/* Tab Navigation */}
          <div className="isd-nav-tabs">
            <button
              className={`isd-tab-btn ${activeTab === 'vr-vector' ? 'active' : ''}`}
              onClick={() => setActiveTab('vr-vector')}
            >
              <Glasses size={15} />
              <span>VR Vector Space & Transformations</span>
            </button>
            <button
              className={`isd-tab-btn ${activeTab === 'ar-surface' ? 'active' : ''}`}
              onClick={() => setActiveTab('ar-surface')}
            >
              <Layers size={15} />
              <span>AR 3D Surface & Gradient Explorer</span>
            </button>
          </div>

          {/* Close Action */}
          <button 
            className="isd-close-btn" 
            onClick={onClose}
            aria-label="Close ISD AR/VR Lab"
            title="Close Lab"
          >
            <X size={20} />
          </button>
        </header>

        {/* Active Laboratory View */}
        {activeTab === 'vr-vector' && <VRVectorSpaceLab />}
        {activeTab === 'ar-surface' && <ARSurfaceExplorer />}
      </div>
    </div>
  );
}
