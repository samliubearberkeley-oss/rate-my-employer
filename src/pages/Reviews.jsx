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

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

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

  const openReview = (review) => {
    setSelectedReview(review);
  };

  const closeReview = () => {
    setSelectedReview(null);
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
    <>
      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title sketch">Employer Reviews</h1>
        <p className="hero-subtitle">
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} from employees
        </p>
        <div className="hero-cta">
          <a href="/submit" className="sketch-btn primary">
            Submit Review
          </a>
        </div>
      </div>

      {/* Reviews List */}
      <div className="container">
        <div className="list-container sketch">
          <div className="list-header">
            <h2 className="list-title">Recent Reviews</h2>
            <p className="list-subtitle">Employee feedback and ratings</p>
          </div>
          
          {reviews.length === 0 ? (
            <div className="empty-state">
              <h3>No reviews yet</h3>
              <p>Be the first to submit a review!</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="list-item sketch"
                >
                  <div className="list-content">
                    <div className="list-item-title">
                      {review.review_text}
                    </div>
                    <div className="list-item-meta">
                      {capitalizeWords(review.company_name)} • Boss: {capitalizeWords(review.boss_name)}
                    </div>
                    <div className="list-item-rating">
                      {renderStars(review.rating)} • {formatDate(review.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </>
  );
}

