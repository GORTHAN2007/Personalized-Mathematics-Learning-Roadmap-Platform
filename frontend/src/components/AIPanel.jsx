import React, { useState } from 'react';
import { explainTopic, getPracticeQuestions } from '../api/ai';

export default function AIPanel({ topic: initialTopic = 'Linear Algebra' }) {
  // ── shared state ──────────────────────────────────────────────────────────
  const [topic, setTopic] = useState(initialTopic);

  // ── explain state ─────────────────────────────────────────────────────────
  const [question, setQuestion]       = useState('');
  const [explanation, setExplanation] = useState('');
  const [explainLoading, setExplainLoading] = useState(false);
  const [explainError, setExplainError]     = useState('');

  // ── practice state ────────────────────────────────────────────────────────
  const [questions, setQuestions]         = useState([]);
  const [answers, setAnswers]             = useState({});   // { idx: chosenIndex }
  const [practiceLoading, setPracticeLoading] = useState(false);
  const [practiceError, setPracticeError]     = useState('');

  // ── handlers ──────────────────────────────────────────────────────────────
  async function handleExplain() {
    if (!question.trim()) return;
    setExplainLoading(true);
    setExplainError('');
    setExplanation('');
    try {
      const data = await explainTopic(topic, question);
      setExplanation(data.explanation);
    } catch (err) {
      setExplainError(err.message);
    } finally {
      setExplainLoading(false);
    }
  }

  async function handlePractice() {
    setPracticeLoading(true);
    setPracticeError('');
    setQuestions([]);
    setAnswers({});
    try {
      const data = await getPracticeQuestions(topic, 'easy', 5);
      setQuestions(data.questions);
    } catch (err) {
      setPracticeError(err.message);
    } finally {
      setPracticeLoading(false);
    }
  }

  function handleAnswer(qIdx, optIdx) {
    if (answers[qIdx] !== undefined) return; // already answered — locked
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  // ── score ─────────────────────────────────────────────────────────────────
  const answeredCount = Object.keys(answers).length;
  const allAnswered   = questions.length > 0 && answeredCount === questions.length;
  const score         = questions.reduce(
    (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
    0
  );

  // ── styles ────────────────────────────────────────────────────────────────
  const s = {
    panel: {
      background: '#1e1e2e',
      border: '1px solid #3f3f5a',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '32px',
      color: '#e2e8f0',
      fontFamily: 'inherit',
    },
    heading: {
      fontSize: '20px',
      fontWeight: 700,
      marginBottom: '16px',
      color: '#a78bfa',
    },
    label: { fontSize: '13px', color: '#94a3b8', marginBottom: '6px' },
    input: {
      width: '100%',
      padding: '9px 12px',
      borderRadius: '8px',
      border: '1px solid #3f3f5a',
      background: '#12121f',
      color: '#e2e8f0',
      fontSize: '14px',
      boxSizing: 'border-box',
      outline: 'none',
    },
    btn: (disabled) => ({
      padding: '9px 18px',
      borderRadius: '8px',
      border: 'none',
      background: disabled ? '#3f3f5a' : '#7c3aed',
      color: disabled ? '#71717a' : '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: 600,
      marginTop: '10px',
    }),
    error: {
      color: '#f87171',
      fontSize: '13px',
      marginTop: '8px',
    },
    explanationBox: {
      background: '#12121f',
      border: '1px solid #3f3f5a',
      borderRadius: '8px',
      padding: '14px',
      marginTop: '12px',
      fontSize: '14px',
      lineHeight: '1.7',
      whiteSpace: 'pre-wrap',
    },
    divider: {
      border: 'none',
      borderTop: '1px solid #3f3f5a',
      margin: '24px 0',
    },
    qCard: {
      background: '#12121f',
      border: '1px solid #3f3f5a',
      borderRadius: '8px',
      padding: '14px',
      marginBottom: '14px',
    },
    qText: { fontSize: '14px', marginBottom: '10px', lineHeight: '1.5' },
    optBtn: (state) => ({
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '8px 12px',
      marginBottom: '6px',
      borderRadius: '6px',
      border: '1px solid',
      borderColor:
        state === 'correct' ? '#22c55e' :
        state === 'wrong'   ? '#ef4444' :
        '#3f3f5a',
      background:
        state === 'correct' ? '#14532d33' :
        state === 'wrong'   ? '#7f1d1d33' :
        '#1e1e2e',
      color: '#e2e8f0',
      cursor: state === 'unanswered' ? 'pointer' : 'default',
      fontSize: '14px',
    }),
    qExplain: {
      marginTop: '8px',
      fontSize: '13px',
      color: '#94a3b8',
      lineHeight: '1.5',
    },
    scoreBox: {
      marginTop: '16px',
      padding: '12px 16px',
      background: '#1e3a5f',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 700,
      color: '#93c5fd',
    },
    topicRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    },
  };

  // helper: determine option display state
  function optState(qIdx, optIdx) {
    const chosen = answers[qIdx];
    if (chosen === undefined) return 'unanswered';
    const correct = questions[qIdx].correctIndex;
    if (optIdx === correct) return 'correct';
    if (optIdx === chosen)  return 'wrong';
    return 'neutral';
  }

  return (
    <div style={s.panel}>
      <div style={s.heading}>AI Tutor</div>

      {/* Topic input */}
      <div style={s.topicRow}>
        <div style={{ flex: 1 }}>
          <div style={s.label}>Topic</div>
          <input
            style={s.input}
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Linear Algebra"
          />
        </div>
      </div>

      {/* ── Explain section ───────────────────────────────────────────── */}
      <div style={s.label}>Your question</div>
      <input
        style={s.input}
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="e.g. What is a basis?"
        onKeyDown={e => e.key === 'Enter' && !explainLoading && handleExplain()}
      />
      <button
        style={s.btn(explainLoading || !question.trim())}
        onClick={handleExplain}
        disabled={explainLoading || !question.trim()}
      >
        {explainLoading ? 'Explaining…' : 'Explain'}
      </button>
      {explainError && <div style={s.error}>{explainError}</div>}
      {explanation && <div style={s.explanationBox}>{explanation}</div>}

      <hr style={s.divider} />

      {/* ── Practice section ──────────────────────────────────────────── */}
      <button
        style={s.btn(practiceLoading)}
        onClick={handlePractice}
        disabled={practiceLoading}
      >
        {practiceLoading ? 'Loading questions…' : 'Practice questions'}
      </button>
      {practiceError && <div style={s.error}>{practiceError}</div>}

      {questions.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          {questions.map((q, qIdx) => (
            <div key={qIdx} style={s.qCard}>
              <div style={s.qText}><strong>Q{qIdx + 1}.</strong> {q.question}</div>
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  style={s.optBtn(optState(qIdx, optIdx))}
                  onClick={() => handleAnswer(qIdx, optIdx)}
                  disabled={answers[qIdx] !== undefined}
                >
                  {opt}
                </button>
              ))}
              {answers[qIdx] !== undefined && (
                <div style={s.qExplain}>💡 {q.explanation}</div>
              )}
            </div>
          ))}

          {allAnswered && (
            <div style={s.scoreBox}>
              Score: {score} / {questions.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

