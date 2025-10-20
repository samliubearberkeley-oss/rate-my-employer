import { useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';

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
    <div className="container">
      <div className="leaderboard-header">
        <h1>🏆 Company Leaderboard</h1>
        <p className="subtitle">
          Top rated companies based on employee reviews • Updated in real-time
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <p>No companies ranked yet. Submit the first review!</p>
        </div>
      ) : (
        <div className="leaderboard-container">
          <div className="leaderboard-table">
            {leaderboard.map((company, index) => (
              <div key={company.name} className={`leaderboard-row ${index < 3 ? 'top-three' : ''}`}>
                <div className="rank">
                  <span className="rank-number">{getMedalEmoji(index + 1)}</span>
                </div>
                
                <div className="company-info">
                  <h3 className="company-name">{company.name}</h3>
                  <div className="rating-info">
                    {renderStars(company.avgRating)}
                    <span className={`rating-score ${getRatingColor(company.avgRating)}`}>
                      {company.avgRating.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="review-count">
                  <span className="count-number">{company.reviewCount}</span>
                  <span className="count-label">{company.reviewCount === 1 ? 'review' : 'reviews'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="leaderboard-stats">
            <div className="stat-card">
              <div className="stat-number">{leaderboard.length}</div>
              <div className="stat-label">Companies Ranked</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {leaderboard.reduce((acc, c) => acc + c.reviewCount, 0)}
              </div>
              <div className="stat-label">Total Reviews</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {leaderboard.length > 0 
                  ? (leaderboard.reduce((acc, c) => acc + c.avgRating, 0) / leaderboard.length).toFixed(2)
                  : '0.00'
                }
              </div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

