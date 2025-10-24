import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🎮 RATE MY EMPLOYER
        </Link>
        
        <div className="navbar-links">
          <Link to="/" className="nav-link">REVIEWS</Link>
          <Link to="/leaderboard" className="nav-link">LEADERBOARD</Link>
        </div>
      </div>
    </nav>
  );
}

