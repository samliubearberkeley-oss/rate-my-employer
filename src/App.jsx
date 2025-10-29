import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Reviews from './pages/Reviews';
import SubmitReview from './pages/SubmitReview';
import Leaderboard from './pages/Leaderboard';
import Forum from './pages/Forum';
import SubmitIdea from './pages/SubmitIdea';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main style={{ paddingBottom: '80px' }}>
          <Routes>
            <Route path="/" element={<Reviews />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/submit-idea" element={<SubmitIdea />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/submit" element={<SubmitReview />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
