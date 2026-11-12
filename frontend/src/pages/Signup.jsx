import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function Signup({ onSwitchToLogin, onReturnToDashboard, onSuccessAuth }) {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setFeedback({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFeedback({ type: 'success', message: 'Account registered! Redirecting to dashboard...' });
      setTimeout(() => {
        onSuccessAuth({ email, name: email.split('@')[0] });
        onReturnToDashboard();
      }, 1000);
    }, 500);
  };

  const handleThirdParty = (provider) => {
    onSuccessAuth({ email: `${provider.toLowerCase()}@example.com`, name: `${provider} User` });
    onReturnToDashboard();
  };

  return (
    <div className="auth-page-container">
      {/* Top subtle glow */}
      <div className="ambient-beam" />

      {/* Return button */}
      <button 
        onClick={onReturnToDashboard}
        style={{
          position: 'absolute',
          top: '28px',
          left: '28px',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#a1a1aa',
          padding: '8px 14px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          zIndex: 40
        }}
      >
        <ArrowLeft size={16} />
        <span>Back to Platform</span>
      </button>

      <div className="auth-card">
        {/* Centered Heading strictly matching Screenshot 2 */}
        <h1 className="auth-heading">
          Sign up below to unlock the full potential of MathPath.
        </h1>

        <p className="auth-subtext">
          By continuing, you agree to our{' '}
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy policy: Client-side demonstration only.'); }}>
            privacy policy
          </a>.
        </p>

        {feedback && (
          <div style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: feedback.type === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
            border: `1px solid ${feedback.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            color: feedback.type === 'error' ? '#fca5a5' : '#86efac'
          }}>
            {feedback.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Third-party buttons */}
        <div className="auth-buttons-stack">
          <button 
            type="button" 
            className="btn-white-auth"
            onClick={() => handleThirdParty('Apple')}
          >
            <svg width="18" height="18" viewBox="0 0 170 170" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.66-7.89-11.91-14.54-6.3-9.88-11.16-20.78-14.59-32.69-3.43-11.91-5.14-23.01-5.14-33.28 0-14.58 3.79-26.68 11.38-36.31 7.59-9.63 17.2-14.57 28.84-14.82 4.9 0 10.42 1.34 16.58 4.02 6.15 2.68 10.15 4.09 11.99 4.23 2.11-.27 6.22-1.74 12.33-4.42 6.12-2.68 11.52-3.9 16.21-3.67 11.59.7 20.84 4.88 27.76 12.56-10.42 6.31-15.54 15.02-15.35 26.13.2 8.7 3.51 16.03 9.94 22 6.42 5.96 14.15 9.38 23.18 10.26-2.11 6.53-4.63 13.41-7.56 20.64zM119.22 33.64c0-7.39 2.66-14.19 7.97-20.39 5.31-6.2 11.75-10.38 19.34-12.53.82 3.69.95 7.08.38 10.16-.76 4.35-2.73 8.77-5.91 13.27-3.18 4.5-7.07 7.7-11.66 9.61-3.69 1.54-7.06 2.37-10.12 2.49z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>

          <button 
            type="button" 
            className="btn-white-auth"
            onClick={() => handleThirdParty('Google')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div className="auth-input-wrapper">
            <Mail size={16} className="auth-input-icon" />
            <input 
              type="email"
              className="auth-input-field"
              placeholder="enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-dark-email"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Continue with email'}
          </button>
        </form>

        <div className="auth-footer-links">
          <button 
            type="button" 
            className="auth-toggle-btn"
            onClick={onSwitchToLogin}
          >
            Already have an account? Log in
          </button>

          <button 
            type="button" 
            className="auth-close-btn"
            onClick={onReturnToDashboard}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
