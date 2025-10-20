import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Reviews from './pages/Reviews';
import SubmitReview from './pages/SubmitReview';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Reviews />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/submit" element={<SubmitReview />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
