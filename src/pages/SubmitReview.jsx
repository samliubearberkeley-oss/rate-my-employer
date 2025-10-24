import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { insforge } from '../lib/insforge';

export default function SubmitReview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    companyName: '',
    bossName: '',
    rating: 3,
    reviewText: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="container">
        <div className="error-card">
          <h2>🔐 AUTHENTICATION REQUIRED</h2>
          <p>PLEASE LOG IN TO SUBMIT A REVIEW.</p>
          <button onClick={() => navigate('/login')} className="btn btn-primary">
            GO TO LOGIN
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data, error } = await insforge.database
        .from('reviews')
        .insert([{
          user_id: user.id,
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

  return (
    <div className="container">
      <div className="form-card">
        <h1>🎮 SUBMIT A REVIEW</h1>
        <p className="subtitle">SHARE YOUR EXPERIENCE WITH YOUR EMPLOYER</p>
        <div className="pixel-dots">
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
          <div className="pixel-dot"></div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">🏢 Company Name *</label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="E.g., Google, Microsoft, Apple"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="bossName">👔 Boss Name *</label>
            <input
              id="bossName"
              name="bossName"
              type="text"
              value={formData.bossName}
              onChange={handleChange}
              placeholder="E.g., Elon Musk, Tim Cook, Satya Nadella"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">⭐ Rating * ({formData.rating}/5)</label>
            <div className="rating-container">
              <input
                id="rating"
                name="rating"
                type="range"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                required
              />
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={star <= formData.rating ? 'star filled' : 'star'}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="reviewText">📝 Review (Optional)</label>
            <textarea
              id="reviewText"
              name="reviewText"
              value={formData.reviewText}
              onChange={handleChange}
              placeholder="Tell us about your experience..."
              rows="5"
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
          </button>
        </form>
      </div>
    </div>
  );
}

