import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="header sketch">
      <div className="header-content">
        <Link to="/" className="logo sketch">
          Rate My Employer
        </Link>
      </div>
    </header>
  );
}

