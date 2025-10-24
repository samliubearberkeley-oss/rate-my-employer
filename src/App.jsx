import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Reviews from './pages/Reviews';
import SubmitReview from './pages/SubmitReview';
import Leaderboard from './pages/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Reviews />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/submit" element={<SubmitReview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
