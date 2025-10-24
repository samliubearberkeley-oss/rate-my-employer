import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎮 RATE MY EMPLOYER
        </Link>
        
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">REVIEWS</Link>
              <Link to="/leaderboard" className="nav-link">LEADERBOARD</Link>
              <Link to="/submit" className="nav-link">SUBMIT</Link>
              <button onClick={signOut} className="btn btn-secondary">
                SIGN OUT
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">REVIEWS</Link>
              <Link to="/leaderboard" className="nav-link">LEADERBOARD</Link>
              <Link to="/login" className="nav-link">LOGIN</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

