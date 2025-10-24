import { useEffect, useState } from 'react';
import { insforge } from '../lib/insforge';
import { useAuth } from '../contexts/AuthContext';

// Function to capitalize first letter of each word
const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await insforge.database
        .from('reviews')
        .select('*, users(nickname)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReviews(data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={star <= rating ? 'star filled' : 'star empty'}
          >
            {star <= rating ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading reviews...</div>
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
      <div className="reviews-header">
        <h1>🎮 EMPLOYER REVIEWS</h1>
        <p className="subtitle">
          {reviews.length} {reviews.length === 1 ? 'REVIEW' : 'REVIEWS'} FROM EMPLOYEES
        </p>
        <div className="pixel-dots">
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="empty-state">
          <p>🎯 NO REVIEWS YET. BE THE FIRST TO SUBMIT A REVIEW!</p>
          {user && (
            <a href="/submit" className="btn btn-primary">
              SUBMIT REVIEW
            </a>
          )}
        </div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h3 className="company-name">{capitalizeWords(review.company_name)}</h3>
                  <p className="boss-name">Boss: {capitalizeWords(review.boss_name)}</p>
                </div>
                {renderStars(review.rating)}
              </div>
              
              {review.review_text && (
                <p className="review-text">{review.review_text}</p>
              )}
              
              <div className="review-footer">
                <span className="review-date">
                  {formatDate(review.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

