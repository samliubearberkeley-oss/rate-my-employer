import { useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

// Function to capitalize first letter of each word
const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
    
    // Refresh leaderboard every 10 seconds for real-time updates
    const interval = setInterval(fetchLeaderboard, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      // Fetch all reviews
      const { data, error } = await insforge.database
        .from('reviews')
        .select('company_name, rating');

      if (error) throw error;

      // Calculate average rating per company
      const companyStats = {};
      
      data.forEach(review => {
        const company = review.company_name;
        if (!companyStats[company]) {
          companyStats[company] = {
            name: company,
            totalRating: 0,
            count: 0,
            ratings: []
          };
        }
        companyStats[company].totalRating += review.rating;
        companyStats[company].count += 1;
        companyStats[company].ratings.push(review.rating);
      });

      // Calculate averages and sort
      const leaderboardData = Object.values(companyStats)
        .map(company => ({
          name: company.name,
          avgRating: company.totalRating / company.count,
          reviewCount: company.count,
          ratings: company.ratings
        }))
        .sort((a, b) => b.avgRating - a.avgRating);

      setLeaderboard(leaderboardData);
    } catch (err) {
      setError(err.message || 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={star <= fullStars ? 'star filled' : (star === fullStars + 1 && hasHalfStar ? 'star half' : 'star empty')}
          >
            {star <= fullStars ? '⭐' : (star === fullStars + 1 && hasHalfStar ? '⭐' : '☆')}
          </span>
        ))}
      </div>
    );
  };

  const getMedalEmoji = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'rating-excellent';
    if (rating >= 4.0) return 'rating-great';
    if (rating >= 3.5) return 'rating-good';
    if (rating >= 3.0) return 'rating-average';
    return 'rating-poor';
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title sketch">Company Leaderboard</h1>
        <p className="hero-subtitle">
          Top rated companies based on employee reviews
        </p>
      </div>

      <div className="container">

        {leaderboard.length === 0 ? (
          <div className="empty-state">
            <h3>No companies ranked yet</h3>
            <p>Submit the first review to get started!</p>
            <a href="/submit" className="sketch-btn primary">
              Submit Review
            </a>
          </div>
        ) : (
          <div className="list-container sketch">
            <div className="list-header">
              <h2 className="list-title">Top Companies</h2>
              <p className="list-subtitle">Ranked by average employee rating</p>
            </div>
            
            {leaderboard.map((company, index) => (
              <div key={company.name} className="list-item sketch">
                <div className="list-thumbnail sketch">
                  <span className="rank-number">{getMedalEmoji(index + 1)}</span>
                </div>
                <div className="list-content">
                  <div className="list-item-title">
                    {capitalizeWords(company.name)}
                  </div>
                  <div className="list-item-meta">
                    {renderStars(company.avgRating)} • {company.avgRating.toFixed(2)}/5 • {company.reviewCount} {company.reviewCount === 1 ? 'review' : 'reviews'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

