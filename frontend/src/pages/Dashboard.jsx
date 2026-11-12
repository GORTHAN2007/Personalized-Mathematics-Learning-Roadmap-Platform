import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CourseHeader from '../components/CourseHeader';
import RoadmapSection from '../components/RoadmapSection';

export default function Dashboard({ 
  currentSubject, 
  units, 
  onToggleUnitCompletion, 
  onToggleTopicCompletion, 
  onQuickAction 
}) {
  const [activeUnitId, setActiveUnitId] = useState(1);
  // Default to expanding the first unit
  const [expandedUnitIds, setExpandedUnitIds] = useState([1]);

  const handleToggleExpand = (unitId) => {
    setExpandedUnitIds(prev => 
      prev.includes(unitId) 
        ? prev.filter(id => id !== unitId) 
        : [...prev, unitId]
    );
    setActiveUnitId(unitId);
  };

  const handleExpandAll = () => {
    setExpandedUnitIds(units.map(u => u.id));
  };

  const handleCollapseAll = () => {
    setExpandedUnitIds([]);
  };

  const handleSelectUnitFromSidebar = (unitId) => {
    setActiveUnitId(unitId);
    if (!expandedUnitIds.includes(unitId)) {
      setExpandedUnitIds(prev => [...prev, unitId]);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Left Course Units Outline Sidebar (Strict Screenshot 1 Reference) */}
      <Sidebar 
        currentSubject={currentSubject}
        units={units}
        activeUnitId={activeUnitId}
        onSelectUnit={handleSelectUnitFromSidebar}
        onToggleUnitCompletion={onToggleUnitCompletion}
      />

      {/* Main Content Area (Strict Screenshot 1 Reference) */}
      <main className="dashboard-content">
        <CourseHeader 
          currentSubject={currentSubject}
          onQuickAction={onQuickAction}
        />

        <RoadmapSection 
          units={units}
          expandedUnitIds={expandedUnitIds}
          onToggleExpand={handleToggleExpand}
          onToggleTopicCompletion={onToggleTopicCompletion}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />
      </main>
    </div>
  );
}
