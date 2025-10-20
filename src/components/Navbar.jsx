import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ⭐ Rate My Employer
        </Link>
        
        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">Reviews</Link>
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              <Link to="/submit" className="nav-link">Submit Review</Link>
              <button onClick={signOut} className="btn btn-secondary">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Reviews</Link>
              <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

