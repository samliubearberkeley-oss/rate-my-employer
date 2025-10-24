import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message || 'Google sign-in failed');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>🎮 {isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}</h1>
        <p className="subtitle">JOIN THE GAME AND RATE YOUR EMPLOYER</p>
        <div className="pixel-dots">
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">📧 Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">🔐 Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              required
              minLength={6}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'LOADING...' : (isSignUp ? 'SIGN UP' : 'SIGN IN')}
          </button>
        </form>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <button 
          onClick={handleGoogleSignIn} 
          className="btn btn-secondary"
          disabled={loading}
        >
          🚀 SIGN IN WITH GOOGLE
        </button>
        
        <p className="auth-toggle">
          {isSignUp ? 'ALREADY HAVE AN ACCOUNT?' : "DON'T HAVE AN ACCOUNT?"}
          {' '}
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)}
            className="link-button"
          >
            {isSignUp ? 'SIGN IN' : 'SIGN UP'}
          </button>
        </p>
      </div>
    </div>
  );
}

