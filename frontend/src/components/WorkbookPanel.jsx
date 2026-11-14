import React, { useState, useEffect } from 'react';
import { X, BookText, Plus, Trash2, Save, CheckCircle, Loader } from 'lucide-react';

const API_BASE = 'http://localhost:5001/api/v1/notes';

const DEFAULT_NOTES = [
  {
    id: 'welcome-note',
    title: 'My Math Notes',
    content: 'Welcome to your Interactive Workbook! Write proofs, theorems, or question solutions here. Changes are saved automatically.',
    tag: 'Linear Algebra'
  }
];

export default function WorkbookPanel({ onClose, currentSubject, userSession }) {
  const [notes, setNotes] = useState(() => {
    try {
      const cached = localStorage.getItem('mathpath_notes');
      return cached ? JSON.parse(cached) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });
  const [activeNoteId, setActiveNoteId] = useState(() => {
    try {
      const cached = localStorage.getItem('mathpath_notes');
      const parsed = cached ? JSON.parse(cached) : DEFAULT_NOTES;
      return parsed.length > 0 ? parsed[0].id : null;
    } catch {
      return 'welcome-note';
    }
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  // Fetch user notes from backend if authenticated
  useEffect(() => {
    if (!token) return;

    let mounted = true;
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (mounted && res.ok && data.data && data.data.length > 0) {
          setNotes(data.data);
          setActiveNoteId(data.data[0].id);
        }
      } catch (err) {
        console.warn('Backend note sync offline, using local copy:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchNotes();

    return () => { mounted = false; };
  }, [token]);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const handleUpdateContent = (content) => {
    setNotes(prev => {
      const updated = prev.map(n => n.id === activeNoteId ? { ...n, content } : n);
      localStorage.setItem('mathpath_notes', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSave = async () => {
    if (!activeNote) return;
    setSaved(true);

    localStorage.setItem('mathpath_notes', JSON.stringify(notes));

    if (token) {
      try {
        await fetch(`${API_BASE}/${activeNote.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title: activeNote.title,
            content: activeNote.content,
            tag: activeNote.tag
          })
        });
      } catch (err) {
        console.warn('Could not sync note update to DB:', err);
      }
    }

    setTimeout(() => setSaved(false), 1200);
  };

  const handleAddNote = async (titleToUse) => {
    const title = (typeof titleToUse === 'string' ? titleToUse : newTitle).trim() || 'Untitled Note';
    const tag = currentSubject?.title || 'General';

    // Optimistically create new note in local state right away so it shows instantly
    const tempId = `note-${Date.now()}`;
    const newNote = {
      id: tempId,
      title,
      content: '',
      tag,
      createdAt: new Date().toISOString()
    };

    setNotes(prev => {
      const updated = [newNote, ...prev];
      localStorage.setItem('mathpath_notes', JSON.stringify(updated));
      return updated;
    });
    setActiveNoteId(tempId);
    setNewTitle('');
    setIsAdding(false);

    // Sync to backend if authenticated
    if (token) {
      try {
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            content: '',
            tag
          })
        });
        const data = await res.json();
        if (res.ok && data.data) {
          // Replace temporary id with real database id
          setNotes(prev => {
            const synced = prev.map(n => n.id === tempId ? data.data : n);
            localStorage.setItem('mathpath_notes', JSON.stringify(synced));
            return synced;
          });
          setActiveNoteId(data.data.id);
        }
      } catch (err) {
        console.warn('Failed to sync new note to DB, preserved locally:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (token) {
      try {
        await fetch(`${API_BASE}/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Failed to delete note:', err);
      }
    }

    const remaining = notes.filter(n => n.id !== id);
    setNotes(remaining);
    if (!token) {
      localStorage.setItem('mathpath_notes', JSON.stringify(remaining));
    }
    if (activeNoteId === id && remaining.length > 0) setActiveNoteId(remaining[0].id);
    else if (remaining.length === 0) setActiveNoteId(null);
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
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
                {token ? `Saved to database (${userSession?.email || 'User'})` : 'Local mode (Sign in to sync to database)'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Sidebar */}
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
                  <button onClick={() => handleAddNote()} style={smallBtnStyle}>✓</button>
                  <button onClick={() => setIsAdding(false)} style={{ ...smallBtnStyle, background: 'rgba(255,255,255,0.05)' }}>✕</button>
                </div>
              ) : (
                <button onClick={() => handleAddNote('New Note')} style={newNoteBtnStyle}>
                  <Plus size={14} /> New Note
                </button>
              )}
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', color: '#71717a' }}>
                  <Loader size={16} className="animate-spin" />
                </div>
              ) : notes.length === 0 ? (
                <div style={{ padding: '16px', fontSize: '12px', color: '#71717a', textAlign: 'center' }}>
                  No notes yet. Create one!
                </div>
              ) : (
                notes.map(note => (
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
                      <div style={{ fontSize: '11px', color: '#71717a', marginTop: '2px' }}>{note.tag || 'General'}</div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(note.id); }}
                      style={{ background: 'none', border: 'none', color: '#52525b', cursor: 'pointer', padding: '2px', flexShrink: 0 }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
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
                  value={activeNote.content || ''}
                  onChange={e => handleUpdateContent(e.target.value)}
                  placeholder="Start writing your notes, proofs, or problem solutions..."
                  style={editorStyle}
                />
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '14px' }}>
                Create or select a note to start writing
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
