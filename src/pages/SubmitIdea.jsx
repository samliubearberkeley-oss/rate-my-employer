import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { insforge } from '../lib/insforge';

export default function SubmitIdea() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      // Get current user if logged in
      let userId = null;
      try {
        const { data: userData } = await insforge.auth.getCurrentUser();
        if (userData?.user?.id) {
          userId = userData.user.id;
        }
      } catch (err) {
        // User not logged in, continue as anonymous
      }

      // Parse tags (comma-separated)
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [];

      const { data, error } = await insforge.database
        .from('forum_posts')
        .insert([{
          user_id: userId,
          title: formData.title.trim(),
          content: formData.content.trim(),
          tags: tagsArray
        }])
        .select()
        .single();

      if (error) throw error;

      // Reset form and navigate to forum
      setFormData({
        title: '',
        content: '',
        tags: ''
      });
      
      navigate('/forum');
    } catch (err) {
      setError(err.message || 'Failed to submit idea');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.title.trim() && formData.content.trim();

  return (
    <div className="container">
      <div className="form-container sketch">
        <h1 className="form-title sketch">Share Your Vibe Coding Idea</h1>
        
        {error && <div className="error-message sketch">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Idea Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Using AI to generate CSS animations"
              className="form-input sketch"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="content">
              Describe Your Idea *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your coding idea, technique, or concept..."
              rows="8"
              className="form-input form-textarea sketch"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="tags">
              Tags (Optional)
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., react, ai, css, animation"
              className="form-input sketch"
            />
            <small style={{ fontSize: '12px', color: 'var(--theme-text)', opacity: 0.7, marginTop: '4px', display: 'block' }}>
              Separate tags with commas
            </small>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className={`next-btn sketch primary ${!isFormValid ? 'disabled' : ''}`}
              disabled={!isFormValid || loading}
            >
              {loading ? 'Sharing...' : 'Share Idea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

