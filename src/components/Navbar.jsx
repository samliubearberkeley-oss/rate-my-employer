import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  return (
    <header className="header sketch">
      <div className="header-content">
        <Link to="/" className="logo sketch">
          Rate My Employer
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}

