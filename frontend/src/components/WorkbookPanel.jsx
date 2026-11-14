import React, { useState } from 'react';
import { X, BookText, Plus, Trash2, Save, CheckCircle } from 'lucide-react';

const SAMPLE_NOTES = [
  {
    id: 1,
    title: 'Row Reduction Notes',
    content: 'Key insight: A matrix is in RREF when each pivot is 1 and is the only nonzero entry in its column.\n\nSteps:\n1. Identify leftmost nonzero column\n2. Swap rows to put nonzero entry at top\n3. Scale to make pivot = 1\n4. Eliminate all other entries in pivot column',
    tag: 'Linear Algebra',
    createdAt: 'Nov 12',
  },
  {
    id: 2,
    title: 'Eigenvalue Intuition',
    content: 'An eigenvector is a direction that only gets scaled (not rotated) by the transformation A.\n\nAv = λv\n\nTo find: det(A - λI) = 0',
    tag: 'Linear Algebra',
    createdAt: 'Nov 13',
  },
];

export default function WorkbookPanel({ onClose, currentSubject }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);
  const [activeNoteId, setActiveNoteId] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [saved, setSaved] = useState(false);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleUpdateContent = (content) => {
    setNotes(prev => prev.map(n => n.id === activeNoteId ? { ...n, content } : n));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleAddNote = () => {
    if (!newTitle.trim()) return;
    const newNote = {
      id: Date.now(),
      title: newTitle.trim(),
      content: '',
      tag: currentSubject?.title || 'General',
      createdAt: 'Now',
    };
    setNotes(prev => [...prev, newNote]);
    setActiveNoteId(newNote.id);
    setNewTitle('');
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    if (activeNoteId === id && remaining.length > 0) setActiveNoteId(remaining[0].id);
  };

  return (
    <div style={overlayStyle}>
      <div style={panelStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookText size={20} color="#818cf8" />
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', margin: 0 }}>Interactive Workbook</h2>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Guided proofs & personal notes</p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar - note list */}
          <div style={sidebarStyle}>
            <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {isAdding ? (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    autoFocus
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddNote()}
                    placeholder="Note title..."
                    style={addInputStyle}
                  />
                  <button onClick={handleAddNote} style={smallBtnStyle}>✓</button>
                  <button onClick={() => setIsAdding(false)} style={{ ...smallBtnStyle, background: 'rgba(255,255,255,0.05)' }}>✕</button>
                </div>
              ) : (
                <button onClick={() => setIsAdding(true)} style={newNoteBtnStyle}>
                  <Plus size={14} /> New Note
                </button>
              )}
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {notes.map(note => (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  style={{
                    ...noteItemStyle,
                    backgroundColor: activeNoteId === note.id ? 'rgba(129, 140, 248, 0.12)' : 'transparent',
                    borderLeft: activeNoteId === note.id ? '2px solid #818cf8' : '2px solid transparent',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#f4f4f5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{note.title}</div>
                    <div style={{ fontSize: '11px', color: '#71717a', marginTop: '2px' }}>{note.tag} · {note.createdAt}</div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); handleDelete(note.id); }}
                    style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Editor area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeNote ? (
              <>
                <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{activeNote.title}</span>
                  <button onClick={handleSave} style={saveBtnStyle}>
                    {saved ? <><CheckCircle size={14} /> Saved</> : <><Save size={14} /> Save</>}
                  </button>
                </div>
                <textarea
                  value={activeNote.content}
                  onChange={e => handleUpdateContent(e.target.value)}
                  placeholder="Start writing your notes, proofs, or problem solutions..."
                  style={editorStyle}
                />
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '14px' }}>
                Create a note to get started
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', zIndex: 1000, padding: '20px',
};
const panelStyle = {
  width: '100%', maxWidth: '860px', height: '580px',
  backgroundColor: '#0e0e12', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden',
};
const headerStyle = {
  padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  flexShrink: 0,
};
const closeBtnStyle = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#a1a1aa', borderRadius: '8px', width: '32px', height: '32px',
  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
};
const sidebarStyle = {
  width: '220px', borderRight: '1px solid rgba(255,255,255,0.07)',
  display: 'flex', flexDirection: 'column', flexShrink: 0,
};
const noteItemStyle = {
  display: 'flex', alignItems: 'center', gap: '8px',
  padding: '10px 14px', cursor: 'pointer', transition: 'background 0.15s',
};
const newNoteBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '6px', width: '100%',
  background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.2)',
  borderRadius: '7px', color: '#818cf8', fontSize: '12px', fontWeight: 600,
  padding: '7px 10px', cursor: 'pointer',
};
const addInputStyle = {
  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '6px', color: '#fff', fontSize: '12px', padding: '5px 8px', outline: 'none',
};
const smallBtnStyle = {
  background: 'rgba(129,140,248,0.2)', border: 'none', color: '#818cf8',
  borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', fontSize: '12px',
};
const saveBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '5px',
  background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
  color: '#10b981', borderRadius: '7px', fontSize: '12px', fontWeight: 600,
  padding: '6px 12px', cursor: 'pointer',
};
const editorStyle = {
  flex: 1, background: 'transparent', border: 'none', outline: 'none',
  color: '#e4e4e7', fontSize: '14px', lineHeight: 1.7, padding: '20px',
  resize: 'none', fontFamily: 'inherit',
};
