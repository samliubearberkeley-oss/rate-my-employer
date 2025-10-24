import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { insforge } from '../lib/insforge';

export default function SubmitReview() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    bossName: '',
    rating: 3,
    reviewText: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to capitalize first letter of each word
  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Capitalize company and boss names
    let formattedValue = value;
    if (name === 'companyName' || name === 'bossName') {
      formattedValue = capitalizeWords(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error} = await insforge.database
        .from('reviews')
        .insert([{
          user_id: null,
          company_name: formData.companyName,
          boss_name: formData.bossName,
          rating: parseInt(formData.rating),
          review_text: formData.reviewText || null
        }])
        .select()
        .single();

      if (error) throw error;

      // Reset form and navigate to home
      setFormData({
        companyName: '',
        bossName: '',
        rating: 3,
        reviewText: ''
      });
      
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.companyName.trim() && formData.bossName.trim();

  return (
    <div className="container">
      <div className="form-container sketch">
        <h1 className="form-title sketch">Submit Review</h1>
        
        {error && <div className="error-message sketch">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="companyName">
              Company Name *
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g., Google, Microsoft, Apple"
              className="form-input sketch"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="bossName">
              Boss Name *
            </label>
            <input
              id="bossName"
              name="bossName"
              type="text"
              value={formData.bossName}
              onChange={handleChange}
              placeholder="e.g., Elon Musk, Tim Cook, Satya Nadella"
              className="form-input sketch"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="rating">
              Rating * ({formData.rating}/5)
            </label>
            <div className="rating-container">
              <input
                id="rating"
                name="rating"
                type="range"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="rating-slider sketch"
                required
              />
              <div className="rating-display">
                {formData.rating}/5
              </div>
            </div>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={star <= formData.rating ? 'star filled' : 'star empty'}
                >
                  {star <= formData.rating ? '⭐' : '☆'}
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="reviewText">
              Review (Optional)
            </label>
            <textarea
              id="reviewText"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              rows="4"
              className="form-input form-textarea sketch"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className={`next-btn sketch primary ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid || loading}
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

